
export type SolicitationType = 'treatment';

export interface Request_CreateSolicitationArgs {
    receiver_id: string;
    solicitationType: SolicitationType;
}

export interface Request_DeclineSolicitationArgs {
    solicitationType: SolicitationType;
    solicitationId: string;
}