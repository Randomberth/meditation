import { FlatList, View, Text, Platform, Pressable, ImageBackground } from 'react-native'
import React from 'react'
import AppGradient from '@/components/AppGradient'
import { StatusBar } from 'expo-status-bar'
import { MEDITATION_DATA } from '@/constants/meditationData'
import MEDITATION_IMAGES from '@/constants/meditation-images'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'

const MarginFirstView: any = Platform.OS === 'android' ? 35  : 0;


const NatureMeditate = () => {
  return (
    <View className='flex-1' >
      <AppGradient colors={["#161b2e", "#0a4d4a", "#766e67" ]} >
        <View className='mb-6' style={{ marginTop: MarginFirstView }}>
          <Text className='text-4xl mb-3 font-bold text-gray-200 text-left'>
            Welcome Alibert
          </Text>
          <Text className='text-indigo-100 text-xl font-medium'>
            Start your meditation practice today
          </Text>
        </View>
        <FlatList 
          data={MEDITATION_DATA}
          className='mb-20'
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Pressable 
              onPress={() => router.push(`/meditate/${item.id}`)}
              className='h-48 my-3 rounded-md overflow-hidden'
            >
              <ImageBackground
                source={MEDITATION_IMAGES[item.id - 1]}
                resizeMode='cover'
                className='flex-1 rounded-2xl justify-center'
              >
                <LinearGradient
                  colors={[
                    "transparent",
                    "rgba(0, 0, 0, 0.8)",
                  ]}
                  className='flex-1 justify-center items-center'
                >
                  <Text className='text-gray-100/75 text-3xl font-bold text-center'>
                    {item.title}
                  </Text>
                </LinearGradient>
              </ImageBackground>
            </Pressable>
          )}         
        />
      </AppGradient>
      <StatusBar style="light"/>
    </View>
  )
}

export default NatureMeditate