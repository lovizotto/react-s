import styled from "styled-components";
import {ALPHABET} from "../../constants/Config";
export type SheetHeadColumnsProps = {
    className?: string
}
export const SheetHeadColumns = ({className}: SheetHeadColumnsProps) => {
    return <Wrapper className={className}>
        <Cell key='-1' index='-1' />
        {
            ALPHABET.map((item, index) =>
               <Cell key={item} index={index.toString()}>{item}</Cell>
            )
        }
    </Wrapper>
}

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 40px;
  width: 100%;
  box-sizing: border-box;
`

const Cell = styled("div")<{ index: string }>`
  display: flex;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  width: ${props => props.index === '-1' ? 40 : 100}px;
  background-color: #efefef;
  border: 1px solid #e2e2e2;
`