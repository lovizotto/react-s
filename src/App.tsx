import React, {useEffect, useState} from 'react';
import './App.css';
import {Sheet} from './components/Sheet';
import {useStore} from "./store/store";
// @ts-ignore
import uuid from 'react-uuid'

function App() {
    const {spreadsheet, updateSpreadSheet, setStoreId, storeId} = useStore();
    const [spreadsheetId] = useState(() => uuid());
    useEffect(() => {
        const storeId = window.location.href.split('#')[1];
        setStoreId(storeId)
        const storage = localStorage.getItem(storeId);

        if (!window.location.href.includes('#') && !storage) {
            window.location.href += '#' + spreadsheetId;
            localStorage.setItem(spreadsheetId, '');
        } else {
            const storage: string = localStorage.getItem(storeId) || '';
            try {
                const storageSpreadsheet = JSON.parse(storage);
                updateSpreadSheet(storageSpreadsheet);
            } catch (error: any) {
                console.log(error)
            }
        }
    }, []);

    useEffect(() => {
        const storageSpreadsheet = JSON.stringify(spreadsheet);
        localStorage.setItem(storeId, storageSpreadsheet);
    }, [spreadsheet])

    return (
        <div className="App">
            <Sheet/>
        </div>
    );
}

export default App;
