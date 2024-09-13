
export type MessageIconType =
    'check-circle-outline' |    //Ícone de sucesso
    'email-outline' |           //Ícone de e-mail
    'information-outline' |     //Ícone de informação
    'hospital-box-outline' |    //Ícone de tratamento
    'alert-outline' |           //Ícone de alerta
    'pill' |                    //Ícone de medicamento
    'clipboard-text-outline' |  //Ícone de questionário
    'close-circle-outline' |    // Ícone para finalizar algo
    'calendar-check-outline' |  // Ícone para completar tarefas ou compromissos
    'heart-outline' |           // Ícone para saúde mental/bem-estar
    'account-heart-outline' |   // Ícone para apoio social ou emocional
    'emoticon-outline' |
    'shield-lock-outline' |      // ícone de proteção bloqueada
    'shield-check-outline' |   // ícone de proteção desbloqueada
    'notebook' |              // ícone de anotação
    'notebook-check'          //ícone de anotação checada
    ;

/*
### Icones de MaterialCommunityIcons
*/
export interface MessageIconTypes {
    success: 'check-circle-outline',
    email_sent: 'email-outline',
    info: 'information-outline',
    treatment: 'hospital-box-outline',
    warning: 'alert-outline',
    medication: 'pill',
    questionnaire: 'clipboard-text-outline',
    finish: 'close-circle-outline',
    completed: 'calendar-check-outline',
    mental_health: 'heart-outline',
    support: 'account-heart-outline',
    mood: 'emoticon-outline',
    shield_lock: 'shield-lock-outline',
    shield_unlock: 'shield-check-outline',
    notebook: 'notebook',
    notebook_check: 'notebook-check'
}

export type MessageIconTypeKey = keyof MessageIconTypes;

export type DefaultIconType =
    'check-circle' |
    'email' |
    'info' |
    'healing' |
    'warning' |
    'medication' |
    'assignment' |
    'cancel' |               
    'event-available' |       
    'favorite' |              
    'favorite-border' |       
    'mood' | 
    'shield' |               
    'shield-outline' |
    'edit' | 
    'delete' | 
    'description'; 

/*
### Icones de MaterialIcons
*/
export interface DefaultIconTypes {
    success: 'check-circle',
    email_sent: 'email',
    info: 'info',
    treatment: 'healing',
    warning: 'warning',
    medication: 'medication',
    questionnaire: 'assignment',
    finish: 'cancel',                  
    completed: 'event-available',      
    mental_health: 'favorite',         
    support: 'favorite-border',        
    mood: 'mood',
    shield_lock: 'shield',
    shield_unlock: 'shield-outline',
    edit: 'edit',
    delete: 'delete',
    description: 'description'
}

export type DefaultIconTypeKey = keyof DefaultIconTypes;