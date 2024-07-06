import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Header from './components/RegisterHeader';
import Form from './components/RegisterForm';
import HasAccount from './components/HasAccount';
import { UseLoading } from '@hooks/loading/UseLoading';
import { UseErrors } from '@hooks/error/UseErrors';
import ErrorModal from '@components/modals/error/ErrorModal';
import { UseAuth } from '@features/root/providers/AuthenticationProvider';
import { UseResponseError } from '@hooks/error/UseResponseError';

const Register = () => {

    const { userType } = UseAuth();
    const { loading, setLoading } = UseLoading();
    const { errors, HandleErrors, ClearError, ClearAllErrors } = UseErrors(['name', 'email', 'password', 'phone', 'doctor_crm']);
    const { responseError, ClearResponseError, HandleResponseError } = UseResponseError();

    return (
        <ScrollView style={{ flex: 1 }}>
            <KeyboardAwareScrollView enableOnAndroid={true} contentContainerStyle={register_style.scrollviewKeyboard}>
                <View style={register_style.mainContainer}>
                    <Header loading={loading} />
                    <Form loading={loading}
                        setLoading={setLoading}
                        HandleErrors={HandleErrors}
                        errors={errors}
                        ClearError={ClearError}
                        setResponseError={HandleResponseError}
                    />
                    <HasAccount
                        loading={loading}
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
                </View>
            </KeyboardAwareScrollView>
        </ScrollView>
    )
}

const register_style = StyleSheet.create({
    mainScrollView: {
        flex: 1
    },
    scrollviewKeyboard: {
        width: '100%',
        height: 'auto',
    },
    mainContainer: {
        alignItems: 'center',
        backgroundColor: 'white',
    },
});


export default Register;