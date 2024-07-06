import { FIREBASE_AUTH } from "../../__firebase__/FirebaseConfig";

export const GetAccessToken = async (): Promise<string | null> => {
    const auth = FIREBASE_AUTH;
    const user = auth.currentUser;
    if (!user) {
        console.log("Nenhum usuário conectado.");
        return null;
    }
    try {
        const token = await user.getIdToken(true); // true para forçar a atualização do token
        return token;
    } catch (error) {
        console.error("Erro ao obter o token de acesso:", error);
        return null;
    }
};