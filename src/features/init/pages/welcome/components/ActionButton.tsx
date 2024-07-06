import React from 'react';
import { UseInitNavigation } from '@features/init/hooks/UseInitNavigation';
import { action_button_style } from '../styles/ActionButton';
import { LinearGradient } from 'expo-linear-gradient';
import CustomButton from '@components/button/CustomButton';

const ActionButton = () => {

    const { navigateToInitScreen } = UseInitNavigation();
    const styles = action_button_style();

    return (
        <LinearGradient colors={['#ab32a5', '#54b0c4']}
            start={{ x: 0.1, y: 0 }}
            end={{ x: 1, y: 0 }} style={styles.buttonViewStart}>
            <CustomButton
                onPress={() => navigateToInitScreen('explanation')}
                title={"COMEÇAR"}
                textStyle={styles.startText}
                buttonStyle={styles.buttonStart}
            />
        </LinearGradient>
    );
}

export default ActionButton;