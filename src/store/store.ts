import create from 'zustand'
import {ICell} from '../@types/ICell';
export type SpreadSheetType = {[key: string]: ICell}
export interface IStore {
    activeCell: ICell,
    spreadsheet: SpreadSheetType,
    setActiveCell: (activeCell: ICell) => void,
    updateSpreadSheet: (spreadsheet: SpreadSheetType) => void,
    updateValues: (cell: ICell) => void
}

const initialState: SpreadSheetType = {}

export const useStore = create<IStore>((set) => ({
    activeCell: { id: 'A1', value: '', reference: '', formula: ''},
    spreadsheet: initialState,
    setActiveCell: (activeCell: ICell) => set({ activeCell }),
    updateSpreadSheet: (spreadsheet: SpreadSheetType) => set({spreadsheet}),
    updateValues: (newCell: ICell) => (state: IStore) => {
        console.log(newCell);
        for (const i in state.spreadsheet) {
            let spreadsheetCell = state.spreadsheet[newCell?.reference?.[0]];
            if (spreadsheetCell !== undefined) {
                spreadsheetCell = {
                    ...spreadsheetCell,
                    formula: newCell.formula,
                    value: i === newCell.reference ? '#CIRCULAR' : newCell.value,
                    reference: newCell.reference
                }
                console.log(spreadsheetCell)
            }
        }
        return {spreadsheet: state.spreadsheet}
    }
}))