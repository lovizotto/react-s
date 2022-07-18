import React, {
    useCallback, useMemo
} from 'react';
import styled from 'styled-components'
import {ALPHABET, LINE_AMOUNT} from  '../../constants/Config';
import {Row} from '../Row';
import {SheetHeadColumns} from "./SheetHeadColumns";

export const Sheet = () => {
    const lines = useMemo(() => new Array(LINE_AMOUNT).fill(undefined), []);
    return (
        <Table>
            <SheetHeadColumns />
            { lines.map((item, index) => {
                return (
                    index > 0 &&
                    <Row
                        key={index}
                        line={index.toString()}
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
    background: #efefef;
`
export {}