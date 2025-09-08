import Button from '../ui/Button'
import { useEventContext } from '../../contexts/EventContext.tsx'
import type { ViewMode } from '../../types'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import dayjs from 'dayjs'

const CalendarControls = () => {
	const { setViewMode, setCurrentDate, currentDate, viewMode } =
		useEventContext()

	const changeView = (v: ViewMode) => {
		setViewMode(v)
		if (v === 'week') {
			setCurrentDate(d => d.startOf('isoWeek'))
		} else {
			setCurrentDate(d => d.startOf('month'))
		}
	}
	const handlePrev = () =>
		setCurrentDate(d => d.subtract(1, viewMode === 'month' ? 'month' : 'week'))
	const handleNext = () =>
		setCurrentDate(d => d.add(1, viewMode === 'month' ? 'month' : 'week'))
	const handleToday = () => setCurrentDate(dayjs())

	return (
		<div className='flex justify-between gap-4 items-center p-4'>
			<div className='flex gap-2 '>
				<Button onClick={handlePrev}>
					<MdChevronLeft />
				</Button>
				<Button
					className={
						currentDate.isSame(dayjs(), 'day') ? 'bg-blue-500 text-white' : ''
					}
					onClick={handleToday}
				>
					Сегодня
				</Button>
				<Button onClick={handleNext}>
					<MdChevronRight />
				</Button>
			</div>
			<div className='text-center leading-[1]'>
				<p>
					{viewMode === 'month'
						? currentDate.format('MMMM YYYY')
						: `Неделя ${currentDate.isoWeek()}, ${currentDate.year()}`}
				</p>
				<p className='text-sm text-slate-400'>
					{viewMode === 'month' ? 'Календарный' : 'Недельный'} вид
				</p>
			</div>
			<div className='flex gap-2'>
				<Button
					className={viewMode === 'month' ? 'bg-blue-500 text-white' : ''}
					onClick={() => {
						changeView('month')
					}}
				>
					Месяц
				</Button>
				<Button
					className={viewMode === 'week' ? 'bg-blue-500 text-white' : ''}
					onClick={() => {
						changeView('week')
					}}
				>
					Неделя
				</Button>
			</div>
		</div>
	)
}

export default CalendarControls
