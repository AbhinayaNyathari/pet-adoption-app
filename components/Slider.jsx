// import { View, Text, Image,FlatList } from 'react-native'
// import React from 'react'
// import { collection,getDocs } from 'firebase/firestore'
// import { db } from '../config/FirebaseConfig'
// import { StyleSheet } from 'react-native'
// import { useState, useEffect} from 'react'

// export default function Slider() {
//     const [sliderList, setSliderList] = useState([]);
    // useEffect(() => {
    //     GetSliders();

    // }, [])
//     const GetSliders = async () => {
//         const snapshot = await getDocs(collection(db, 'Sliders'));
        // snapshot.forEach((doc) => {
        //     console.log(doc.data());
        //     setSliderList(sliderList => [...sliderList, doc.data()])
        // })
//     }
//     return (
//         <View>
//             <FlatList
//                 data={sliderList}
//                 renderItem={({ item, index }) => (
//                     <View>
//                         <Image source={{ uri:item?.imageUrl }} 
//                         style={styles?.sliderImage}/>
//                     </View>
//                 )}
//             />
//         </View>
//     )
// }
// const styles = StyleSheet.create({
//     sliderImage:{
//         width:'80%',
//         height:160
//     }
// })
import React, { useState, useEffect } from 'react';
import { View, Image, FlatList, StyleSheet } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/FirebaseConfig';

export default function Slider() {
  const [sliderList, setSliderList] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const fetchSliders = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'Sliders'));
        const sliders = snapshot.docs.map(doc => doc.data());
        if (isMounted) {
          setSliderList(sliders);
        }
      } catch (error) {
        console.log('Error fetching sliders:', error);
      }
    };

    fetchSliders();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <View style={{
        marginTop:15
    }}>
      <FlatList
        data={sliderList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            <Image
              source={{ uri: item?.imageUrl }}
              style={styles.sliderImage}
            />
          </View>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sliderImage: {
    width: 300,
    height: 160,
    resizeMode: 'cover',
    marginRight: 10,
    borderRadius: 10,
    alignSelf: 'center',
  },
});
