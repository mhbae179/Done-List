import React , {createContext, useContext, useState, createRef } from 'react';
import sdk from '../sdk'

export const DoneContext = createContext({
    selectDay: null,
    onChangeSelectDay: (date) => {}
})

export const UCProvider = ({ children })=> {
    const [selectDay, setSelectDay] = useState(null);

    const state = {
        selectDay,
        onChangeSelectDay
    }

    const onChangeSelectDay = (date) => {
        setSelectDay(date)
    }

    return (
        <DoneContext.Provider value={state}>
            {children}
        </DoneContext.Provider>
    )
}

export const useUCState = () => {
    const state = useContext(DoneContext)
    if(!state) throw new Error("Cannot find UCProvider")
    return state
}