import { ScrollView, View, Text, ImageBackground, Pressable } from 'react-native'
import React, {useState, useEffect} from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { GalleryPreviewData } from '@/constants/models/AffirmationCategory'
import AFFIRMATION_GALLERY from '@/constants/affirmation-gallery'
import AppGradient from '@/components/AppGradient'
import { AntDesign } from '@expo/vector-icons';

const AffirmationPractice = () => {
    const { itemId } = useLocalSearchParams();
    const [Affirmation, setAffirmation] = useState<GalleryPreviewData>();
    const [Sentences, setSentences] = useState<string[]>([])

    useEffect(() => {
        for (let idx = 0; idx < AFFIRMATION_GALLERY.length; idx++) {
            const affirmationsData = AFFIRMATION_GALLERY[idx].data;
            const affirmatioToStart = affirmationsData.find(
                (a) => a.id === Number(itemId)
            );
            if (affirmatioToStart) {
                setAffirmation(affirmatioToStart)


                const affirmationsArray = affirmatioToStart.text.split(".");
                console.log(affirmationsArray);
                

                // Remove the last element if it's an empty string
                if (affirmationsArray[affirmationsArray.length - 1] === " "){
                    affirmationsArray.pop();
                }
                setSentences(affirmationsArray);


                return;
            }
        }
    }, [])
    

  return (
    <View className='flex-1'>
        <ImageBackground
            source={Affirmation?.image}
            resizeMode='cover'
            className='flex-1'
            >
            <AppGradient 
                colors={["rgba(0, 0, 0, 0.3)", "rgba(0, 0, 0, 0.7)"]}
                >
                    <Pressable 
                        onPress={()=> router.back()}
                        className='absolute top-16 left-6 z-10'
                        >
                        <AntDesign name="leftcircleo" size={50} color="white" />
                    </Pressable>
                    <ScrollView 
                        className=' mt-20'
                        showsVerticalScrollIndicator={false}
                    >
                        <View className='h-full justify-center '>
                            <View className='h-4/5 justify-center'>
                                {Sentences?.map((sentenceIndex, index) => (
                                    <Text key={index} className='text-slate-300/50 mb-12 font-bold text-center text-3xl'>
                                        {(sentenceIndex !== "") ? `${sentenceIndex + "."}` : ""}
                                    </Text>
                                ))}
                            </View> 
                        </View>
                     </ScrollView>
            </AppGradient>
        </ImageBackground>
    </View>
  )
}

export default AffirmationPractice