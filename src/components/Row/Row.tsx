import React, { useCallback, useEffect } from 'react'
import styled from 'styled-components'
import { ALPHABET } from '../../constants/Config'
import { Cell } from '../Cell'
import { useStore } from '../../store/store'
import { SheetLineIndex } from '../Sheet/SheetLineIndex'
import shallow from 'zustand/shallow'

type IRowFilledProps = {
	line: string
}
export const RowFilled = ({ line }: IRowFilledProps) => {
	const spreadsheet = useStore(state => state.spreadsheet, shallow)
	const activeCell = useStore(state => state.activeCell)
	const setActiveCell = useStore(state => state.setActiveCell)

	const handleClick = useCallback(
		(id: string) => {
			setActiveCell({
				id,
				value: spreadsheet?.[id]?.value,
				formula: spreadsheet?.[id]?.formula,
				reference: spreadsheet?.[id]?.reference,
				status:
					spreadsheet?.[id]?.status === 'selected'
						? 'focused'
						: 'selected',
			})
		},
		[spreadsheet, setActiveCell]
	)

	const handleKeyUp = useCallback(
		(event: KeyboardEvent) => {
			if (event.key === 'Enter') {
				handleClick(activeCell.id)
			}

			if (event.key === 'ArrowDown') {
				const cellId = `${activeCell.id.charAt(0)}${
					Number(activeCell.id.substring(1)) + 1
				}`
				handleClick(cellId)
			}

			if (event.key === 'ArrowUp') {
				const cellId = `${activeCell.id.charAt(0)}${
					Number(activeCell.id.substring(1)) - 1
				}`
				handleClick(cellId)
			}

			if (event.key === 'ArrowRight') {
				const cellId = `${String.fromCharCode(
					activeCell.id.charCodeAt(0) + 1
				)}${activeCell.id.substring(1)}`
				handleClick(cellId)
			}

			if (event.key === 'ArrowLeft') {
				const cellId = `${String.fromCharCode(
					activeCell.id.charCodeAt(0) - 1
				)}${activeCell.id.substring(1)}`
				handleClick(cellId)
			}

			if (event.key === 'Tab') {
				const cellId = `${String.fromCharCode(
					activeCell.id.charCodeAt(0) + 1
				)}${activeCell.id.substring(1)}`
				handleClick(cellId)
			}

			if (event.key === 'Escape') {
				setActiveCell({
					id: activeCell.id,
					value: spreadsheet?.[activeCell.id]?.value,
					formula: spreadsheet?.[activeCell.id]?.formula,
					reference: spreadsheet?.[activeCell.id]?.reference,
					status: 'default',
				})
			}

			if (event.key === 'Delete') {
				setActiveCell({
					id: activeCell.id,
					value: '',
					formula: '',
					reference: '',
					status: 'default',
				})
			}
		},
		[line, activeCell.id, handleClick]
	)

	useEffect(() => {
		document.addEventListener('keyup', handleKeyUp)
		return () => {
			document.removeEventListener('keyup', handleKeyUp)
		}
	}, [handleKeyUp])
	const handleBlur = () => {
		// setStatus('default')
	}

	return (
		<RowStyled>
			<SheetLineIndex>{line}</SheetLineIndex>
			<>
				{ALPHABET.map((letter, index) => {
					const cellId = `${letter}${line}`
					return (
						<Cell
							key={cellId}
							cell={
								spreadsheet?.[cellId] ?? {
									id: cellId,
									value: '',
									formula: '',
									reference: '',
									status: 'default',
								}
							}
							onClick={handleClick}
						/>
					)
				})}
			</>
		</RowStyled>
	)
}

const RowStyled = styled.div`
	position: relative;
	display: flex;
	flex-direction: row;
	height: 40px;
`
