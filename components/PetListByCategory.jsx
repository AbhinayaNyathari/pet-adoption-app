
// import { View, Text, FlatList } from 'react-native';
// import React, { useState } from 'react';
// import { collection, query, where, getDocs } from 'firebase/firestore';
// import { db } from '../config/FirebaseConfig';
// import Category from './Category';
// import PetListItem from './PetListItem';

// export default function PetListByCategory() {
//   const [petList, setPetList] = useState([]);
//   useEffect(()=>{
//     GetPetList('Dogs')
//   },[])

// //   USED TO GET PET LIST ON CATEGORY
//   const GetPetList = async (category) => {
//       const q = query(collection(db, 'Pets'), where('category', '==', category));
//       const querySnapshot = await getDocs(q);
//       querySnapshot.forEach(doc=>{
//         setPetList(petList=>[...petList,doc.data()])
//       })
//   };

//   return (
//     <View>
//       <Category category={(value) => GetPetList(value)} />

//     <FlatList
//     data={petList}
//     renderItem={({ item, index })=>(
// <PetListItem pet={item}/>
//     ) }/>
//     </View>
//   );
// }
import { View, Text, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react'; // ✅ imported useEffect
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../config/FirebaseConfig';
import Category from './Category';
import PetListItem from './PetListItem';

export default function PetListByCategory() {
  const [petList, setPetList] = useState([]);
  const [loader,setLoader]=useState(false);

  useEffect(() => {
    GetPetList('Dogs');
  }, []);

  //   USED TO GET PET LIST ON CATEGORY
  const GetPetList = async (category) => {
    setLoader(true);
    setPetList([]); 
    const q = query(collection(db, 'Pets'), where('category', '==', category));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
      setPetList(prevList => [...prevList, doc.data()]);
    });
    setLoader(false);
  };

  return (
    <View>
      <Category category={(value) => GetPetList(value)} />

      <FlatList
        data={petList}
        style={{marginTop:10}}
        horizontal={true}
        refreshing={loader}
        onRefresh={()=>GetPetList('Dogs')}
        keyExtractor={(item, index) => index.toString()} // ✅ to avoid FlatList warning
        renderItem={({ item, index }) => (
          <PetListItem pet={item} />
        )}
      />
    </View>
  );
}
