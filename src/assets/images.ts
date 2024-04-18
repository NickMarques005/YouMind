const generic_images = {
    auth: {
        doctor: {
            doctor_background_auth: require('./img/generic/auth/doctor/doctor_background_auth.jpg'),
            doctor_button_auth: require('./img/generic/auth/doctor/doctor_button_auth.jpg'),
            user_doctor: require('./img/generic/auth/doctor/user_doctor.png'),
            email_doctor: require('./img/generic/auth/doctor/email_doctor.png'),
            pass_doctor: require('./img/generic/auth/doctor/pass_doctor.png'),
            phone_doctor: require('./img/generic/auth/doctor/phone_doctor.png'),
            crm_doctor: require('./img/generic/auth/doctor/crm_doctor.png'),
        },
        patient: {
            patient_background_auth: require('./img/generic/auth/patient/patient_background_auth.jpg'),
            patient_button_auth: require('./img/generic/auth/patient/patient_button_auth.jpg'),
            user_patient: require('./img/generic/auth/patient/user_patient.png'),
            pass_patient: require('./img/generic/auth/patient/pass_patient.png'),
            email_patient: require('./img/generic/auth/patient/email_patient.png'),
            phone_patient: require('./img/generic/auth/patient/phone_patient.png'),
        }
    },
    back: {
        arrow_back_doctor: require('./img/generic/back/arrow_back_doctor.png'),
        arrow_back_patient: require('./img/generic/back/arrow_back_patient.png'),
        arrow_back_white: require('./img/generic/back/arrow_back_white.png'),
        default_back_doctor: require('./img/generic/back/default_back_doctor.png'),
        default_back_patient: require('./img/generic/back/default_back_patient.png'),
        default_back_gray: require('./img/generic/back/default_back_gray.png'),
        default_back_white: require('./img/generic/back/default_back_white.png'),
    },
    chat: {
        icon_clip: require('./img/generic/chat/icon_clip.png'),
        icon_emoji: require('./img/generic/chat/icon_emoji.png'),
        three_points: require('./img/generic/chat/three_points.png'),
    },
    choose: {
        choose_bg: require('./img/generic/choose/choose_bg.png'),
    },
    error: {
        error_icon: require('./img/generic/error/error_icon.png'),
    },
    leave: {
        leave_icon: require('./img/generic/leave/leave_icon.png'),
    },
    logo: {
        logo_mobile_color: require('./img/generic/logo/logo_mobile_color.jpg'),
        logo_mobile_default: require('./img/generic/logo/logo_mobile_default.jpg'),
        logo_mobile_error: require('./img/generic/logo/logo_mobile_error.jpg'),
    },
    notifications: {
        no_notifications: require('./img/generic/notifications/no_notifications.png'),
        youmind_notifications: require('./img/generic/notifications/youmind_notifications.png'),
    },
    remove: {
        remove_icon: require('./img/generic/remove/remove_icon.png'),
    },
    search: {
        email_icon: require('./img/generic/search/email_icon.png'),
        user_icon: require('./img/generic/search/user_icon.png'),
        phone_icon: require('./img/generic/search/phone_icon.png'),
        treatment_icon: require('./img/generic/search/treatment_icon.png'),
        search_warning_icon: require('./img/generic/search/search_warning_icon.png'),
    },
}

