import create from 'zustand'
import {ICell} from '../@types/ICell';
export type SpreadSheetType = {[key: string]: ICell}
export interface IStore {
    activeCell: ICell,
    spreadsheet: SpreadSheetType,
    setActiveCell: (activeCell: ICell) => void,
    updateSpreadSheet: (spreadsheet: SpreadSheetType) => void,
    updateValues: (cell: ICell, spreadsheet: SpreadSheetType) => void,
    storeId: string,
    setStoreId: (value: string) => void
}

const initialState: SpreadSheetType = {}

export const useStore = create<IStore>((set) => ({
    activeCell: { id: 'A1', value: '', reference: '', formula: ''},
    spreadsheet: initialState,
    storeId: '',
    setStoreId: (storeId: string) => set({storeId}),
    setActiveCell: (activeCell: ICell) => set({ activeCell }),
    updateSpreadSheet: (spreadsheet: SpreadSheetType) => set({spreadsheet}),
    updateValues: (newCell: ICell, spreadsheet: SpreadSheetType) => {
        for (const i in spreadsheet) {
            let spreadsheetCell = spreadsheet[newCell.reference];
            console.log(spreadsheetCell)
            if (spreadsheetCell !== undefined) {
                spreadsheetCell = {
                    ...spreadsheetCell,
                    formula: newCell.formula,
                    value: i === newCell.reference ? '#CIRCULAR' : newCell.value,
                    reference: newCell.reference
                }
            }
        }
        set({spreadsheet})
    }
}))