import React, { createContext, useState, useContext } from 'react'
import type { ReactNode } from 'react'
import type { IEvent, ViewMode } from '../types'
import { type Dayjs } from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'
import 'dayjs/locale/ru'

import dayjs from 'dayjs'
import useLocalStorage from 'use-local-storage'

dayjs.extend(isoWeek)
dayjs.locale('ru')

export interface EventContextType {
	viewMode: ViewMode
	setViewMode: React.Dispatch<React.SetStateAction<ViewMode>>
	currentDate: Dayjs
	setCurrentDate: React.Dispatch<React.SetStateAction<Dayjs>>
	eventToEdit: IEvent | null
	setEventToEdit: React.Dispatch<React.SetStateAction<IEvent | null>>
	events: IEvent[]
	setEvents: (events: IEvent[]) => void
}

const EventContext = createContext<EventContextType | undefined>(undefined)

interface EventContextProviderProps {
	children: ReactNode
}

export const EventContextProvider: React.FC<EventContextProviderProps> = ({
	children
}) => {
	const [viewMode, setViewMode] = useState<ViewMode>('month')
	const [eventToEdit, setEventToEdit] = useState<IEvent | null>(null)
	const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs())
	const [events, setEvents] = useLocalStorage<IEvent[]>('events', [])

	const contextValue: EventContextType = {
		viewMode,
		setViewMode,
		currentDate,
		setCurrentDate,
		events,
		setEvents,
		eventToEdit,
		setEventToEdit
	}

	return (
		<EventContext.Provider value={contextValue}>
			{children}
		</EventContext.Provider>
	)
}

// eslint-disable-next-line react-refresh/only-export-components
export const useEventContext = () => {
	const context = useContext(EventContext)
	if (context === undefined) {
		throw new Error('Нет провайдера контекста')
	}
	return context
}
