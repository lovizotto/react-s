import { CellStatus } from '../components/Cell/Cell'

export interface ICell {
	id: string
	value: string
	formula: string
	reference: string
	error?: boolean
	status: keyof typeof CellStatus
}
