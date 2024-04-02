import React, { useEffect } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';
import {BORDERRADIUS, COLORS} from '@/constants/Colors';
import { BlurView } from 'expo-blur';


import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import * as Font from 'expo-font';


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


// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  useEffect(()=>{
    loadFonts();
},[]);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarBackground: () => (
          <BlurView
            intensity={2}
            tint='light'
            style={styles.BlurViewStyles}
          />
        ),
        tabBarShowLabel:false,
        tabBarStyle:styles.tabBarStyle
      }}>
      <Tabs.Screen name="index" 
          options={{ 
            title: 'home', 
            tabBarIcon: ({focused }) => <TabBarIcon 
                name="home" color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex} />,
            }}
      />
      <Tabs.Screen name='Cart'
        options={{
          title:'Cart',
          tabBarIcon: ({ focused }) => <TabBarIcon 
                name="shopping-cart" color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex} />,
        }}
      />
      <Tabs.Screen name='Favorite'
        options={{
          title:'Favorite',
          tabBarIcon: ({focused }) => <TabBarIcon 
                name="heart" color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex} />,
        }}
      />
      <Tabs.Screen name='History'
        options={{
          title:'History',
          tabBarIcon: ({ focused }) => <TabBarIcon 
                name="bell" color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex} />,
        }}
      />   
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 50,
    position: 'absolute',
    backgroundColor: COLORS.primaryBlackRGBA,
    borderTopWidth: 0,
    elevation: 0,
    borderTopColor: 'transparent',
  },
  BlurViewStyles: {
    overflow:'hidden',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});