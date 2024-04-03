import { ScrollView,StatusBar,StyleSheet,Text, TextInput, View, ToastAndroid, 
    FlatList, Dimensions, SafeAreaView,Pressable, TouchableOpacity} from 'react-native';

import React, { useEffect, useRef, useState } from 'react'
import { useStore } from '../store/store'
import { BORDERRADIUS,COLORS, FONTFAMILY, FONTSIZE, SPACING} from '@/constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import CoffeeCard from '@/components/CoffeeCard';
import * as Font from 'expo-font';
import HeaderBar from '@/components/HeaderBar';
import { Link, router } from 'expo-router';
import { useNavigation } from '@react-navigation/native';



const loadFonts = async ()=>{
    await Font.loadAsync({
        'app_icons': require('../../assets/fonts/fonts/app_icons.ttf'),
        'Poppins-Black': require('../../assets/fonts/fonts/Poppins-Black.ttf'),
        'Poppins-Bold': require('../../assets/fonts/fonts/Poppins-Bold.ttf'),
        'Poppins-ExtraBold': require('../../assets/fonts/fonts/Poppins-ExtraBold.ttf'),
        'Poppins-ExtraLight': require('../../assets/fonts/fonts/Poppins-ExtraLight.ttf'),
        'Poppins-Light': require('../../assets/fonts/fonts/Poppins-Light.ttf'),
        'Poppins-Medium': require('../../assets/fonts/fonts/Poppins-Medium.ttf'),
        'Poppins-Regular': require('../../assets/fonts/fonts/Poppins-Regular.ttf'),
        'Poppins-SemiBold': require('../../assets/fonts/fonts/Poppins-SemiBold.ttf'),
        'Poppins-Thin': require('../../assets/fonts/fonts/Poppins-Thin.ttf'),
    })
}

    
const getCategoriesFromData = (data: any) => {
    let temp: any = {};
    for (let i = 0; i < data.length; i++) {
        if (temp[data[i].name] == undefined) {
            temp[data[i].name] = 1;
        } else {
        temp[data[i].name]++;
        }
    }
        let categories = Object.keys(temp);
        categories.unshift('All');
        return categories;
    };

    const getCoffeeList = (category: string, data: any) => {
        if (category == 'All') {
            return data;
        } else {
            let coffeelist = data.filter((item: any) => item.name == category);
            return coffeelist;
        }
    };

