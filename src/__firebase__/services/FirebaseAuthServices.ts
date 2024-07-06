import { Response } from 'types/service/Request_Types';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import {
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';
import { LoginBackendDataResponse, LoginFirebaseDataResponse } from 'types/auth/Auth_Types';

const auth = FIREBASE_AUTH;

const FB_LoginWithEmail = async (email: string, password: string): Promise<Response<LoginBackendDataResponse>> => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const data: LoginFirebaseDataResponse = {
            email: userCredential.user.email!,
            uid: userCredential.user.uid
        };
        return { success: true, data, type: 'success'};
    } catch (err) {
        const error = err as Error;
        return { success: false, error: `Senha incorreta - ${error.message}` };
    }
}

const FB_Logout = async (): Promise<Response<undefined>> => {
    try{
        await signOut(auth);
        console.log("(FB LOGOUT) Deslogado do Firebase!!!");
        return { success: true, type: 'success'};
    }
    catch (err)
    {
        const error = err as Error;
        return { success: false, error: `Falha ao deslogar - ${error.message}` };
    }
    
}

export { FB_LoginWithEmail, FB_Logout }
