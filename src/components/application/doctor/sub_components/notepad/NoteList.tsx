import React from 'react'
import { UseAuth } from '../../../../../providers/AuthenticationProvider'
import { NotepadType, UseNotepad } from '../../../../../providers/NotepadProvider';
import WithLoader from '../../../../hoc/withLoader';
import NoteHandle from './NoteHandle';

interface NoteListProps {
    handleSelectedNote: (note: NotepadType) => void
    
}

function NoteList({ handleSelectedNote }: NoteListProps) {
    const { notepadData } = UseNotepad();

    const notesRequest = {
        route: "readNotes",
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