import * as yup from 'yup'
import dayjs from 'dayjs'
import type { IEvent, EventContext } from '../types'

export const eventSchema: yup.ObjectSchema<IEvent> = yup.object({
	id: yup.string().optional().default(''),
	title: yup.string().required('Введите название события'),
	description: yup.string().optional().default(''),
	color: yup.string().optional().default(''),
	startDate: yup.string().required('Укажите дату и время начала'),
	endDate: yup
		.string()
		.required('Укажите дату и время окончания')
		.test(
			'is-after-start',
			'Дата окончания должна быть позже даты начала',
			function (value) {
				const { startDate } = this.parent
				return dayjs(value).isAfter(dayjs(startDate))
			}
		)
		.test(
			'not-same',
			'Дата начала и окончания не могут совпадать',
			function (value) {
				const { start } = this.parent
				return !dayjs(value).isSame(dayjs(start))
			}
		)
		.test('no-overlap', 'Событие пересекается с другим', function (value) {
			const { startDate } = this.parent
			const { events, currentId } = this.options.context as EventContext
			return !events.some(
				(ev: IEvent) =>
					ev.id !== currentId &&
					dayjs(startDate).isBefore(dayjs(ev.endDate)) &&
					dayjs(value).isAfter(dayjs(ev.startDate))
			)
		})
})
