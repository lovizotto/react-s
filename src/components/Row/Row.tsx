import React, { useCallback, useMemo } from 'react'
import styled from 'styled-components'
import { ALPHABET } from '../../constants/Config'
import { Cell } from '../Cell'
import { ICell } from '../../@types'
import { useStore } from '../../store/store'
import { SheetLineIndex } from '../Sheet/SheetLineIndex'

type IRowFilledProps = {
	line: string
}
export const RowFilled = ({ line }: IRowFilledProps) => {
	const { setActiveCell, activeCell, spreadsheet } = useStore()
	const handleClick = useCallback(
		(id: string) => {
			const sheeCell = spreadsheet[id]
			setActiveCell({
				id,
				value: sheeCell?.value,
				formula: sheeCell?.formula,
			} as ICell)
		},
		[setActiveCell, spreadsheet]
	)

	const renderCells = useMemo(
		() =>
			ALPHABET.map((item: string) => (
				<Cell
					key={item + line}
					id={item + line}
					onClick={() => handleClick(item + line)}
				/>
			)),
		[handleClick, line]
	)
	return (
		<RowStyled>
			<SheetLineIndex>{line}</SheetLineIndex>
			{renderCells}
		</RowStyled>
	)
}

const RowStyled = styled.div`
	display: flex;
	flex-direction: row;
	height: 40px;
`
