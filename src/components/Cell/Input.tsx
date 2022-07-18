import React, {ChangeEvent, ForwardedRef, KeyboardEvent, useCallback, useState} from "react";
import styled from "styled-components";
import {FORMULA_REGEX} from "../../constants/Config";
import {ICell} from "../../@types";
import {useStore} from "../../store/store";

export type IInputData = {
    onChange: (value: string) => void,
    className?: string,
    col: string,
    row: string
}

export const Input = React.forwardRef(({
    className,
    col,
    row
}: IInputData, ref: ForwardedRef<HTMLInputElement>) => {
    const { updateSpreadSheet, spreadsheet } = useStore();
    const [cell, setCell] = useState<ICell>(spreadsheet?.[col+row] || {} as ICell);

    const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setCell({
            ...cell,
            col,
            row,
            value: e.target.value,
        });
    }, [cell, col, row]);

    const handleInputBlur = useCallback((e: any) => {
        const value =  cell?.references?.length > 0
            ? spreadsheet?.[cell?.references[0]].value : e.target.value
        updateSpreadSheet({
            ...spreadsheet,
            [col+row]: {
                ...cell,
                value,
                formula: e.target.value
            }
        })
    }, [cell, col, row, spreadsheet, updateSpreadSheet]);

    /**
     * TODO: accept more than one reference
     */
    const handleInputKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
            const rawValue = e.target.value;
            if (rawValue.startsWith('=')) {
                const found = rawValue.match(FORMULA_REGEX) || [];
                const rawFound = found[0].slice(1, found[0].length);
                if (rawFound) {
                    setCell({
                        ...cell,
                        references: [rawFound],
                        formula: e.target.value,
                        value: e.target.value
                    });
                }
            }
    }, [cell])
    return (
        <InputElement
            ref={ref}
            className={className}
            type='text'
            defaultValue={cell?.formula?.length > 0 ? cell?.formula : cell?.value}
            onChange={handleInputChange}
            onKeyUp={handleInputKeyDown}
            onBlur={handleInputBlur}
        />
    )
})

const InputElement = styled.input`
  width: 100%;
  height: 100%;
  border: 0;
  outline: none;
`