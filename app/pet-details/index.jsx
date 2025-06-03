import { View, Text, ScrollView, Pressable,TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import PetInfo from '../../components/PetDetails/PetInfo';
import PetSubInfo from '../../components/PetDetails/PetSubInfo';
import AboutPet from '../../components/PetDetails/AboutPet';
import OwnerInfo from './OwnerInfo';
import Colors from '../../constants/Colors';
import { useUser } from '@clerk/clerk-expo';
import { collection, doc, getDocs, query, where , setDoc} from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';


export default function PetDetails() {
  const pet = useLocalSearchParams();
  const navigation = useNavigation();
  const {user}= useUser();
const router = useRouter()

  useEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      haederTitle: ''
    })
  }, [])

  const InitialChat=async()=>{
const docId1= user?.primaryEmailAddress?.emailAddress+'-'+pet?.email;
const docId2= pet?.email+'_'+user?.primaryEmailAddress?.emailAddress;

const q=query(collection(db,'Chat'),where('id','in',[docId1,docId2]))
const querySnapshot=await getDocs(q);
querySnapshot.forEach(doc=>{
  console.log(doc.data());
  router.push({
    pathname:'/chat',
    params:{id:doc.id}
  })
})
if (querySnapshot.docs?.length === 0) {
  // Define the user object correctly inside the 'users' array
  await setDoc(doc(db, 'Chat', docId1), {
    id: docId1,
    users: [
      {
        email: user?.primaryEmailAddress?.emailAddress,
        imageUrl: user?.imageUrl,
        name: user?.fullName,
      },
      {
      email:pet?.email,
      imageUrl:pet?.userImage,
      name:pet?.username
      }
    ],
  });
   router.push({
    pathname:'/chat',
    params:{id:docId1}
  })
}
  }

  return (
    <View>
      <ScrollView>
        {/* PET INFO */}
        <PetInfo pet={pet} />
        {/* PET SUBINFO */}
        <PetSubInfo pet={pet} />
        {/* ABOUT */}
        <AboutPet pet={pet} />
        {/* owner DETAILS */}
        <OwnerInfo pet={pet} />
        <View>

        </View>
  
      </ScrollView>
      {/* ADOPT ME BUTTON */}
      <View style={styles?.bottomContainer}>
        <TouchableOpacity 
        onPress={InitialChat}
        style={styles.adoptBtn}>
          <Text style={{
            textAlign: 'center',
            fontFamily: 'outfit-medium',
            fontSize: 20
          }}>Adopt Me</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
 adoptBtn:{
  padding:15,
   backgroundColor: Colors.PRIMARY,
 },
 bottomContainer:{
position:'absolute',
width:'100%',
bottom:0
 }
});
// import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
// import React, { useEffect } from 'react';
// import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
// import PetInfo from '../../components/PetDetails/PetInfo';
// import PetSubInfo from '../../components/PetDetails/PetSubInfo';
// import AboutPet from '../../components/PetDetails/AboutPet';
// import OwnerInfo from './OwnerInfo';
// import Colors from '../../constants/Colors';
// import { useUser } from '@clerk/clerk-expo';
// import { collection, doc, getDocs, query, where, setDoc } from 'firebase/firestore';
// import { db } from '../../config/FirebaseConfig';

// export default function PetDetails() {
//   const pet = useLocalSearchParams();
//   const navigation = useNavigation();
//   const router = useRouter();
//   const { user } = useUser();

//   useEffect(() => {
//     navigation.setOptions({
//       headerTransparent: true,
//       headerTitle: '',
//     });
//   }, []);

//   const InitialChat = async () => {
//     console.log('Adopt button pressed');
//     console.log('User:', user);
//     console.log('Pet:', pet);

//     const  docId1 = user?.primaryEmailAddress?.emailAddress;
//     const docId2 = pet?.email;

//     if (!userEmail || !petEmail) {
//       console.log('Missing email info', { docId1, docId2 });
//       return;
//     }

//     // const docId1 = `${userEmail}-${petEmail}`;
//     // const docId2 = `${petEmail}-${userEmail}`;

//     try {
//       const q = query(
//         collection(db, 'Chat'),
//         where('id', 'in', [docId1, docId2])
//       );
//       const snapshot = await getDocs(q);

//       if (!snapshot.empty) {
//         const existingId = snapshot.docs[0].id;
//         router.push({
//           pathname: '/chat',
//           params: { id: existingId },
//         });
//       } else {
//         await setDoc(doc(db, 'Chat', docId1), {
//           id: docId1,
//           users: [
//             {
//               email: user?.primaryEmailAddress?.emailAddress,
//               imageUrl: user?.imageUrl,
//               name: user?.fullName,
//             },
//             {
//               email:pet?.email,
//               imageUrl: pet?.userImage,
//               name: pet?.username,
//             },
//           ],
//         });

//         router.push({
//           pathname: '/chat',
//           params: { id: docId1 },
//         });
//       }
//     } catch (error) {
//       console.error('Chat creation error:', error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <ScrollView contentContainerStyle={styles.scrollContent}>
//         <PetInfo pet={pet} />
//         <PetSubInfo pet={pet} />
//         <AboutPet pet={pet} />
//         <OwnerInfo pet={pet} />
//         <View style={{ height: 80 }} />
//       </ScrollView>

//       <View style={styles.bottomContainer}>
//         <TouchableOpacity onPress={InitialChat} style={styles.adoptBtn}>
//           <Text style={styles.adoptText}>Adopt Me</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   scrollContent: {
//     paddingBottom: 100,
//   },
//   adoptBtn: {
//     padding: 15,
//     backgroundColor: Colors.PRIMARY,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//   },
//   adoptText: {
//     textAlign: 'center',
//     fontFamily: 'outfit-medium',
//     fontSize: 20,
//     color: 'white',
//   },
//   bottomContainer: {
//     position: 'absolute',
//     width: '100%',
//     bottom: 0,
//     backgroundColor: 'white',
//   },
// });

