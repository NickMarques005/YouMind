import { MakeRequest } from "../Request";
import { Response } from "types/service/Request_Types";
import { DeleteNoteResponse, NoteTemplate, Request_CreateNewNoteArgs, Request_UpdateNoteArgs, UpdateNoteResponse } from "types/app/doctor/notepad/Notepad_Types";
import { GetAccessToken } from "@utils/token/GetAccessToken";

export const NotepadService = {
    CreateNewNote: async (createNoteData: Request_CreateNewNoteArgs): Promise<Response<NoteTemplate>> => {
        const token = await GetAccessToken();
        return MakeRequest<NoteTemplate>(
            'notepad/create',
            'POST',
            { ...createNoteData },
            token
        );
    },

    ReadNotes: async (): Promise<Response<NoteTemplate[]>> => {
        const token = await GetAccessToken();
        return MakeRequest<NoteTemplate[]>(
            'notepad/read',
            'GET',
            undefined,
            token
        );
    },

    DeleteNote: async (id: string): Promise<Response<DeleteNoteResponse>> => {
        const token = await GetAccessToken();
        return MakeRequest<DeleteNoteResponse>(
            'notepad/delete',
            'DELETE',
            undefined,
            token,
            undefined,
            id
        );
    },

    UpdateNote: async (updateNoteData: Request_UpdateNoteArgs, noteId: string ) => {
        const token = await GetAccessToken();
        return MakeRequest<UpdateNoteResponse>(
            'notepad/update',
            'PUT',
            { ...updateNoteData },
            token,
            undefined,
            noteId
        );
    }
};