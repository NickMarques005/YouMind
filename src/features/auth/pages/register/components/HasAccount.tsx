import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { has_account_style } from '../styles/HasAccount';
import { UseAuth } from '@features/root/providers/AuthenticationProvider';
import CustomButton from '@components/button/CustomButton';
import { UseAuthNavigation } from '@features/auth/hooks/UseAuthNatigation';

interface HasAccountProps {
    loading: boolean;
}

const HasAccount = ({ loading }: HasAccountProps) => {
    
    const { userType } = UseAuth();
    const styles = has_account_style(userType);
    const { navigateToAuthScreen } = UseAuthNavigation();

    return (
        <View style={styles.loginSection}>
            <Text style={styles.loginText}>Já tem uma conta existente?</Text>
            <CustomButton 
                onPress={() => navigateToAuthScreen('login')}
                title="Faça Login agora"
                textStyle={styles.loginLink}
                disabled={loading}
            />
        </View>
    );
};

export default HasAccount;