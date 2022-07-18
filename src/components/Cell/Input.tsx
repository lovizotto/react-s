import React, {ChangeEvent, ForwardedRef, KeyboardEvent, useCallback, useState} from "react";
import styled from "styled-components";
import {CellContentType} from "./Cell";
import {FORMULA_REGEX} from "../../constants/Config";

export type IInputData = {
    onChange: (value: string) => void,
    onEditSubmit?: (value: { value: string, type: CellContentType }) => void,
    onBlur: (value: string) => void,
    className?: string
}

export const Input = React.forwardRef(({
    onEditSubmit,
    className
}: IInputData, ref: ForwardedRef<HTMLInputElement>) => {
    const [value, setValue] = useState<string>('');
    const [type, setType] = useState<CellContentType>('raw');

    const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }, []);

    const handleInputBlur = useCallback(() => {
        onEditSubmit && onEditSubmit({value, type})
    }, [onEditSubmit, value, type]);

    const handleInputKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === '=' && e.target.value.length === 0) {
            const value = e.target.value
            const found = value.match(FORMULA_REGEX);
            if (found) {
                setValue(found[0]);
            }
            setType('reference');
        } else {
            setType('raw')
        }
    }, [])
    return (
        <InputElement
            ref={ref}
            className={className}
            type='text'
            defaultValue={value}
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