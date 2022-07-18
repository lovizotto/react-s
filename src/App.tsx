import React, {useEffect, useCallback, useState} from 'react';
import './App.css';
import { Sheet } from './components/Sheet';
import {ISheetData} from "./components/Sheet/Sheet";

const initialState: ISheetData  = {
  'a1': {
    data: 'This is a test',
    left: undefined,
    right: 'b4'
  },
  'b3': {
    data: 'This is a test',
    left: 'b4',
    right: undefined
  },
  'b4': {
    data: 'This is a test',
    left: 'a1',
    right: 'b3'
  } 
}

function App() {
  const [data, setData] = useState<ISheetData>(() => {
    const storage: string = localStorage.getItem('amplaTest') || ''
    try {
      return JSON.parse(storage) as ISheetData;
    } catch (error: any) {
      return initialState
      console.log(error.getMessage())
    }
  })

  useEffect(() => {

  }, [data]);


  const handleSheetDataChange = useCallback((data: ISheetData) => {
    try {
      const stringfyedData = JSON.stringify(data)
      localStorage.setItem('amplaTest', stringfyedData);
      setData(data)
    } catch (error: any) {
      alert('Wasn\'t possible save.');
      console.log(error.getMessage())
    }
  }, [])

  return (
    <div className="App">
      <Sheet 
        data={data} 
        onChange={handleSheetDataChange}
      />
    </div>
  );
}

export default App;
