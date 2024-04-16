export interface NoteTemplate {
    _id: string;
    title: string;
    description: string;
    doctor_id: string;
}

export interface Request_CreateNewNoteArgs {
    title: string;
    description: string;
}

export interface Request_DeleteNoteArgs {
    noteId: string;
}

export interface DeleteNoteResponse{
    deletedNote: string;
}