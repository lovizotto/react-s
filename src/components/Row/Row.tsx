import React from "react";
import styled from "styled-components";
import {ALPHABET} from "../../constants/Config";
import { Cell } from '../Cell';

type IRowFilled = {
    line: number,
    activeCell: any
}
export const RowFilled = ({ line, activeCell }: IRowFilled) => {
    return (
        <RowStyled>
            {ALPHABET.map((cell: string) => (
                <Cell
                    key={cell}
                    row={line.toString()}
                    col={cell}
                    type='raw'
                    isIndex={line === 0}
                    focused={cell === activeCell.col && line.toString() === activeCell.row}
                >
                    {line === 0 && cell === '1' && ''}
                    {line === 0 && cell !== '1' && cell}
                    {line > 0 && cell === '1' && line}
                </Cell>
            ))}
        </RowStyled>
    )
}

const RowStyled = styled.div`
    display: flex;
    flex-direction: row;
    height: 40px;
`
export {}
