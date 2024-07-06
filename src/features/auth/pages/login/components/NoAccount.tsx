import React from 'react';
import { View, Text } from 'react-native';
import { UseAuth } from '@features/root/providers/AuthenticationProvider';
import { no_account_style } from '../styles/NoAccount';
import CustomButton from '@components/button/CustomButton';
import { UseAuthNavigation } from '@features/auth/hooks/UseAuthNatigation';

interface NoAccountProps {
    loading: boolean;
}

const NoAccount = ({ loading }: NoAccountProps) => {

    const { userType } = UseAuth();
    const styles = no_account_style(userType);
    const { navigateToAuthScreen } = UseAuthNavigation();

    return (
        <View style={styles.registerSection} >
            <Text style={styles.registerText}>Não possui conta ainda?</Text>
            <CustomButton
                onPress={() => navigateToAuthScreen('register')}
                title="Cadastre-se"
                textStyle={styles.registerLink}
                disabled={loading}
            />
        </View>
    )
}

export default NoAccount;