const app_patient_images = {
    menu: {
        menu_patient_bluetooth: require('./img/app_patient/menu/menu_patient_bluetooth.png'),
        menu_patient_health: require('./img/app_patient/menu/menu_patient_health.png'),
        menu_patient_home: require('./img/app_patient/menu/menu_patient_home.png'),
        menu_patient_settings: require('./img/app_patient/menu/menu_patient_settings.png'),
        menu_patient_treatment: require('./img/app_patient/menu/menu_patient_treatment.png'),
        menu_patient_profile: require('./img/app_patient/menu/menu_patient_profile.png'),
    },
    home: {
        home_header_patient: require('./img/app_patient/home/home_header_patient.png'),
        icon_notification: require('./img/app_patient/home/icon_notification.png'),
        icon_med1: require('./img/app_patient/home/icon_med1.png'),
        icon_med2: require('./img/app_patient/home/icon_med2.png'),
        icon_med3: require('./img/app_patient/home/icon_med3.png'),
        icon_call: require('./img/app_patient/home/icon_call.png'),
        bg_home_content_1: require('./img/app_patient/home/bg_home_content_1.png'),
        bg_home_content_2: require('./img/app_patient/home/bg_home_content_2.png'),
        bg_home_content_3: require('./img/app_patient/home/bg_home_content_3.png'),
        bg_home_content_4: require('./img/app_patient/home/bg_home_content_4.png'),
    },
    chat: {
        doctor_icon_chat: require('./img/app_patient/chat/doctor_icon_chat.png'),
        user_icon_chat: require('./img/app_patient/chat/user_icon_chat.png') ,
        icon_audio: require('./img/app_patient/chat/icon_audio.png'),
        icon_send: require('./img/app_patient/chat/icon_send.png'),
    },
    treatment: {
        illustration_treatment: require('./img/app_patient/treatment/illustration_treatment.png'),
        background_treatment: require('./img/app_patient/treatment/background_treatment.png'),
    },
    profile: {
        divisa_user: require('./img/app_patient/profile/divisa_user.png'),
        user_profile_icon: require('./img/app_patient/profile/user_profile_icon.png'),
        icon_about: require('./img/app_patient/profile/icon_about.png'),
        icon_accessibility: require('./img/app_patient/profile/icon_accessibility.png'),
        icon_contract: require('./img/app_patient/profile/icon_contract.png'),
        icon_logout: require('./img/app_patient/profile/icon_logout.png'),
        icon_notifications: require('./img/app_patient/profile/icon_notifications.png'),
        icon_permissions: require('./img/app_patient/profile/icon_permissions.png'),
        icon_privacy: require('./img/app_patient/profile/icon_privacy.png'),
        icon_safety: require('./img/app_patient/profile/icon_safety.png'),
        icon_support: require('./img/app_patient/profile/icon_support.png'),
    },
    health: {
        call: {
            call_help_button: require('./img/app_patient/health/call/call_help_button.png'),
            call_illustration: require('./img/app_patient/health/call/call_illustration.png'),
        },
        medicines: {
            icon_add_schedule: require('./img/app_patient/health/medicines/icon_add_schedule.png'),
            icon_checked_medicine: require('./img/app_patient/health/medicines/icon_checked_medicine.png'),
            medicine_bottle_type: require('./img/app_patient/health/medicines/medicine_bottle_type.png'),
            medicine_pill_type: require('./img/app_patient/health/medicines/medicine_pill_type.png'),
            medicine_pills_type: require('./img/app_patient/health/medicines/medicine_pills_type.png'),
            icon_no_medicines_found: require('./img/app_patient/health/medicines/icon_no_medicines_found.png'),
            icon_no_medicines_today: require('./img/app_patient/health/medicines/icon_no_medicines_today.png'),
            icon_plus: require('./img/app_patient/health/medicines/icon_plus.png'),
        },
        questionaires: {
            questionarie_card_illustration: require('./img/app_patient/health/questionaires/questionarie_card_illustration.png'),
            questionaires_background: require('./img/app_patient/health/questionaires/questionaires_background.png'),
        },
        menu: {
            icon_menu_call: require('./img/app_patient/health/menu/icon_menu_call.png'),
            icon_menu_medicines: require('./img/app_patient/health/menu/icon_menu_medicines.png'),
            icon_menu_default: require('./img/app_patient/health/menu/icon_menu_default.png'),
            icon_menu_questionaires: require('./img/app_patient/health/menu/icon_menu_questionaires.png'),
        }
    },
    bluetooth: {
        ble_background: require('./img/app_patient/bluetooth/ble_background.png'),
        icon_device: require('./img/app_patient/bluetooth/icon_device.png'),
        send_message: require('./img/app_patient/bluetooth/send_message.png'),
        twatch_device_off: require('./img/app_patient/bluetooth/twatch_device_off.png'),
        twatch_device_on: require('./img/app_patient/bluetooth/twatch_device_on.png'),
        twatch_scanning: require('./img/app_patient/bluetooth/twatch_scanning.gif'),
    }
}

