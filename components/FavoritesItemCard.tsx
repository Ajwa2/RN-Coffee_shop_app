import { StyleSheet, Text, View, ImageProps } from 'react-native'
import React from 'react'
import ImageBackgroundInfo from './ImageBackgroundInfo'
import { LinearGradient } from 'expo-linear-gradient'
import { BORDERRADIUS, COLORS, FONTSIZE, SPACING, FONTFAMILY} from '@/constants/Colors'


interface FavoritesItemCardProps {
    id: string;
    imagelink_portrait: ImageProps;
    name: string;
    special_ingredient: string;
    type: string;
    ingredients: string;
    average_rating: number;
    ratings_count: string;
    roasted: string;
    description: string;
    favourite: boolean;
    ToggleFavouriteItem: any;
    }

const FavoritesItemCard : React.FC<FavoritesItemCardProps> = ({
    id, imagelink_portrait,
    name, special_ingredient,
    type, ingredients,
    average_rating, ratings_count,
    roasted, description,
    favourite, ToggleFavouriteItem,
    }) => {
    return (
        <View>
            <Text>FavoritesItemCard</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    CardContainer: {
        borderRadius: BORDERRADIUS.radius_25,
        overflow: 'hidden',
    },
    ContainerLinearGradient: {
        gap: SPACING.space_10,
        padding: SPACING.space_20,
    },
    DescriptionTitle: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_16,
        color: COLORS.secondaryLightGreyHex,
    },
    DescriptionText: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_14,
        color: COLORS.primaryWhiteHex,
    },
})

export default FavoritesItemCard

