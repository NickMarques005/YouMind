import React from 'react';
import { View, TextInput, Image, Text, TouchableOpacity } from 'react-native';
import { forwardRef, ReactNode } from "react";
import { CustomTextInputProps } from './types/type_custom_input';

const CustomTextInput = React.forwardRef<TextInput, CustomTextInputProps>((props, ref) => {
    return (
        <>
            {props.error && <View style={{width: '100%', alignItems: 'flex-end', paddingBottom: '2%',}}>
                <Text style={{ color: 'red', fontSize: 12, }}>{props.error}</Text>
            </View>}
            <View style={[props.viewStyle, { opacity: props.editable === false || props.customLoading === true ? 0.5 : 1, backgroundColor: props.error ? 'rgba(135, 68, 68, 0.1)' : props.backgroundColor ? props.backgroundColor : "transparent", } ]}>
                {props.iconBefore && (
                    <Image style={props.iconBeforeStyle} source={props.iconBefore} />
                )}
                <TextInput
                    ref={ref}
                    style={[props.inputStyle, { flexGrow: 1 }]}
                    placeholder={props.placeholder}
                    placeholderTextColor={props.placeholderTextColor}
                    secureTextEntry={props.secureTextEntry}
                    value={props.value}
                    onChangeText={props.onChangeText}
                    keyboardType={props.keyboardType}
                    maxLength={props.maxLength}
                    editable={props.customDisabled ? false : props.editable}
                    autoCapitalize={props.autoCapitalize}
                    autoComplete={props.autoComplete}
                    autoCorrect={props.autoCorrect}
                    
                />
                {props.iconAfter && (
                    <TouchableOpacity disabled={props.customLoading || props.editable} onPress={props.onIconAfterPress}>
                        <Image style={props.iconAfterStyle} source={props.iconAfter} />
                    </TouchableOpacity>
                )}
                {props.iconAfterComponent}
            </View>

        </>
    );
}
)

export default CustomTextInput;