import React from 'react'
import styled from 'styled-components'
import { Input } from '../Input'
import { ICell } from '../../@types'

export type ICellProps = {
	cell: ICell
	className?: string
	onClick: (id: string) => void
}

export enum CellStatus {
	selected = 'selected',
	focused = 'focused',
	default = 'default',
}

export type CellStatusType = keyof typeof CellStatus

export const Cell = ({ cell, onClick, className }: ICellProps) => {
	if (!cell) {
		return null
	}
	return (
		<CellContentWrapper
			data-id={cell.id}
			status={cell.status}
			error={cell.error}
			onClick={() => onClick(cell.id)}
		>
			{cell.status === 'focused' ? (
				<Input cellId={cell.id} />
			) : (
				cell.value
			)}
		</CellContentWrapper>
	)
}

const CellContentWrapper = styled('div')<{
	status: CellStatusType
	error?: boolean
}>`
	display: flex;
	box-sizing: border-box;
	text-align: left;
	width: 100px;
	height: 100%;
	background: ${props =>
		props.status !== CellStatus.default ? 'white' : '#efefef'};
	background-color: ${props =>
		props.error ? 'rgba(255, 0, 0, .1)' : '#efefef'};
	align-items: center;
	justify-content: center;
	border: 1px solid
		${props => (props.status !== CellStatus.default ? 'blue' : '#ccc')};
	box-shadow: ${props =>
		props.status !== CellStatus.default
			? 'inset 3px 3px 5px rgba(0,0,0,.2)'
			: 'none'};
	z-index: ${props => (props.status !== CellStatus.default ? 1 : 0)};
`