const Home = ({}: any) => {

    useEffect(()=>{
        loadFonts();
    },[]);

const navigation = useNavigation();

const CoffeeList = useStore((state:any) => state.CoffeeList);
//console.log('CoffeeList = ',CoffeeList.length)
const BeanList = useStore((state:any)=>state.BeanList);
const addToCart = useStore((state:any)=>state.addToCart);
const calculateCartPrice = useStore((state:any)=>state.calculateCartPrice);

const [categories, setCategories] = useState(getCategoriesFromData(CoffeeList));
const [searchText, setSearchText] = useState('');
const [categoryIndex, setCategoryIndex] = useState({
    index: 0,
    category: categories[0],
    });
const [sortedCoffee, setSortedCoffee] = useState(getCoffeeList(categoryIndex.category, CoffeeList));

const ListRef: any = useRef<FlatList>();


const searchCoffee = (search: string) => {
    if (search != '') {
        ListRef?.current?.scrollToOffset({
        animated: true,
        offset: 0,
        });
    setCategoryIndex({index: 0, category: categories[0]});
    setSortedCoffee([
        ...CoffeeList.filter((item: any) =>
            item.name.toLowerCase().includes(search.toLowerCase()),),
            ]);
        }
    };
    
    const resetSearchCoffee = () => {
        ListRef?.current?.scrollToOffset({
            animated: true,
            offset: 0,
        });
        setCategoryIndex({index: 0, category: categories[0]});
        setSortedCoffee([...CoffeeList]);
        setSearchText('');
    };
    
    const CoffeCardAddToCart = ({
        id, index, name, 
        roasted,imagelink_square, 
        special_ingredient, type, prices,}: any) => {
            addToCart({
                id, index, name, roasted, 
                imagelink_square, special_ingredient, 
                type, prices,
            });
        calculateCartPrice();
    ToastAndroid.showWithGravity(
        `${name} is Added to Cart`,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
        );
    };

    return (
        <SafeAreaView style={styles.ScreenContainer}>
        <StatusBar backgroundColor={COLORS.primaryBlackHex} />
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.ScrollViewFlex}>
          {/* App Header */}
            <HeaderBar />
            <Text style={styles.ScreenTitle}>
                Find the best{'\n'}coffee for you
            </Text>
          {/* Search Input */}
            <View style={styles.InputContainerComponent}>
            <Pressable
                onPress={() => {
                    searchCoffee(searchText);
                }}
            >
                <FontAwesome
                style={styles.InputIcon}
                name="search"
                size={FONTSIZE.size_18}
                color={
                    searchText.length > 0
                    ? COLORS.primaryOrangeHex
                    : COLORS.primaryLightGreyHex
                }
                />
            </Pressable>
            <TextInput
                placeholder="Find Your Coffee..."
                value={searchText}
                onChangeText={text => {
                setSearchText(text);
                searchCoffee(text);
                    }}
                placeholderTextColor={COLORS.primaryLightGreyHex}
                style={styles.TextInputContainer}
            />
            {searchText.length > 0 ? (
                <Pressable
                onPress={() => {
                    resetSearchCoffee();
                }}
                >
                    <FontAwesome
                    style={styles.InputIcon}
                    name="close"
                    size={FONTSIZE.size_16}
                    color={COLORS.primaryLightGreyHex}
                    />
                </Pressable>
            ) : (
            <></>
            )}
        </View>

          {/* Category Scroller */}
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.CategoryScrollViewStyle}>
            {categories.map((data, index) => (
                <View
                key={index.toString()}
                style={styles.CategoryScrollViewContainer}>
                <Pressable
                    style={styles.CategoryScrollViewItem}
                    onPress={() => {
                        ListRef?.current?.scrollToOffset({
                        animated: true,
                        offset: 0,
                        });
                    setCategoryIndex({index: index, category: categories[index]});
                    setSortedCoffee([
                        ...getCoffeeList(categories[index], CoffeeList),
                    ]);
                }}>
                <Text
                    style={[
                        styles.CategoryText,
                        categoryIndex.index == index
                        ? {color: COLORS.primaryOrangeHex}
                        : {},
                    ]}>
                    {data}
                    
                </Text>
                {categoryIndex.index == index ? (
                    <View style={styles.ActiveCategory} />
                    ) : (
                    <></>
                )}
                </Pressable>
            </View>
            ))}
        </ScrollView>

          {/* Coffee Flatlist */}
            <FlatList
            ref={ListRef}
            horizontal
            ListEmptyComponent={
                <View style={styles.EmptyListContainer}>
                    <Text style={styles.CategoryText}>No Coffee Available</Text>
                </View>
            }
            showsHorizontalScrollIndicator={false}
            data={sortedCoffee}
            contentContainerStyle={styles.FlatListContainer}
            keyExtractor={item => item.id}
            renderItem={({item}) => {
                // console.log(item.index,item.id,item.type);
                const valueTobePassed={
                    index: item.index||null,
                    id: item.id||null,
                    type: item.type||null ,
                    
                }
                console.log(valueTobePassed);
                
                return (
                    <Link href={
                        {
                            pathname:"/Details",
                            params:{
                                index: item.index,
                                id: item.id,
                                type: item.type,
                            }}
                    }>

                    <CoffeeCard
                    id={item.id}
                    index={item.index}
                    type={item.type}
                    roasted={item.roasted}
                    imagelink_square={item.imagelink_square}
                    name={item.name}
                    special_ingredient={item.special_ingredient}
                    average_rating={item.average_rating}
                    price={item.prices[2]}
                    buttonPressHandler={CoffeCardAddToCart}
                />
                    </Link>
                );
            }}
        />

        <Text style={styles.CoffeeBeansTitle}>Coffee Beans</Text>

          {/* Beans Flatlist */}
            <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={BeanList}
            contentContainerStyle={[
                styles.FlatListContainer,
            ]}
            keyExtractor={item => item.id}
            renderItem={({item}) => {
                console.log(item.size)
                return (
                <Link href={{
                        pathname:"/Details",
                        params:{
                            index: item.index,
                            id: item.id,
                            type: item.type,
                            size:item.size
                        }}
                }>
                <CoffeeCard
                    id={item.id}
                    index={item.index}
                    type={item.type}
                    roasted={item.roasted}
                    imagelink_square={item.imagelink_square}
                    name={item.name}
                    special_ingredient={item.special_ingredient}
                    average_rating={item.average_rating}
                    price={item.prices[2]}
                    buttonPressHandler={CoffeCardAddToCart}
                />
                </Link>
            );
            }}
        />
        </ScrollView>
    </SafeAreaView>
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
    ScreenTitle: {
        fontSize: FONTSIZE.size_24,
        fontFamily: FONTFAMILY.poppins_semibold,
        color: COLORS.primaryWhiteHex,
        paddingLeft: SPACING.space_30,
        },
    InputContainerComponent: {
        flexDirection: 'row',
        margin: SPACING.space_18,
        borderRadius: BORDERRADIUS.radius_15,
        backgroundColor: COLORS.primaryDarkGreyHex,
        alignItems: 'center',
        },
    InputIcon: {
        marginHorizontal: SPACING.space_20,
        },
    TextInputContainer: {
        flex: 1,
        height: SPACING.space_20 * 2,
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_12,
        color: COLORS.primaryWhiteHex,
        },
    CategoryScrollViewStyle: {
        paddingHorizontal: SPACING.space_20,
        marginBottom: SPACING.space_20,
        },
    CategoryScrollViewContainer: {
        paddingHorizontal: SPACING.space_10,
        },
    CategoryScrollViewItem: {
        alignItems: 'center',
        },
    CategoryText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_14,
        color: COLORS.primaryLightGreyHex,
        marginBottom: SPACING.space_2,
        },
    ActiveCategory: {
        height: SPACING.space_10,
        width: SPACING.space_10,
        borderRadius: BORDERRADIUS.radius_10,
        backgroundColor: COLORS.primaryOrangeHex,
        },
    FlatListContainer: {
        gap: SPACING.space_24,
        paddingVertical: SPACING.space_20,
        paddingHorizontal: SPACING.space_30,
        },
    EmptyListContainer: {
        width: Dimensions.get('window').width - SPACING.space_30 * 3,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: SPACING.space_36 * 3.6,
        },
    CoffeeBeansTitle: {
        fontSize: FONTSIZE.size_16,
        marginLeft: SPACING.space_30,
        marginTop: SPACING.space_12,
        fontFamily: FONTFAMILY.poppins_medium,
        color: COLORS.secondaryLightGreyHex,
        },
})

export default Home//192.168.43.82