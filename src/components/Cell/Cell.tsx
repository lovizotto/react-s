import React, {useCallback, useState} from "react";
import styled from "styled-components";
import {Input} from "../Input";
import {useStore} from "../../store/store";
import shallow from "zustand/shallow";

export type ICellProps = {
    id: string,
    className?: string,
    onClick: (id: string) => void
}
export const Cell = ({
                  id,
                  onClick,
                  className
              }: ICellProps) => {
    const spreadsheet = useStore(state => state.spreadsheet, shallow);
    const [focused, setFocused] = useState<boolean>(false)

    const handleClick = useCallback(() => {
        onClick(id)
        setFocused(!focused)
    }, [onClick, id, focused]);

    const handleBlur = useCallback(() => {
        setFocused(false);
    }, [])
    return (
        <CellContentWrapper
            data-id={id}
            focused={focused}
            className={className}
            onClick={handleClick}
            onBlur={handleBlur}
            error={!!spreadsheet?.[id]?.error}
        >
            {focused
                ? (
                    <Input
                       cellId={id}
                    />
                )
                : spreadsheet?.[id]?.value
            }
        </CellContentWrapper>
    );
}

const CellContentWrapper = styled("div")<{focused: boolean, error: boolean}>`
  display: flex;
  box-sizing: border-box;
  text-align: left;
  width: 100px;
  height: 100%;
  background: ${props => props.focused ? 'white' : '#efefef'};
  background-color: ${props => props.error ? 'rgba(255, 0, 0, .1)' : '#efefef'};
  align-items: center;
  justify-content: center;
  border: 1px solid ${props => props.focused ? 'blue' : '#ccc'};
  box-shadow: ${props => props.focused ? 'inset 3px 3px 5px rgba(0,0,0,.2)' : 'none'};
  z-index: ${props => props.focused ? 1 : 0}
`
