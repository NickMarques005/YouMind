import { Dispatch, SetStateAction } from 'react';

export type LoadingState = boolean;

export type SetLoading = Dispatch<SetStateAction<LoadingState>>;

export interface LoadingStructure {
        loading: boolean;
        setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}