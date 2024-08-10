import 'dotenv/config';

export default {
    expo: {
        name: "YouMind",
        slug: "YouMind",
        version: "1.0.0",
        orientation: "portrait",
        icon: "./assets/icon.png",
        userInterfaceStyle: "light",
        splash: {
            image: "./assets/splash.png",
            resizeMode: "contain",
            backgroundColor: "#000000"
        },
        assetBundlePatterns: [
            "**/*"
        ],
        ios: {
            supportsTablet: true
        },
        android: {
            adaptiveIcon: {
                adaptiveIcon: "./assets/images/adaptive-icon.png",
                resizeMode: "contain",
                backgroundColor: "#ffffff"
            },
            package: "com.marquesnicolas.YouMind",
            googleServicesFile: process.env.GOOGLE_SERVICES_JSON,
            permissions: [
                "android.permission.RECORD_AUDIO",
                "android.permission.CALL_PHONE"
            ]
        },
        web: {
            favicon: "./assets/favicon.png"
        },
        plugins: [
            [
                "expo-image-picker",
                {
                    photosPermission: "The app accesses your photos to let you share them with your friends."
                }
            ]
        ],
        extra: {
            eas: {
                projectId: "3d182b66-f00d-45eb-ab1f-63cca9f8671e"
            }
        },
        owner: "marquesnicolas"
    }
};