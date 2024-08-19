import { screenWidth } from "@utils/layout/Screen_Size";
import { memo } from "react";
import { Text } from "react-native";
import LinearGradient from "react-native-linear-gradient";



interface MessageDateProps{
    date: string;
    userType?: string;
}


const MessageDate: React.FC<MessageDateProps> = ({ date, userType }) => {
    
    return (
        <LinearGradient colors={userType === 'patient' ? ["#6c3b7a",`#4f2c59`] : [`#3b6c7a`, "#2c4659",]}
        start={{ x: 0, y: 0 }
        }
        end={{ x: 0, y: 1 }} style={[{ alignSelf: 'center', padding: 10, marginVertical: 25, minWidth: screenWidth * 0.2, borderRadius: 50, opacity: 0.8, alignItems: 'center' }]} >
                <Text style={{ color: 'white', fontSize: 14, }}>{ date }</Text>
        </LinearGradient>
    )
}

export default memo(MessageDate);