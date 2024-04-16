import { MakeRequest } from "../Request";
import { Tokens } from "../../types/auth/Auth_Types";
import { Response } from "../../types/service/Request_Types";
import { DeleteNoteResponse, NoteTemplate, Request_CreateNewNoteArgs, Request_DeleteNoteArgs } from "../../types/notepad/Notepad_Types";

export const NotepadService = {
    CreateNewNote: async (createNoteData: Request_CreateNewNoteArgs, tokens: Tokens | undefined): Promise<Response<NoteTemplate>> => {
        return MakeRequest<NoteTemplate>(
            'notepad/create',
            'POST',
            { ...createNoteData },
            tokens?.accessToken,
            tokens?.refreshToken
        );
    },

    ReadNotes: async (tokens: Tokens | undefined): Promise<Response<NoteTemplate[]>> => {
        return MakeRequest<NoteTemplate[]>(
            'notepad/read',
            'GET',
            undefined,
            tokens?.accessToken,
            tokens?.refreshToken
        );
    },

    DeleteNote: async (deleteNoteData: Request_DeleteNoteArgs, tokens: Tokens | undefined): Promise<Response<DeleteNoteResponse>> => {
        return MakeRequest<DeleteNoteResponse>(
            'notepad/delete',
            'POST',
            { ...deleteNoteData },
            tokens?.accessToken,
            tokens?.refreshToken
        );
    }
};