const app_doctor_images = {
    menu: {
        menu_doctor_home: require('./img/app_doctor/menu/menu_doctor_home.png'),
        menu_doctor_treatment: require('./img/app_doctor/menu/menu_doctor_treatment.png'),
        menu_doctor_profile: require('./img/app_doctor/menu/menu_doctor_profile.png'),
        menu_doctor_analysis: require('./img/app_doctor/menu/menu_doctor_analysis.png'),
        menu_doctor_notepad: require('./img/app_doctor/menu/menu_doctor_notepad.png'),
    },
    home: {
        home_header_doctor: require('./img/app_doctor/home/home_header_doctor.png'),
        bg_home_content_1: require('./img/app_doctor/home/bg_home_content_1.png'),
        bg_home_content_2: require('./img/app_doctor/home/bg_home_content_2.png'),
        bg_home_content_3: require('./img/app_doctor/home/bg_home_content_3.png'),
        notepad_illustration: require('./img/app_doctor/home/notepad_illustration.png'),
        notes_icon: require('./img/app_doctor/home/notes_icon.png'),
        search_people_icon: require('./img/app_doctor/home/search_people_icon.png'),
        treatment_care_icon: require('./img/app_doctor/home/treatment_care_icon.png'),
    },
    chat: {
        doctor_icon_chat: require('./img/app_doctor/chat/doctor_icon_chat.png'),
        icon_audio: require('./img/app_doctor/chat/icon_audio.png'),
        icon_send: require('./img/app_doctor/chat/icon_send.png'),
        user_icon_chat: require('./img/app_doctor/chat/user_icon_chat.png'),
    },
    treatment: {
        treatment_icon: require('./img/app_doctor/treatment/treatment_icon.png'),
        in_treatment: require('./img/app_doctor/treatment/in_treatment.png'),
        no_treatments_found: require('./img/app_doctor/treatment/no_treatments_found.png'),
    },
    profile: {
        divisa_user: require('./img/app_doctor/profile/divisa_user.png'),
        doctor_profile_icon: require('./img/app_doctor/profile/doctor_profile_icon.png'),
        icon_about: require('./img/app_doctor/profile/icon_about.png'),
        icon_accessibility: require('./img/app_doctor/profile/icon_accessibility.png'),
        icon_contract: require('./img/app_doctor/profile/icon_contract.png'),
        icon_logout: require('./img/app_doctor/profile/icon_logout.png'),
        icon_notifications: require('./img/app_doctor/profile/icon_notifications.png'),
        icon_permissions: require('./img/app_doctor/profile/icon_permissions.png'),
        icon_privacy: require('./img/app_doctor/profile/icon_privacy.png'),
        icon_safety: require('./img/app_doctor/profile/icon_safety.png'),
        icon_support: require('./img/app_doctor/profile/icon_support.png'),
    },
    analysis: {
        icon_happy_total: require('./img/app_doctor/analysis/icon_happy_total.png'),
        icon_medicine_analysis: require('./img/app_doctor/analysis/icon_medicine_analysis.png'),
        icon_questionaire_analysis: require('./img/app_doctor/analysis/icon_questionaire_analysis.png'),
    },
    notepad: {
        add_note_success: require('./img/app_doctor/notepad/add_note_success.png'),
        add_page_icon: require('./img/app_doctor/notepad/add_page_icon.png'),
        note_configuration: require('./img/app_doctor/notepad/note_configuration.png'),
        notepad_bg: require('./img/app_doctor/notepad/notepad_bg.png'),
        notepad_template: require('./img/app_doctor/notepad/notepad_template.png'),
        icon_plus_notepad: require('./img/app_doctor/notepad/icon_plus_notepad.png'),
    }
}

const animations = {
    confirmation: require('./animations/configuration.json'),
    doctor_illustration: require('./animations/doctor_illustration.json'),
    patient_illustration: require('./animations/patient_illustration'),
    pensative_icon: require('./animations/pensative_icon'),
    loading: require('./animations/loading'),
    mini_loading: require('./animations/mini_loading'),
}

export default {app_doctor_images, app_patient_images, generic_images, animations};