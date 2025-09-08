export type ViewMode = 'week' | 'month'

export interface IEvent {
	id?: string
	title: string
	description: string
	color?: string
	startDate: string
	endDate: string
}


export type EventContext = {
	events: IEvent[];
	currentId?: string;
};
