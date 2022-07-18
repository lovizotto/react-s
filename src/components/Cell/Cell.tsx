import React, {ChangeEvent, ForwardedRef, KeyboardEvent, useCallback, useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {Input} from "./Input";

export type ICell = {
    row: string,
    col: string,
    children: any,
    type: CellContentType,
    isIndex: boolean,
    className?: string,
    focused: boolean
}
const Cell = ({
  row,
  col,
  children,
  focused = false,
  type = 'raw',
  className }: ICell) => {
    const [editing, setEditing] = useState<boolean>(false);
    const cell = useRef(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (editing && focused && inputRef.current) {
            inputRef.current.focus();
        }
    }, [focused, editing]);

    const handleInputDataBlue = useCallback(() => {
        setEditing(false);
    }, [])

    return (
        <div
            ref={cell}
            data-row={row}
            data-col={col}
            data-kind={type}
            className={className}
            onClick={() => setEditing(focused && true)}
        >
            {editing
                ? (
                    <Input
                        ref={inputRef}
                        onChange={(value) => console.log(value)}
                        onBlur={handleInputDataBlue}
                        onEditSubmit={(value) => console.log(value)}
                    />
                ) : children}
        </div>
    );
}

export const CellContentWrapper = styled(Cell)`
  display: flex;
  box-sizing: border-box;
  text-align: ${props => props.type === 'reference' ? 'flex-start' : 'flex-end'};
  width: ${props => props.col === '1' ? 40 : 100}px;
  height: 100%;
  background: ${
          props => props.col === '1' || props.row === '0'
                  ? '#e2e2e2'
                  : (props.focused ? 'white' : '#efefef')
  };
  align-items: center;
  justify-content: center;
  border: 1.5px solid ${props => props.focused ? 'blue' : '#ccc'};
  box-shadow: ${props => props.focused ? 'inset 3px 3px 5px rgba(0,0,0,.2)' : 'none'};
  z-index: ${props => props.focused ? 1 : 0}
`

export type CellContentType = 'raw' | 'reference';