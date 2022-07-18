import React, {
    useCallback,
    useState
} from 'react';
import styled from 'styled-components'
import {ALPHABET, LINE_AMOUNT} from  '../../constants/Config';
import {Row} from '../Row';
import {useStore} from "../../store/store";

export const Sheet = () => {
    const {setActiveCell} = useStore();
    const handleTableClick = useCallback((e: any) => {
        if (e.target.dataset.col) {
            setActiveCell({
                ...e.target.dataset,
                value: ''
            })
        }
    }, [])
    const lines = new Array(LINE_AMOUNT).fill(undefined)
    return (
        <Table onClick={handleTableClick}>
            { lines.map((item, index) => {
                return (
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
    background: gray;
`
export {}