import React, { createContext, useReducer } from "react";
import { ReactNode } from "react";

export type ModifyDeleteState = {
    state: string;
    title: string
};

export interface Action {
    type: string;
    Payload: string
}

export type Dispatch = (action: Action) => void;

const initialState: ModifyDeleteState = { state: "", title: "" };

export const ModifyDeleteContext = createContext<[ModifyDeleteState, Dispatch]>([initialState, () => {}]);

function ModifyDeleteReducer( state: ModifyDeleteState, { type, Payload }: Action ): ModifyDeleteState {
    switch (type) {

        case "SET_DELETE":
            return { ...state, state: "delete", title: Payload};

        case "SET_MODIFY":
            return { ...state, state: "modify", title: Payload};

        case "SET_INIT":
            return { ...state, state: "", title: ""};

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
