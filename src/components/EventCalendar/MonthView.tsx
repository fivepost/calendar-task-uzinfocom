import { useEventContext } from '../../contexts/EventContext.tsx'
import dayjs, { type Dayjs } from 'dayjs'
import cn from 'clsx'
import { LuCirclePlus } from 'react-icons/lu'

const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

const MonthView = () => {
	const { currentDate, events, setEventToEdit } = useEventContext()

	const getMonthDays = () => {
		const startOfMonth = currentDate.startOf('month')
		const endOfMonth = currentDate.endOf('month')
		const startOfGrid = startOfMonth.startOf('week')
		const endOfGrid = endOfMonth.endOf('week')

		const days: Dayjs[] = []
		let day = startOfGrid
		while (day.isBefore(endOfGrid) || day.isSame(endOfGrid, 'day')) {
			days.push(day)
			day = day.add(1, 'day')
		}
		return days
	}

	const eventsForDay = (day: Dayjs) =>
		events.filter(e => {
			const start = dayjs(e.startDate)
			const end = dayjs(e.endDate)
			return day.isBetween(start, end, 'day', '[]') // [] включает границы
		})

	return (
		<>
			<span className='hidden bg-red-500 bg-blue-500 bg-teal-500 bg-pink-500 bg-yellow-500 bg-purple-500 bg-orange-500 bg-green-500'></span>
			<div className='border border-gray-300 border-b-0 grid grid-cols-7 mt-4'>
				{weekDays.map(day => {
					return (
						<div
							key={day}
							className='bg-gray-50 text-center p-2 border-r border-r-gray-300 last:border-r-0 '
						>
							{day}
						</div>
					)
				})}
			</div>
			<div className='border border-gray-300 grid grid-cols-7'>
				{getMonthDays().map(date => {
					const isToday = date.isSame(dayjs(), 'day')
					const isCurrentMonth = date.month() === currentDate.month()

					return (
						<div
							key={date.format('DD-MM-YYYY')}
							className={cn(
								' text-center p-2 border-r border-b border-b-gray-300 border-r-gray-300 [&:nth-child(7n)]:border-r-0 h-26',
								{
									'bg-blue-100': isToday,
									'bg-white': !isToday && isCurrentMonth,
									'bg-gray-100': !isCurrentMonth
								}
							)}
						>
							<div className='flex items-center justify-between '>
								<p>{date.date()}</p>
								<button
									onClick={() => {
										const newEvent = {
											title: '',
											description: '',
											color: '',
											startDate: date.format('YYYY-MM-DDTHH:mm'),
											endDate: date.add(1, 'hour').format('YYYY-MM-DDTHH:mm')
										}
										setEventToEdit(newEvent)
									}}
									className='cursor-pointer hover:text-blue-500'
								>
									<LuCirclePlus />
								</button>
							</div>
							<div className='space-y-1 h-[calc(100%-20px)] overflow-y-auto'>
								{eventsForDay(date).map(ev => (
									<div
										key={ev.id}
										className={`text-xs text-left bg-${ev.color}-500 text-white rounded px-1 truncate cursor-pointer hover:bg-${ev.color}-700`}
										onClick={e => {
											e.stopPropagation()
											setEventToEdit(ev)
										}}
									>
										{ev.title}
									</div>
								))}
							</div>
						</div>
					)
				})}
			</div>
		</>
	)
}

export default MonthView
