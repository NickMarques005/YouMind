export interface NoteTemplate {
    _id: string;
    title: string;
    description: string;
    content: string[];
    createdAt: string;
    updatedAt: string;
    doctor_id: string;
}

export interface UpdateCurrentNote {
    updatedTitle?: string;
    updatedDescription?: string;
    updatedContent?: string[];
}

export interface Request_CreateNewNoteArgs {
    title: string;
    description?: string;
}

export type Request_UpdateNoteArgs = UpdateNote;

export interface DeleteNoteResponse {
    deletedNote: string;
}

export interface UpdateNoteResponse{
    updatedNote: NoteTemplate;
}

export interface UpdateNote {
    content?: string[];
    description?: string;
    title?: string;
}