import { useEventContext } from '../../contexts/EventContext.tsx'
import cn from 'clsx'
import dayjs, { type Dayjs } from 'dayjs'
import { Fragment } from 'react'

const WeekView = () => {
	const { currentDate, events, setEventToEdit } = useEventContext()

	const getWeekDays = (date = currentDate) => {
		const start = date.startOf('isoWeek')
		return Array.from({ length: 7 }, (_, i) => start.add(i, 'day'))
	}

	const eventsForHour = (day: Dayjs, hour: number) =>
		events.filter(e => {
			const start = dayjs(e.startDate)
			const end = dayjs(e.endDate)
			if (!day.isBetween(start, end, 'day', '[]')) return false
			return (
				(start.isSame(day, 'day') ? hour >= start.hour() : true) &&
				(end.isSame(day, 'day') ? hour < end.hour() : true)
			)
		})

	return (
		<div className='border-b border-b-gray-300 h-[calc(100vh-160px)] overflow-y-auto'>
			<div className='grid grid-cols-8 border border-gray-300 border-b-0 sticky top-0 bg-white z-5'>
				<div className='bg-gray-50 text-center p-2 border-r border-r-gray-300 last:border-r-0'>
					Время
				</div>
				{getWeekDays().map(day => {
					const isSameDay = day.isSame(dayjs(), 'day')
					return (
						<div
							key={day.format('DD-MM')}
							className={cn(
								'text-center p-2 border-r border-r-gray-300 last:border-r-0',
								{
									'bg-blue-100': isSameDay,
									'bg-gray-50': !isSameDay
								}
							)}
						>
							{day.format('dd DD.MM')}
						</div>
					)
				})}
			</div>

			<div className='grid grid-cols-8 border border-gray-300'>
				{Array.from({ length: 24 }, (_, i) => i).map(hour => (
					<Fragment key={hour}>
						<div className='border-t border-r border-r-gray-300 border-t-gray-300 [&:nth-child(8n)]:border-r-0 p-2 text-sm text-right pr-3'>
							{`${hour.toString().padStart(2, '0')}:00`}
						</div>

						{getWeekDays().map(day => (
							<div
								key={day.format('DD-MM') + hour}
								onClick={() => {
									const newEvent = {
										title: '',
										description: '',
										color: '',
										startDate: day.hour(hour).format('YYYY-MM-DDTHH:mm'),
										endDate: day
											.hour(hour)
											.add(1, 'hour')
											.format('YYYY-MM-DDTHH:mm')
									}
									setEventToEdit(newEvent)
								}}
								className='border-t border-r border-r-gray-300 hover:bg-blue-100 border-t-gray-300 [&:nth-child(8n)]:border-r-0 h-10 relative cursor-pointer'
							>
								{eventsForHour(day, hour).map(ev => (
									<div
										key={ev.id}
										className={`bg-${ev.color}-500 h-full text-white text-xs rounded px-1 cursor-pointer hover:bg-${ev.color}-700`}
										onClick={e => {
											e.stopPropagation()
											setEventToEdit(ev)
										}}
									>
										{ev.title}
									</div>
								))}
							</div>
						))}
					</Fragment>
				))}
			</div>
		</div>
	)
}

export default WeekView
