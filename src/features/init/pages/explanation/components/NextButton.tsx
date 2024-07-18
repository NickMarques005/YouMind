import CustomButton from "@components/button/CustomButton";
import InitialHeader from "@components/header/InitialHeader";
import { UseInitNavigation } from "@features/init/hooks/UseInitNavigation"
import { UseInit } from "@features/root/providers/InitProvider";
import { LinearGradient } from 'expo-linear-gradient';
import { explanation_nextbutton_style } from "../styles/NextButton";

interface NextButtonProps {
    showModal: () => void;
}

const NextButton = ({ showModal}: NextButtonProps) => {

    const styles = explanation_nextbutton_style();

    return (
        <LinearGradient colors={['#4b99d1', '#539acf']}
            start={{ x: 0.1, y: 0 }}
            end={{ x: 1, y: 0 }} style={styles.containerbuttonNext}>
                <CustomButton
                    onPress={() => showModal()}
                    buttonStyle={styles.buttonNext}
                    title={"PRÓXIMO"}
                    textStyle={styles.textNext}
                />
        </LinearGradient>
    )
}

export default NextButton;