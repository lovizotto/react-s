import React from "react";
import styled from "styled-components";
import {ALPHABET} from "../../constants/Config";
import { Cell } from '../Cell';
import {useStore} from "../../store/store";

type IRowFilledProps = {
    line: string
}
export const RowFilled = ({ line }: IRowFilledProps) => {
    const { activeCell } = useStore();
    return (
        <RowStyled>
            {ALPHABET.map((col: string) => (
                <Cell
                    key={col}
                    row={line.toString()}
                    col={col}
                    type='raw'
                    focused={col === activeCell.col && line === activeCell.row}
                    isIndex={line === '0'}
                >
                    {line === '0' && col === '1' && ''}
                    {line === '0' && col !== '1' && col}
                    {line > '0' && col === '1' && line}
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