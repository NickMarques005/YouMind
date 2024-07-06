import React from 'react';
import images from '@assets/images';
import { otp_header_style } from '../styles/OtpHeader';
import { UseAuthNavigation } from '@features/auth/hooks/UseAuthNatigation';
import CustomHeader from '@components/header/CustomHeader';

interface OtpHeader {
    loading: boolean;
}

const Header = ({loading }: OtpHeader) => {
    const { navigateToAuthScreen } = UseAuthNavigation();
    const backButtonImg = images.generic_images.back.arrow_back_patient;
    const styles = otp_header_style();
    
    return (
            <CustomHeader
                leftButtonIcon={backButtonImg}
                leftStyleButtonIcon={styles.backButton}
                leftStyleImageIcon={styles.imgIconBack}
                leftButtonPress={() => navigateToAuthScreen('login')}
                disabledLeftButton={loading}
            />
    );
};

export default Header;