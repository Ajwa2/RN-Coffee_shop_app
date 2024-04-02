import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, FONTFAMILY,FONTSIZE } from '@/constants/Colors'
import LottieView from 'lottie-react-native'



interface EmptyListAnimationProps {
    title: string;
    }

const EmptyListAnimation : React.FC<EmptyListAnimationProps> = ({title})  => {
    return (
        <View style={styles.EmptyCartContainer}>
            <LottieView
                style={styles.LottieStyle}
                source={require('../app/lottie/coffeecup.json')}
                autoPlay
                loop
            />
            <Text style={styles.LottieText}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    EmptyCartContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    LottieStyle: {
        height: 300,
    },
    LottieText: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_16,
        color: COLORS.primaryOrangeHex,
        textAlign: 'center',
    },
})

export default EmptyListAnimation
