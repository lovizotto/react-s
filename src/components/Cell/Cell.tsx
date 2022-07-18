import React, {useCallback, useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {Input} from "./Input";
import {useStore} from "../../store/store";
import {CellContentType} from "../../@types";

export type ICellProps = {
    row: string,
    col: string,
    type: CellContentType,
    children: any,
    isIndex: boolean,
    className?: string,
    focused: boolean
}
const Cell = ({
  row,
  col,
  type,
  children,
  isIndex,
  focused,className }: ICellProps) => {
    const { updateSpreadSheet, spreadsheet } = useStore();
    const cellElement = useRef(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (focused && inputRef.current) {
            inputRef.current.focus();
        }
    }, [focused]);

    return (
        <div
            ref={cellElement}
            data-col={col}
            data-row={row}
            data-type={type}
            className={className}
            // onClick={() => setEditing(focused && true)}
        >
            {focused
                ? (
                    <Input
                        ref={inputRef}
                        col={col}
                        row={row}
                        onChange={(value) => console.log(value)}
                    />
                ) : spreadsheet?.[col+row]?.value || children}
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
