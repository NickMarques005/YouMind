import InitialHeader from "@components/header/InitialHeader";
import { UseInitNavigation } from "@features/init/hooks/UseInitNavigation"
import { explanation_header_style } from "../styles/ExplanationHeader";
import CustomHeader from "@components/header/CustomHeader";
import images from "@assets/images";


const Header = () => {
    
    const { navigateToInitScreen } = UseInitNavigation();
    const styles = explanation_header_style();

    const logo = images.generic_images.logo.logo_mobile_default;
    const backButtonImg = images.generic_images.back.arrow_back_white;
    return (
        <>
            <CustomHeader
                leftButtonPress={() => navigateToInitScreen('welcome')}
                leftButtonIcon={backButtonImg}
                leftStyleButtonIcon={styles.buttonBack}
                leftStyleImageIcon={styles.imgIconBack}
                
                headerImage={logo}
                styleLogo={styles.imageYouMind}
                gradientColors={['#ab32a5', '#54b0c4']}
            />
        </>
    )
}

export default Header;