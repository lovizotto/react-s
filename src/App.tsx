import React, {useEffect, useCallback, useState} from 'react';
import './App.css';
import { Sheet } from './components/Sheet';
import {ICell} from "./@types";
import {useStore} from "./store/store";

function App() {
  // const { spreadsheet, updateSpreadSheet } = useStore();
  //
  // useEffect(() => {
  //   const storage: string = localStorage.getItem('amplaTest') || '';
  //   try {
  //     const storageSpreadsheet = JSON.parse(storage) as SpreadSheetType;
  //     updateSpreadSheet(storageSpreadsheet);
  //   } catch (error: any) {
  //     console.log(error)
  //   }
  // }, [updateSpreadSheet])
  //
  // useEffect(() => {
  //   try {
  //     localStorage.setItem('amplaTest', JSON.stringify(spreadsheet));
  //     updateSpreadSheet({
  //       ...spreadsheet
  //     })
  //   } catch (error: any) {
  //     alert('Wasn\'t possible save.');
  //     console.log(error)
  //   }
  // }, [])


  return (
    <div className="App">
      <Sheet />
    </div>
  );
}

export default App;
