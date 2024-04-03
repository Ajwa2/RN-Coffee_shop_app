import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '@/constants/Colors'
import GradientBGIcon from './GradientBGIcon'
import ProfilePic from './ProfilePic'

interface HeaderBarProps {
    title?: string;
}

const HeaderBar : React.FC<HeaderBarProps> = ({title})  => {
    return (
        <View style={styles.HeaderContainer}>
            <GradientBGIcon
                name="navicon"
                color={COLORS.primaryLightGreyHex}
                size={FONTSIZE.size_16}
            />
            <Text style={styles.HeaderText}>{title}</Text>
            <ProfilePic />
    </View>
    )
}

const styles = StyleSheet.create({
    HeaderContainer: {
        padding: SPACING.space_28,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    HeaderText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_16,
        color: COLORS.primaryWhiteHex,
    },
})

export default HeaderBar

