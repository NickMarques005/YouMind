import { MessageIconTypes, DefaultIconTypes, DefaultIconType, MessageIconType } from "types/icon/Icon_Types";

export const messageIconMap: Record<keyof MessageIconTypes, MessageIconType> = {
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
};

export const defaultIconMap: Record<keyof DefaultIconTypes, DefaultIconType> = {
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