import React, { useEffect } from 'react';
import {
    View, StyleSheet, ScrollView,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ForgotPassword from './components/forgot_password/ForgotPassword';
import { screenHeight, screenWidth } from '@utils/layout/Screen_Size';
import Header from './components/LoginHeader';
import { UseForgotPassButton } from './hooks/UseForgotPassButton';
import NoAccount from './components/NoAccount';
import Form from './components/LoginForm';
import { UseResponseError } from '@hooks/error/UseResponseError';
import { UseRememberMe } from './hooks/UseRememberMe';
import { UseLoading } from '@hooks/loading/UseLoading';
import { UseErrors } from '@hooks/error/UseErrors';
import ErrorModal from '@components/modals/error/ErrorModal';
import { UseAuth } from '@features/root/providers/AuthenticationProvider';
import MessageModal from '@components/modals/message/MessageModal';
import UseParams, { RouteParams } from '@hooks/params/UseParams';
import { UseMessage } from '@hooks/message/UseMessage';

function Login({ }) {
    const { userType } = UseAuth();
    const { loading, setLoading } = UseLoading();
    const { forgotPassModal, HandleForgotPassModalVisibility } = UseForgotPassButton()
    const { rememberMe, HandleRememberMe } = UseRememberMe();
    const { errors, HandleErrors, ClearError } = UseErrors(['email', 'password']);
    const { responseError, ClearResponseError, HandleResponseError } = UseResponseError();
    const { params, ClearParams, hasParams, setHasParams } = UseParams<RouteParams>();
    const { message, HandleMessage, ClearMessage, messageType } = UseMessage();

    return (
        <ScrollView style={login_style.mainScrollView}>
            <KeyboardAwareScrollView enableOnAndroid={true} contentContainerStyle={login_style.scrollviewKeyboard}>
                <View style={login_style.mainContainer}>
                    <Header loading={loading} />
                    <Form
                        auth={{
                            rememberMe,
                            HandleRememberMe,
                            HandleForgotPassModalVisibility
                        }}
                        errorHandling={{
                            HandleErrors,
                            errors,
                            ClearError,
                        }}
                        loadingControl={{
                            loading,
                            setLoading
                        }}
                        responseHandling={{
                            HandleResponseError
                        }}
                    />
                    <NoAccount
                        loading={loading}
                    />
                    <ForgotPassword
                        modal={{
                            isVisible: forgotPassModal,
                            onClose: HandleForgotPassModalVisibility
                        }}
                        errorHandling={{
                            HandleResponseError
                        }}
                        messageHandling={{
                            HandleMessage
                        }}
                    />
                    {
                        !!responseError &&
                        <ErrorModal
                            isVisible={!!responseError}
                            message={responseError}
                            onClose={ClearResponseError}
                            userType={userType}
                        />
                    }
                    {
                        hasParams ?
                            (<MessageModal
                                isVisible={hasParams}
                                message={params?.params?.message ? params.params?.message : "Houve um erro desconhecido"}
                                onClose={params ? ClearParams : () => setHasParams(false)}
                                userType={userType}
                                messageType={messageType}
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
                                : ""
                    }
                </View>
            </KeyboardAwareScrollView>
        </ScrollView>
    )
}

const login_style = StyleSheet.create({
    mainScrollView: {
        flex: 1
    },
    scrollviewKeyboard: {
        width: '100%',
        height: screenHeight,
    },
    mainContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        height: '100%',
    },
});

export default Login;
