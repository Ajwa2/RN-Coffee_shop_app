import React, { useState } from 'react'
import { ScrollView, StatusBar, StyleSheet,
    Text, View, TouchableWithoutFeedback,Pressable, TouchableOpacity } from 'react-native'
import { useStore } from './store/store'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING, } from '@/constants/Colors'
import ImageBackgroundInfo from '@/components/ImageBackgroundInfo'
import PaymentFooter from '@/components/PaymentFooter'
import { Link, router, useLocalSearchParams } from "expo-router";



const Details = ({navigation, route}: any) => {
    const searchParams = useLocalSearchParams();
console.log('searchparams',searchParams);
console.log('searchParamsIndex', searchParams.index);
    const { index } = useLocalSearchParams();
    const { id } = useLocalSearchParams<{ id: string }>();
    const { type } = useLocalSearchParams<{ type: string }>();

    console.log(index,id,type);

const ItemOfIndex = useStore((state: any) =>
    searchParams.type == 'Coffee' ? state.CoffeeList : state.BeanList,
    )[searchParams.index as string];

    
console.log("ItemOfIndex",ItemOfIndex);
console.log("ItemOfIndexP",ItemOfIndex.prices.map((data:any)=>data.size));
console.log('ItemIndexC', ItemOfIndex.prices.map((d:any)=>d.currency))

const addToFavoriteList = useStore((state: any) => state.addToFavoriteList);
const deleteFromFavoriteList = useStore(
    (state: any) => state.deleteFromFavoriteList,
    );
const addToCart = useStore((state: any) => state.addToCart);
const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);
const [price, setPrice] = useState(ItemOfIndex?ItemOfIndex.length>0?ItemOfIndex.prices[0]:null:null);
const [fullDesc, setFullDesc] = useState(false);

const ToggleFavourite = (favourite: boolean, type: string, id: string) => {
    favourite ? deleteFromFavoriteList(type, id) : addToFavoriteList(type, id);
    };

const BackHandler = () => {
    navigation.pop();
    };


    console.log('totalPrice',calculateCartPrice())

const addToCarthandler = ({
    id, index, name, roasted, imagelink_square, 
    special_ingredient,type, price }: any) => {
    addToCart({
        id, index, name, roasted, imagelink_square,
        special_ingredient, type,
        prices: [{...price, quantity: 1}],
    });
    calculateCartPrice();
    router.push('/Cart')
    };


return (
    <View style={styles.ScreenContainer}>
        <StatusBar backgroundColor={COLORS.primaryBlackHex} />
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.ScrollViewFlex}>
        <ImageBackgroundInfo
            EnableBackHandler={true}
            imagelink_portrait={ItemOfIndex?.imagelink_portrait||null}
            type={ItemOfIndex.type}
            id={ItemOfIndex.id}
            favourite={ItemOfIndex.favourite}
            name={ItemOfIndex.name}
            special_ingredient={ItemOfIndex.special_ingredient}
            ingredients={ItemOfIndex.ingredients}
            average_rating={ItemOfIndex.average_rating}
            ratings_count={ItemOfIndex.ratings_count}
            roasted={ItemOfIndex.roasted}
            BackHandler={BackHandler}
            ToggleFavourite={ToggleFavourite}
        />

        <View style={styles.FooterInfoArea}>
            <Text style={styles.InfoTitle}>Description</Text>
            {fullDesc ? (
            <TouchableWithoutFeedback
                onPress={() => {
                setFullDesc(prev => !prev);
                }}>
                <Text style={styles.DescriptionText}>
                    {ItemOfIndex.description}
                </Text>
            </TouchableWithoutFeedback>
            ) : (
            <TouchableWithoutFeedback
                onPress={() => {
                setFullDesc(prev => !prev);
                }}>
                <Text numberOfLines={3} style={styles.DescriptionText}>
                    {ItemOfIndex.description}
                </Text>
            </TouchableWithoutFeedback>
            )}
            <Text style={styles.InfoTitle}>Size</Text>
            <View style={styles.SizeOuterContainer}>
            {ItemOfIndex.prices.map((data: any) =>( <TouchableOpacity 
                key={data.size}
                onPress={() => {setPrice(data)}}
                style={[styles.SizeBox,{ borderColor:data.size == data.size? COLORS.primaryOrangeHex: COLORS.primaryDarkGreyHex},]}
                ><Text style={[styles.SizeText,
                    {fontSize: ItemOfIndex.type == 'Bean'? FONTSIZE.size_14: FONTSIZE.size_16,
                            color:data.size == data.size? COLORS.primaryOrangeHex: COLORS.secondaryLightGreyHex}]}>{data.size}</Text></TouchableOpacity>)
            )}
            </View>
        </View>
        <PaymentFooter
            prices={ItemOfIndex.prices}
            buttonTitle="Add to Cart"
            buttonPressHandler={() => {
            addToCarthandler({
                id: ItemOfIndex.id,
                index: ItemOfIndex.index,
                name: ItemOfIndex.name,
                roasted: ItemOfIndex.roasted,
                imagelink_square: ItemOfIndex.imagelink_square,
                special_ingredient: ItemOfIndex.special_ingredient,
                type: ItemOfIndex.type,
                price: price,
            });
            }}
        />
    </ScrollView>
    </View>
)
}

const styles = StyleSheet.create({
    ScreenContainer: {
        flex: 1,
        backgroundColor: COLORS.primaryBlackHex,
    },
    ScrollViewFlex: {
        flexGrow: 1,
        justifyContent: 'space-between',
    },
    FooterInfoArea: {
        padding: SPACING.space_20,
    },
    InfoTitle: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_16,
        color: COLORS.primaryWhiteHex,
        marginBottom: SPACING.space_10,
    },
    DescriptionText: {
        letterSpacing: 0.5,
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_14,
        color: COLORS.primaryWhiteHex,
        marginBottom: SPACING.space_30,
    },
    SizeOuterContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: SPACING.space_20,
    },
    SizeBox: {
        flex: 1,
        backgroundColor: COLORS.primaryDarkGreyHex,
        alignItems: 'center',
        justifyContent: 'center',
        height: SPACING.space_24 * 2,
        borderRadius: BORDERRADIUS.radius_10,
        borderWidth: 2,
    },
    SizeText: {
        fontFamily: FONTFAMILY.poppins_medium,
        color:COLORS.primaryWhiteHex
    },
})  

export default Details

