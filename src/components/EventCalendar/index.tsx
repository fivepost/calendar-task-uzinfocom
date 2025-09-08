import CalendarControls from './CalendarControls.tsx'
import MonthView from './MonthView.tsx'
import { useEventContext } from '../../contexts/EventContext.tsx'
import WeekView from './WeekView.tsx'
import EventModal from './EventModal.tsx'

const EventCalendar = () => {
	const { viewMode, eventToEdit } = useEventContext()

	return (
		<>
			<div className='max-w-7xl mx-auto mt-4'>
				<h1 className='text-lg font-medium mb-2'>Календарь событий</h1>
				<div className='bg-white shadow-sm rounded p-4'>
					<CalendarControls />
					{viewMode === 'month' && <MonthView />}
					{viewMode === 'week' && <WeekView />}
				</div>
			</div>
			{eventToEdit && <EventModal />}
		</>
	)
}

export default EventCalendar
