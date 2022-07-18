import React, {useEffect, useCallback, useState} from 'react';
import './App.css';
import { Sheet } from './components/Sheet';
import {SpreadSheetType} from "./@types/IStore";
import {ICell} from "./@types";
import {useStore} from "./store/store";

const initialState: SpreadSheetType = {
  'a1': {
    value: 'This is a test',
    type: 'raw',
    col: 'b',
    row: '4',
    references: [],
    formula: ''
  },
  'b3': {
    value: 'This is a test',
    type: 'raw',
    col: 'b',
    row: '4',
    references: [],
    formula: ''
  },
  'b4': {
    value: 'This is a test',
    type: 'raw',
    col: 'b',
    row: '4',
    references: [],
    formula: ''
  } 
}

function App() {
  const { spreadsheet, updateSpreadSheet } = useStore();

  useEffect(() => {
    const storage: string = localStorage.getItem('amplaTest') || ''
    try {
      const storageSpreadsheet = JSON.parse(storage) as SpreadSheetType;
      updateSpreadSheet(storageSpreadsheet);
    } catch (error: any) {
      console.log(error)
    }
  }, [])

  const handleSheetDataChange = useCallback((data: ICell) => {
    try {
      const stringfyedData = JSON.stringify(data)
      localStorage.setItem('amplaTest', stringfyedData);
      updateSpreadSheet({
        ...spreadsheet,
        [data.col+data.row]: {...data}
      })
    } catch (error: any) {
      alert('Wasn\'t possible save.');
      console.log(error)
    }
  }, [])

  return (
    <div className="App">
      <Sheet />
    </div>
  );
}

export default App;
