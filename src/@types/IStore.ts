import {ICell} from "./ICell";
export type SpreadSheetType = {[key: string]: ICell}
export interface IStore {
    activeCell: ICell,
    spreadsheet: SpreadSheetType | undefined,
    setActiveCell: (activeCell: ICell) => void,
    updateSpreadSheet: (spreadsheet: SpreadSheetType) => void
}
