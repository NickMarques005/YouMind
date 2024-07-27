import { NotepadService } from "@api/services/notepad/NotepadServices";
import { SetLoading } from "types/loading/Loading_Types";
import { UseRequest } from "./UseRequest";
import { Request_CreateNewNoteArgs, Request_UpdateNoteArgs } from "types/app/doctor/notepad/Notepad_Types";
import { GetAccessToken } from "@utils/token/GetAccessToken";

export const UseNotepadService = (setLoading: SetLoading) => {
    const { HandleRequest } = UseRequest();

    const performReadNotes = async (stopLoading?: boolean) => {
        return HandleRequest({
            serviceFunction: NotepadService.ReadNotes,
            setLoading,
            params: [],
            stopLoading
        });
    }

    const performCreateNewNote = async (args: Request_CreateNewNoteArgs) => {
        return HandleRequest({
            serviceFunction: NotepadService.CreateNewNote,
            setLoading,
            params: [args]
        });
    }

    const performDeleteNote = async (id: string) => {
        return HandleRequest({
            serviceFunction: NotepadService.DeleteNote,
            setLoading,
            params: [id]
        });
    }

    const performUpdateNote = async (args: Request_UpdateNoteArgs, id: string) => {
        return HandleRequest({
            serviceFunction: NotepadService.UpdateNote,
            setLoading,
            params: [args, id]
        });
    }


    return { performReadNotes, performCreateNewNote, performDeleteNote, performUpdateNote };
}




