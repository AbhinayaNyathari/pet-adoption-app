import { View, Text } from 'react-native';
import React, { useEffect, useState} from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import { useUser } from '@clerk/clerk-expo';
import { GiftedChat } from 'react-native-gifted-chat'

export default function ChatScreen() {
  const params = useLocalSearchParams();
  const navigation = useNavigation();
  const { user } = useUser();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (user) {
      GetUserDetails();
    }
  }, [user]);

  const GetUserDetails = async () => {
    const docRef = doc(db, 'Chat', params?.id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const result = docSnap.data();
      const otherUser = result?.users?.filter(
        item => item.email !== user?.primaryEmailAddress?.emailAddress
      );
      if (otherUser?.length > 0) {
        navigation.setOptions({
          headerTitle: otherUser[0].name || 'Chat',
        });
      }
    } else {
      console.log("No such document!");
    }
  };
const onSend = async(newMessage) =>{
  setMessages((previousMessage) =>GiftedChat.append(previousMessage, newMessage));
await addDoc (collection(db,'chat',params.id,'Messages'),newMessage[0])
}
    
  return (
    <GiftedChat
    messages={messages}
    onSend={messages => onSend(messages)}
    showUserAvatar={true}
    user={{
      _id: user?.primaryEmailAddress?.emailAddress,
      name:user?.fullName,
      avatar:user?.imageUrl
    }}
  />
  );
}


