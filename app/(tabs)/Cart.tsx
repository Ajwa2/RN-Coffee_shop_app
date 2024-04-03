import { ScrollView, StatusBar, StyleSheet, Text,
    View, TouchableOpacity, } from 'react-native'
import React from 'react'
import { COLORS , SPACING} from '@/constants/Colors'
import { useStore } from '../store/store'
import HeaderBar from '@/components/HeaderBar'
import PaymentFooter from '@/components/PaymentFooter'
import EmptyListAnimation from '@/components/EmptyListAnimation'
import CartItem from '@/components/CartItem'
import { router } from 'expo-router'

    



const cart = ({navigation, route}: any) => {

    const CartList = useStore((state: any) => state.CartList);
    const CartPrice = useStore((state: any) => state.CartPrice);
    const incrementCartItemQuantity = useStore(
        (state: any) => state.incrementCartItemQuantity,
    );
    const decrementCartItemQuantity = useStore(
        (state: any) => state.decrementCartItemQuantity,
    );
    const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);

    const buttonPressHandler = () => {
        router.push({
            pathname:'/Payment', 
            params:{amount: CartPrice}});
    };

    const incrementCartItemQuantityHandler = (id: string, size: string) => {
        incrementCartItemQuantity(id, size);
        calculateCartPrice();
    };

    const decrementCartItemQuantityHandler = (id: string, size: string) => {
    decrementCartItemQuantity(id, size);
    calculateCartPrice();
    };

    return (
        <View style={styles.ScreenContainer}>
            <StatusBar backgroundColor={COLORS.primaryBlackHex} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.ScrollViewFlex}>
                <View style={[styles.ScrollViewInnerView, ]}>
                    <View style={styles.ItemContainer}>
                        <HeaderBar title="Cart" />
                        {CartList.length == 0 ? (
                        <EmptyListAnimation title={'Cart is Empty'} /> ) : (
                        <View style={styles.ListItemContainer}>
                            {CartList.map((data: any) => (
                                <TouchableOpacity
                                    onPress={() => {
                                    route.push('Details', {
                                        index: data.index,
                                        id: data.id,
                                        type: data.type,
                                        });
                                    }}
                                    key={data.id}>
                                    <CartItem
                                        id={data.id}
                                        name={data.name}
                                        imagelink_square={data.imagelink_square}
                                        special_ingredient={data.special_ingredient}
                                        roasted={data.roasted}
                                        prices={data.prices}
                                        type={data.type}
                                        incrementCartItemQuantityHandler={
                                            incrementCartItemQuantityHandler
                                        }
                                        decrementCartItemQuantityHandler={
                                            decrementCartItemQuantityHandler
                                        }
                                    />
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                    </View>
                    {CartList.length != 0 ? (
                        <PaymentFooter
                        buttonPressHandler={buttonPressHandler}
                        buttonTitle="Pay"
                        prices={{prices: CartPrice, currency: '$'}}
                        />
                        ) : (
                        <></>
                    )}
                </View>
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
        },
    ScrollViewInnerView: {
        flex: 1,
        justifyContent: 'space-between',
        marginBottom:40
        },
    ItemContainer: {
        flex: 1,
        },
    ListItemContainer: {
        paddingHorizontal: SPACING.space_20,
        gap: SPACING.space_20,
    },
})

export default cart