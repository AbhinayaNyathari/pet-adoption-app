// import { View, Text, FlatList } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import Shared from './../../Shared/Shared';
// import { useUser } from '@clerk/clerk-expo';
// import { collection, getDocs, query, where } from 'firebase/firestore';
// import { db } from '../../config/FirebaseConfig';
// import PetListItem from '../../components/PetListItem';

// export default function Favorite() {
//   const { user } = useUser();
//   const [favIds, setFavIds] = useState([]);
//   const [favPetList, setFavPetList] = useState([]);
//   const [loader, setLoader] = useState(false);

//   useEffect(() => {
//     if (user) {
//       GetFavPetIds();
//     }
//   }, [user]);

//   // Fetch favorite pet IDs
//   const GetFavPetIds = async () => {
//     setLoader(true);
//     const result = await Shared.GetFavList(user);
//     const favorites = result?.favorites || [];
//     setFavIds(favorites);
//     await GetFavPetList(favorites);
//     setLoader(false);
//   };

//   // Fetch pet documents by IDs
//   const GetFavPetList = async (favIdsArray) => {
//     if (!favIdsArray.length) return;

//     try {
//       setFavPetList([]);
//       const q = query(collection(db, 'Pets'), where('id', 'in', favIdsArray));
//       const querySnapshot = await getDocs(q);

//       const petList = [];
//       querySnapshot.forEach((doc) => {
//         petList.push(doc.data());
//       });
//       setFavPetList(petList);
//     } catch (e) {
//       console.error("Error fetching favorite pets:", e);
//     }
//   };

//   return (
//     <View style={{ padding: 20, marginTop: 20 }}>
//       <Text style={{
//         fontFamily: 'outfit-medium',
//         fontSize: 30
//       }}>Favorites</Text>

//       <FlatList
//         data={favPetList}
//         numColumns={2}
//         keyExtractor={(item, index) => item.id || index.toString()}
//         renderItem={({ item }) => (
//           <View style={{ flex: 1, margin: 5 }}>
//             <PetListItem pet={item} />
//           </View>
//         )}
//       />
//     </View>
//   );
// }
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import Shared from './../../Shared/Shared';
import { useUser } from '@clerk/clerk-expo';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import PetListItem from '../../components/PetListItem';

export default function Favorite() {
  const { user } = useUser();
  const [favIds, setFavIds] = useState([]);
  const [favPetList, setFavPetList] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (user) {
      GetFavPetIds();
    }
  }, [user]);

  // Fetch favorite pet IDs
  const GetFavPetIds = async () => {
    setLoader(true);
    const result = await Shared.GetFavList(user);
    const favorites = result?.favorites || [];
    setFavIds(favorites);
    await GetFavPetList(favorites);
    setLoader(false);
  };

  // Fetch pet documents by IDs
  const GetFavPetList = async (favIdsArray) => {
    if (!favIdsArray.length) return;

    try {
      setFavPetList([]); // Clear previous list
      const q = query(collection(db, 'Pets'), where('id', 'in', favIdsArray));
      const querySnapshot = await getDocs(q);

      const petList = [];
      querySnapshot.forEach((doc) => {
        petList.push(doc.data());
      });
      setFavPetList(petList);
    } catch (e) {
      console.error("Error fetching favorite pets:", e);
      setFavPetList([]); // Set empty list on error
    }
  };

  return (
    <View style={{ padding: 20, marginTop: 20 }}>
      <Text style={{
        fontFamily: 'outfit-medium',
        fontSize: 30,
      }}>
        Favorites
      </Text>

      {loader ? (
        // Show loader if data is being fetched
        <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={favPetList}
          numColumns={2}
          keyExtractor={(item, index) => item.id || index.toString()}
          renderItem={({ item }) => (
            <View style={{ flex: 1, margin: 5 }}>
              <PetListItem pet={item} />
            </View>
          )}
          ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>No favorites available</Text>}
        />
      )}
    </View>
  );
}
