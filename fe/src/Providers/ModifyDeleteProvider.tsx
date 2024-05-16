import React, { createContext, useReducer } from "react";
import { ReactNode } from "react";

export type ModifyDeleteState = {
    state: string;
    id: string | number
};

export interface Action {
    type: string;
    Payload: string | number
}

export type Dispatch = (action: Action) => void;

const initialState: ModifyDeleteState = { state: "", id: "" };

export const ModifyDeleteContext = createContext<[ModifyDeleteState, Dispatch]>([initialState, () => {}]);

function ModifyDeleteReducer( state: ModifyDeleteState, { type, Payload }: Action ): ModifyDeleteState {
    switch (type) {

        case "SET_CREATE":
            return { ...state, state: "create", id: Payload};

        case "SET_MODIFY":
            return { ...state, state: "modify", id: Payload};

        case "SET_INIT":
            return { ...initialState };

        default:
            throw new Error();
    }
}

const ModifyDeleteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [ModifyDeleteState, ModifyDeleteDispatch] = useReducer(ModifyDeleteReducer, initialState);

    return (
        <ModifyDeleteContext.Provider value={[ModifyDeleteState, ModifyDeleteDispatch]}>
            {children}
        </ModifyDeleteContext.Provider>
    );
};

export default ModifyDeleteProvider;
