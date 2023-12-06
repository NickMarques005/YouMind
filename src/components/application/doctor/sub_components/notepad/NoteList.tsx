import React from 'react'
import { UseAuth } from '../../../../../contexts/AuthContext'
import { NotepadType, UseNotepad } from '../../../../../contexts/NotepadContext';
import WithLoader from '../../../../hoc/withLoader';
import NoteHandle from './NoteHandle';

interface NoteListProps {
    handleSelectedNote: (note: NotepadType) => void
    
}

function NoteList({ handleSelectedNote }: NoteListProps) {
    const { notepadData } = UseNotepad();

    const notesRequest = {
        url: "readNotes",
        method: 'POST',
    }
    const NoteLoader = WithLoader(NoteHandle, notesRequest, 'mini_loading', {handleSelectedNote: handleSelectedNote})

    return (
        <>
            <NoteLoader />
        </>
    )
}

export default NoteList;