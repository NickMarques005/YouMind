# YouMind Mobile Application

YouMind is a comprehensive system designed to assist in the treatment of anxiety and depression. The system integrates a programmable watch (T-Watch) with a mobile application, providing a range of functionalities for both users and medical professionals.

## Table of Contents

1. [Project Description](#project-description)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Architecture](#architecture)
5. [Get Started](#get-started)

## Project Description

The YouMind mobile application is developed using React Native, enabling high-performance, cross-platform capabilities. The application integrates seamlessly with the T-Watch via Bluetooth Low Energy (BLE) and Wi-Fi, ensuring efficient and secure data communication. The project is hosted on two virtual machines: one for processing server-side logic and another for database management.

## Features

### User Authentication

- **Login and Registration**: Easy-to-use interfaces for new users to register and existing users to log in.
- **OTP (One-Time Password)**: Identity verification through email codes.
- **Password Reset**: Secure process for password recovery.

### Medical Professionals' Interface

- **Home**: Intuitive navigation among the app’s functionalities.
- **Profile**: Update personal information, profile picture, and general settings.
- **Notepad**: Secure tool for taking important treatment notes.
- **Analysis**: View patient performance metrics to gain treatment insights.
- **Treatment**: Search for patients, start and end treatments, view general and specific treatment data.
- **Chat**: Secure communication with each patient in treatment.

### Patients' Interface

- **Home**: Quick access to main functionalities and data.
- **Profile**: Update personal information, profile picture, and general settings.
- **Treatment**: Search for doctors, start treatments, access chat with responsible doctor (without the ability to end or alter treatment).
- **Health**: Set of main functionalities for health management:
  - **Call CVV**: Direct call to CVV (suicide prevention hotline).
  - **Medications**: Add, update, and remove medications with alert scheduling.
  - **Questionnaires**: Daily mental health questionnaires with response monitoring.
- **Bluetooth**: Scan and pair YouMind T-Watch 2020 v3 devices, sync data for integrated use with the app.

### T-Watch Integration

- **Alerts and Notifications**: Reminders for medications and updates.
- **Advanced Settings**: Adjust battery, display, and alerts directly through the app.

## Technologies Used

### Front-end

- **React Native**: Framework for mobile development.
- **React**: Used for specific password reset applications.

### Back-end

- **Node.js**: Server-side logic.
- **Socket.io**: Bidirectional communication for chat and application state updates.
- **MongoDB**: NoSQL database for storing user data, medications, questionnaires, treatment history, notifications, messages, and notes.
- **Amazon SQS**: Message queue for scalable task management.
- **Node.js Agenda**: Library for task scheduling.
- **Firebase**: Used for user authentication, push notifications, and audio file storage (.m4a) for chats.
- **Nodemailer and OAuth2**: Secure email sending for password changes, important updates, and other communications.

## Architecture

The architecture is composed of various components integrated to provide a secure and seamless experience:

- **BLE and Wi-Fi Communication**: Ensures efficient and secure data transmission between the mobile device and T-Watch.
- **Firebase Authentication**: Manages user authentication with high security.
- **Push Notifications**: Ensures real-time communication with users.
- **Email System**: Uses Nodemailer and OAuth2 for secure email communications.
- **Task Management**: Combines Amazon SQS and Node.js Agenda for scalable and resilient task scheduling.

## Get Started

### Prerequisites

- NPM Installed
- Firebase account configured
- Mobile device or emulator

1. **Clone the YouMind repository:**
    ```sh
    git clone https://github.com/NickMarques005/YouMind.git
    ```

2. **Navigate to the project directory:**
    ```sh
    cd YouMind
    ```

3. **Install project dependencies:**
    ```sh
    npm install
    ```

4. **Configure environment variables:**
    Create a `.env` file in the project root and add the necessary configurations for Firebase and API variables. (SERVER_URL, API_ROUTE and FIREBASE_API_KEY)

5. **Start the application:**

    Using Expo:
    ```sh
    npx expo start
    ```

    To run on an Android device or emulator:
    ```sh
    npx expo run:android
    ```

    To run on an iOS device or simulator (requires a Mac):
    ```sh
    npx expo run:ios
    ```

## Contribution Guidelines

Contributions to the YouMind Mobile Application project are restricted to team members and authorized personnel only. If you are part of the project team and would like to contribute, please follow these guidelines:

1. **Branching Strategy**: Use meaningful branch names and create pull requests for new features or fixes.
2. **Code Review**: All code changes must go through a code review process before being merged.
3. **Testing**: Ensure that new features or fixes are adequately tested.
4. **Documentation**: Update relevant documentation, including README.md, with any changes.

For any questions or to request access to contribute, please contact youmind.oficial@gmail.com.
