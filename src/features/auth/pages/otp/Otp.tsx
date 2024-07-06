import React, { RefObject, useEffect, useState } from 'react'
import { KeyboardAvoidingView, View, TouchableOpacity, Text, StyleSheet, TextInput, Keyboard, Image } from 'react-native';
import { screenHeight, screenWidth } from '@utils/layout/Screen_Size';
import Header from './components/OtpHeader';
import { UseLoading } from '@hooks/loading/UseLoading';
import OtpForm from './components/OtpForm';
import { UseResponseError } from '@hooks/error/UseResponseError';
import ErrorModal from '@components/modals/error/ErrorModal';
import { UseAuth } from '@features/root/providers/AuthenticationProvider';
import ResendOtp from './components/ResendOtp';
import MessageModal from '@components/modals/message/MessageModal';
import { UseMessage } from '@hooks/message/UseMessage';
import UseParams from '@hooks/params/UseParams';

const OTP = () => {

    const { loading, setLoading } = UseLoading();
    const { responseError, HandleResponseError, ClearResponseError } = UseResponseError();
    const { message, messageType, HandleMessage, ClearMessage } = UseMessage();
    const { params, paramType, hasParams, setHasParams, ClearParams } = UseParams();
    const { userType } = UseAuth();

    return (
        <KeyboardAvoidingView style={OtpStyles.mainContainer}>

            <Header loading={loading} />
            <OtpForm
                HandleError={HandleResponseError}
                setLoading={setLoading}
                loading={loading}
            />
            <ResendOtp
                validateLoading={loading}
                HandleError={HandleResponseError}
                HandleMessage={HandleMessage}
            />
            {
                hasParams ?
                    (<MessageModal
                        isVisible={hasParams}
                        message={params?.params?.message ? params.params?.message : "Houve um erro desconhecido"}
                        onClose={params ? ClearParams : () => setHasParams(false)}
                        userType={userType}
                        messageType={paramType}
                    />)
                    :
                    message ?
                        (<MessageModal
                            isVisible={!!message}
                            message={message}
                            onClose={ClearMessage}
                            userType={userType}
                            messageType={messageType}
                        />)
                        : ""}
            {
                !!responseError &&
                <ErrorModal
                    isVisible={!!responseError}
                    message={responseError}
                    onClose={ClearResponseError}
                    userType={userType}
                />
            }
        </KeyboardAvoidingView>
    )
}

const OtpStyles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
});

export default OTP;