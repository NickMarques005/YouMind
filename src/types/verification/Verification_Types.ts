export interface Verification {
    handleAccept: () => void;
    message?: string; 
    acceptText?: string;
    declineText?: string;
}