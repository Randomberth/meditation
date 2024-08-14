import { View, Text, TouchableOpacity } from 'react-native'
import React, { FC } from 'react'

interface CustomButtomProps {
    onPress: () => void;
    title: string;
    textStyles?: string;
    containerStyles?: string;
}


const CustomButtom: FC<CustomButtomProps>  = ({ 
    onPress, 
    title, 
    textStyles ="", 
    containerStyles ="" 
    }) => {

    return (
        <TouchableOpacity
            activeOpacity={0.7}
            className={`h-[70px] my-4 bg-white rounded-xl justify-center items-center ${containerStyles}`}
            onPress={onPress}
        >
            <Text className={`font-semibold text-lg ${textStyles}`}>
                {title }
            </Text>
        </TouchableOpacity>  )
}

export default CustomButtom