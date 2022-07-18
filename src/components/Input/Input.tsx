import React, {
    ChangeEvent,
    useCallback,
    useEffect,
    useRef,
    useState
} from "react";
import styled from "styled-components";
import {FORMULA_REGEX} from "../../constants/Config";
import {ICell} from "../../@types";
import {useStore} from "../../store/store";

export type IInputData = {
    className?: string,
    cellId: string
}

export const Input = ({
    className,
    cellId
}: IInputData) => {
    const { updateSpreadSheet, spreadsheet, updateValues } = useStore();
    const inputRef = useRef<HTMLInputElement>(null)
    const [cell, setCell] = useState<ICell>(spreadsheet?.[cellId] || {} as ICell);

    /**
     * Should be improved to execute just one time
     */
    const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value;
        const data = {
            id: cellId,
            value: e.target.value,
            formula: '',
            reference: ''
        }

        if (rawValue.startsWith('=')) {
            const found = rawValue.match(FORMULA_REGEX) || [];
            const rawFound = found[0]?.slice(1, found[0].length + 1);

            let firstKey = rawFound;
            let error = false;
            while(spreadsheet[firstKey]?.reference !== '' || !spreadsheet[firstKey]) {
                if (spreadsheet[firstKey]?.reference === cellId) {
                    error = true;
                    break;
                }
                firstKey = spreadsheet[firstKey].reference
            }

            if (rawFound) {
                const cellValue = {
                    ...data,
                    reference: rawFound,
                    formula: e.target.value,
                    value: spreadsheet?.[rawFound]?.value || e.target.value,
                    error
                }
                setCell(cellValue);
            }
        } else {
            setCell(data);
        }
    }, [cellId, spreadsheet]);

    const handleInputBlur = useCallback((e: any) => {

    }, []);

    useEffect(() => {
        const sheet = {
            ...spreadsheet,
            [cellId]: cell
        }

        updateSpreadSheet(sheet);
    }, [cell, cellId, updateSpreadSheet])
    return (
        <InputElement
            ref={inputRef}
            className={className}
            error={!!cell.error}
            type='text'
            defaultValue={cell?.formula?.length > 0 ? cell?.formula : cell?.value}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            autoFocus
        />
    )
}

const InputElement = styled("input")<{error: boolean}>`
  width: 100%;
  height: 100%;
  border: 0;
  outline: none;
  background-color: ${props => props.error ? 'rgba(255, 0, 0, .1)' : 'transparent'};
`