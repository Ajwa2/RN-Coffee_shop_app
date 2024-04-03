import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING, } from '@/constants/Colors'
import { useLocalSearchParams } from 'expo-router';

interface PriceProps {
    prices: string;
    currency: string;
    }

interface PaymentFooterProps {
    prices: PriceProps;
    buttonPressHandler: any;
    buttonTitle: string;
    }

const PaymentFooter : React.FC<PaymentFooterProps> = ({
    prices,
    buttonPressHandler,
    buttonTitle,
    }) => {
        const searchParams = useLocalSearchParams();

    return (
        <View style={styles.PriceFooter}>
            <View style={styles.PriceContainer}>
                <Text style={styles.PriceTitle}>Price</Text>
                <Text style={styles.PriceText}>
                    {searchParams.currency} <Text style={styles.Price}>{searchParams.prices}</Text>
                </Text>
            </View>
            <Pressable
                style={styles.PayButton}
                onPress={() => buttonPressHandler()}>
                <Text style={styles.ButtonText}>{buttonTitle}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    PriceFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: SPACING.space_20,
        padding: SPACING.space_8,
    },
    PriceContainer: {
        alignItems: 'center',
        width: 100,
    },
    PriceTitle: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_10,
        color: COLORS.secondaryLightGreyHex,
    },
    PriceText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryOrangeHex,
    },
    Price: {
        color: COLORS.primaryWhiteHex,
    },
    PayButton: {
        backgroundColor: COLORS.primaryOrangeHex,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: SPACING.space_36 ,
        borderRadius: BORDERRADIUS.radius_20,
    },
    ButtonText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_10,
        color: COLORS.primaryWhiteHex,
    },
})

export default PaymentFooter
