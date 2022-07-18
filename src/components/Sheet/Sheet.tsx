import React, {
    useCallback,
    useState
} from 'react';
import styled from 'styled-components'
import {ALPHABET, LINE_AMOUNT} from  '../../constants/Config';
import {Row} from '../Row';

export interface ICellData {
    data: string,
    left?: string,
    right?: string
}

export type ISheetData = {
    [key: string]: ICellData
}

export type SheetProps = {
    onChange: (value: ISheetData) => void,
    data: ISheetData
}

export const Sheet = ({onChange, data}: SheetProps) => {
    const [activeCell, setActiveCell] = useState({row: 1, col: 'A', type: 'raw'})
    const handleTableClick = useCallback((e: any) => {
        if (e.target.dataset.col) {
            setActiveCell(e.target.dataset)
        }

        if (e.target.dataset?.kind === 'reference') {

        }

        if (e.target.dataset?.kind === 'raw') {

        }
    }, [])
    const lines = new Array(LINE_AMOUNT).fill(undefined)
    return (
        <Table onClick={handleTableClick}>
            { lines.map((item, index) => {
                return (
                    <Row
                        key={index}
                        line={index}
                        activeCell={activeCell}
                    />
                )
            })}
        </Table>
    )
}

const Table = styled.div`
    display: flex;
    flex-direction: column;
    width: ${ALPHABET.length * 100}px;
    height: 100%;
    background: gray;
`
export {}