import { View, Text, ImageBackground, Pressable } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import MEDITATION_IMAGES from '@/constants/meditation-images'
import AppGradient from '@/components/AppGradient'
import { router, useLocalSearchParams } from 'expo-router'
import { AntDesign } from '@expo/vector-icons';
import { Audio } from 'expo-av'
import CustomButtom from '@/components/CustomButtom'
import { MEDITATION_DATA, AUDIO_FILES } from '@/constants/meditationData'
import { TimerContext } from '@/context/TimerContext'

const Meditate = () => {
    const { id } = useLocalSearchParams();

    const { Duration, setDuration } = useContext(TimerContext);

    //const [SecondsRemaining, setSecondsRemaining] = useState(10)
    const [IsMeditating, setIsMeditating] = useState<boolean>(false)
    const [AudioSound, setAudioSound] = useState<Audio.Sound>()
    const [IsPlayingAudio, setIsPlayingAudio] = useState<boolean>(false)

    useEffect(() => {
        let timerId: NodeJS.Timeout;

        if (Duration === 0) {
            setIsMeditating(false)
            AudioSound?.unloadAsync();
            return;
        }

        if (IsMeditating) {
            timerId = setTimeout(() => {
                setDuration(Duration - 1);
            }, 1000);
        }


        return () => {
            clearTimeout(timerId);
        }
      
    }, [Duration, IsMeditating])

    useEffect(() => {
        return () => {
            setDuration(10);
            AudioSound?.unloadAsync();
        };
    }, [AudioSound])


    const toggleMeditationSessionStatus = async () => {
        if (Duration === 0) setDuration(10);

        setIsMeditating(!IsMeditating);

        await toggleSound();
    }
    
    const toggleSound = async () => {
        const sound = AudioSound ? AudioSound : await initializeSound();

        const status = await sound?.getStatusAsync();

        if (status?.isLoaded && !IsPlayingAudio){
            await sound.playAsync();
            setIsPlayingAudio(true);
        } else {
            await sound.pauseAsync();
            setIsPlayingAudio(false);
        }
    }


    const initializeSound = async () => {
        const audioFileNAme = MEDITATION_DATA[Number(id) - 1].audio

        const { sound } = await Audio.Sound.createAsync(
            AUDIO_FILES[audioFileNAme]
        );
        setAudioSound(sound);
        return sound;
    }

    const handleAdjustDuration = () => {
        if (IsMeditating) toggleMeditationSessionStatus();

        router.push("(modal)/AdjustMeditationDuration")
    }





    // Format the time left to ensure two digits are displayed
    const formattedTimeMinutes = String(
        Math.floor(Duration / 60)
    ).padStart(2, "0");
    const formattedTimeSeconds = String(
        Math.floor(Duration % 60)
    ).padStart(2, "0");

  return (
    <View className='flex-1 bg-sky-700'>
        <ImageBackground
            source={MEDITATION_IMAGES[Number(id) - 1]}
            resizeMode='cover'
            className='flex-1'
        >
            <AppGradient colors={["transparent", "rgba(0, 0, 0, 0.8)"]}>
                <Pressable
                    onPress={() => router.back()}
                    className='absolute top-16 left-6 z-10'
                >
                    <AntDesign name="leftcircleo" size={50} color="white" />

                </Pressable>

                <View className='flex-1 justify-center'>
                    <View className='mx-auto bg-sky-800/25 rounded-full w-44 h-44 justify-center items-center'>
                        <Text className='text-4xl text-gray-200/50 font-rmono'>
                            {formattedTimeMinutes}:{formattedTimeSeconds}
                        </Text>
                    </View>
                </View>

                <View className='mb-5 '>
                    <CustomButtom 
                        title='Adjust Duration'
                        onPress={handleAdjustDuration}
                    />
                    <CustomButtom 
                        title={IsMeditating ? "Stop" : "Start Meditation"}
                        onPress={toggleMeditationSessionStatus}
                    />

                </View>

            </AppGradient>
        </ImageBackground>
    </View>
  )
}

export default Meditate;