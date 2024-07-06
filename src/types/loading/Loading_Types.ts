import { Dispatch, SetStateAction } from 'react';

export type LoadingState = boolean;

export type SetLoading = Dispatch<SetStateAction<LoadingState>>;