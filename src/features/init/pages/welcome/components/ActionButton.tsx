import React from 'react';
import { UseInitNavigation } from '@features/init/hooks/UseInitNavigation';
import { action_button_style } from '../styles/ActionButton';
import { LinearGradient } from 'expo-linear-gradient';
import CustomButton from '@components/button/CustomButton';

const ActionButton = () => {

    const { navigateToInitScreen } = UseInitNavigation();
    const styles = action_button_style();

    return (
        <LinearGradient colors={['#7e388f', '#9446a6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }} style={styles.buttonViewStart}>
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