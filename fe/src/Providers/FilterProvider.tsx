import React, { createContext, useReducer } from "react";
import { ReactNode } from "react";

export type FilterState = {
    req_query: string;
};

export interface Action {
    type: string;
    prevFilter?: string | RegExp;
    curFilter: string;
}

export type Dispatch = (action: Action) => void;

const initialState: FilterState = { req_query: "is_open=true" };

export const FilterContext = createContext<[FilterState, Dispatch]>([initialState, () => {}]);

function FilterReducer(state: FilterState, { type, prevFilter, curFilter }: Action): FilterState {

    switch (type) {

        case "SET_ISSUE_FILTER":
            return { ...state, req_query: state.req_query.replace(prevFilter as string, curFilter)};

        case "SET_TASK_FILTER":
            if (prevFilter === "") return { ...state, req_query: state.req_query +  " " + curFilter};
            return { ...state, req_query: state.req_query.replace(prevFilter as string, curFilter).trim()};

        case "REMOVE_CURRENT_FILTER":
            if(state.req_query.replace(curFilter, "") === "") return {...state, req_query: "is_open=true"}
            return {...state, req_query: state.req_query.replace(curFilter, "").trim()};

        case "SET_INIT":
            return { req_query: "is_open=true" };

        case "SEARCH":
            return { ...state, req_query: curFilter};

        default:
            throw new Error();
    }
}

const FilterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [FilterState, FilterDispatch] = useReducer(FilterReducer, initialState);
    
    return (
        <FilterContext.Provider value={[ FilterState, FilterDispatch ]}>
            {children}
        </FilterContext.Provider>
    )
};

export default FilterProvider;
