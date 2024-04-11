import React, { ChangeEvent, useRef, useState } from 'react'
import styled from 'styled-components'
import { ICell } from '../../@types'
import { useStore } from '../../store/store'
import { getCellValue } from './getCellValue'

export type IInputData = {
	className?: string
	cellId: string
}

export const Input = ({ className, cellId }: IInputData) => {
	const { updateSpreadsheet, spreadsheet, updateCellsByReference } =
		useStore()
	const inputRef = useRef<HTMLInputElement>(null)
	const [cell, setCell] = useState<ICell>(
		spreadsheet?.[cellId] || ({} as ICell)
	)
	/**
	 * Should be improved to execute just one time
	 * It's missing a
	 */
	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const cellValue = getCellValue(e.target.value, cellId, spreadsheet)
		setCell(cellValue)
	}

	const handleInputBlur = () => {
		const sheet = {
			...spreadsheet,
			[cellId]: cell,
		}

		updateSpreadsheet(sheet)
		updateCellsByReference(cell)
	}

	const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (['Enter', 'Tab', 'Return'].includes(e.key)) {
			inputRef?.current?.blur()
		}
	}

	return (
		<InputElement
			ref={inputRef}
			className={className}
			error={!!cell.error}
			type='text'
			defaultValue={
				cell?.formula?.length > 0 ? cell?.formula : cell?.value
			}
			onChange={handleInputChange}
			onBlur={handleInputBlur}
			onKeyUp={handleKeyUp}
			autoFocus
			title={!!cell.error ? 'ERROR: Circular Referenced' : cell.value}
		/>
	)
}

const InputElement = styled('input')<{ error: boolean }>`
	width: 100%;
	height: 100%;
	border: 0;
	outline: none;
	background-color: ${props =>
		props.error ? 'rgba(255, 0, 0, .1)' : 'transparent'};
`
