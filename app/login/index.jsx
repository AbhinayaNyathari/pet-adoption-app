import { View, Text, Image, Pressable } from 'react-native';
import React,{ useCallback }  from 'react';
import Colors from '../../constants/Colors';
import * as WebBrowser from 'expo-web-browser';
import {useSSO} from '@clerk/clerk-expo';
import * as Linking from 'expo-linking';

export const useWarmUpBrowser = () => {
    React.useEffect(() => {
      // Preloads the browser for Android devices to reduce authentication load time
      // See: https://docs.expo.dev/guides/authentication/#improving-user-experience
      void WebBrowser.warmUpAsync()
      return () => {
        void WebBrowser.coolDownAsync()
      }
    }, [])
  }

  WebBrowser.maybeCompleteAuthSession()

export default function LoginScreen() {
    useWarmUpBrowser();
    const { startSSOFlow } = useSSO()
    const onPress = useCallback(async () => {
        try {

          const { createdSessionId, setActive, signIn, signUp } = await startSSOFlow({
            strategy: 'oauth_google',

            redirectUrl: Linking.createURL('/(tabs)/home',{scheme:'myapp'}),
          })
    

          if (createdSessionId) {
          } else {
    
          }
        } catch (err) {
          console.error(JSON.stringify(err, null, 2))
        }
      }, [])
  return (
    <View style={{
      backgroundColor: Colors.WHITE,
      flex: 1,
    }}>
      {/* Top Image */}
      <Image 
        source={require('../../assets/images/login.png')}
        style={{
          width: '100%',
          height: '50%', // Better responsive sizing
          resizeMode: 'cover'
        }}
      />
      
      {/* Content Container */}
      <View style={{
        padding: 20,
        alignItems: 'center',
        marginTop: 20,
      }}>
        {/* Title */}
        <Text style={{
          fontFamily: 'outfit-bold',
          fontSize: 30,
          textAlign: 'center',
          marginBottom: 10,
        }}>
          Ready to make a new friend?
        </Text>
        
        {/* Subtitle */}
        <Text style={{
          fontFamily: 'outfit',
          fontSize: 18,
          textAlign: 'center',
          color: Colors.GRAY,
          marginBottom: 40,
        }}>
          Let's adopt the pet which you like and make them happy
        </Text>
        
        {/* Button */}
        <Pressable
        onPress={onPress}
          style={{
            padding: 14,
            width: '80%',
            backgroundColor: Colors.PRIMARY,
            borderRadius: 14,
          }}
        //   onPress={() => console.log('Get Started pressed')}
        >
          <Text style={{
            fontFamily: 'outfit-medium',
            fontSize: 20,
            textAlign: 'center',
            color: Colors.WHITE,
          }}>
            Get Started
          </Text>
        </Pressable>
      </View>
    </View>
  );
}