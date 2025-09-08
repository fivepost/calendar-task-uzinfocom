import Field from '../ui/Field'
import TextArea from '../ui/TextArea'
import Button from '../ui/Button'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { eventSchema } from '../../schemas'
import { useEventContext } from '../../contexts/EventContext.tsx'
import type { IEvent } from '../../types'
import { v4 as uuidv4 } from 'uuid'

const colors = [
	'red',
	'blue',
	'green',
	'yellow',
	'purple',
	'pink',
	'orange',
	'teal'
] as const

const EventModal = () => {
	const { eventToEdit, events, setEvents, setEventToEdit } = useEventContext()
	const isEdit = !!eventToEdit?.id
	const randomIndex = Math.floor(Math.random() * (colors.length - 1))

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<IEvent>({
		resolver: yupResolver(eventSchema),
		context: { events, currentId: eventToEdit?.id },
		defaultValues: eventToEdit
			? eventToEdit
			: {
					id: '',
					title: '',
					description: '',
					color: '',
					startDate: '',
					endDate: ''
				}
	})

	const handleSaveEvent = (event: Omit<IEvent, 'id'> & { id?: string }) => {
		if (event.id) {
			setEvents(
				events.map(e => (e.id === event.id ? { ...event, id: e.id } : e))
			)
		} else {
			const newEvent: IEvent = {
				...event,
				color: colors[randomIndex],
				id: uuidv4()
			}
			setEvents([...events, newEvent])
		}
		onModalClose()
	}

	const handleDeleteEvent = (eventId?: string) => {
		setEvents(events.filter((e) => e.id !== eventId));
		onModalClose()

	};

	const onModalClose = () => setEventToEdit(null)
	return (
		<div className='fixed top-0 left-0 w-full h-screen bg-black/30 backdrop-blur-sm flex justify-center items-center z-20'>
			<div className='p-6 w-[500px] bg-white rounded shadow space-y-2 relative'>
				<h2 className='mb-2 font-medium text-xl'>
					{isEdit ? 'Измнить' : 'Добавить'} событие
				</h2>
				<div className='w-full'>
					<Field
						{...register('title')}
						placeholder='Название'
						label='Название'
						error={errors?.title?.message}
					/>
				</div>
				<div className='w-full'>
					<TextArea
						{...register('description')}
						rows={3}
						label='Описание'
						placeholder='Описание'
						error={errors?.description?.message}
					/>
				</div>
				<div className='grid grid-cols-2 gap-2'>
					<div>
						<Field
							{...register('startDate')}
							type='datetime-local'
							placeholder='Дата и время начала'
							label='Дата и время начала'
							error={errors?.startDate?.message}
						/>
					</div>
					<div>
						<Field
							{...register('endDate')}
							type='datetime-local'
							placeholder='Дата и время окончания'
							label='Дата и время окончания'
							error={errors?.endDate?.message}
						/>
					</div>
				</div>
				<div className='w-full flex justify-between items-center mt-4'>
					{isEdit && (
						<div>
							<Button onClick={()=> handleDeleteEvent(eventToEdit?.id)} variant={'danger'}>Удалить</Button>
						</div>
					)}
					<div className='flex gap-2 ml-auto'>
						<Button onClick={onModalClose}>Отмена</Button>
						<Button
							onClick={handleSubmit(handleSaveEvent)}
							variant={'secondary'}
						>
							{isEdit ? 'Изменить' : 'Сохранить'}
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default EventModal
