import create from 'zustand'
import {ICell, IStore} from "../@types";
import {SpreadSheetType} from "../@types/IStore";

export const useStore = create<IStore>((set) => ({
    activeCell: { col: 'A', row: '1', type: "raw", value: '', references: [], formula: ''},
    setActiveCell: (activeCell: ICell) => set({ activeCell }),
    spreadsheet: undefined,
    updateSpreadSheet: (spreadsheet: SpreadSheetType) => set({ spreadsheet })
}))