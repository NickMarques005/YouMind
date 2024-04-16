import { NotepadService } from "../../services/notepad/NotepadServices";
import { SetLoading } from "../../types/loading/Loading_Types";
import { UseRequest } from "./UseRequest";
import { Tokens } from "../../types/auth/Auth_Types";
import { Request_CreateNewNoteArgs, Request_DeleteNoteArgs } from "../../types/notepad/Notepad_Types";

export const UseNotepadService = (setLoading: SetLoading) => {
    const { HandleRequest } = UseRequest();

    const performReadNotes = (tokens: Tokens) => {
        return HandleRequest(NotepadService.ReadNotes, setLoading, tokens);
    }

    const performCreateNewNote = (args: Request_CreateNewNoteArgs,tokens: Tokens) => {
        return HandleRequest(NotepadService.CreateNewNote, setLoading, args, tokens);
    }

    const performDeleteNote = (args: Request_DeleteNoteArgs, tokens: Tokens) => {
        return HandleRequest(NotepadService.DeleteNote, setLoading, args, tokens )
    }

    return { performReadNotes, performCreateNewNote, performDeleteNote};
}




