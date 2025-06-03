// import { View, Pressable } from 'react-native';
// import React, { useState, useEffect } from 'react';
// import Ionicons from '@expo/vector-icons/Ionicons';
// import Shared from './../Shared/Shared';
// import { useUser } from '@clerk/clerk-expo';

// export default function MarkFav({ pet, color = 'black' }) {
//   const { user } = useUser();
//   const [favList, setFavList] = useState([]);

//   useEffect(() => {
//     if (user) {
//       GetFav();
//     }
//   }, [user]);

//   // const GetFav = async () => {
//   //   const result = await Shared.GetFavList(user);
    
//   //   console.log("Favorite List:", result?.favorites);
//   //   setFavList(result?.favorites || []);
//   // };
//   const GetFav = async () => {
//     try {
//       const result = await Shared.GetFavList(user);
//       setFavList(result?.favorites || []);
//     } catch (error) {
//       console.error("Failed to fetch favorites:", error);
//     }
//   };
//   // const AddToFav = async () => {
//   //   const favResult = [...favList, pet.id];
//   //   await Shared.UpdateFav(user, favResult);
//   //   await GetFav();
//   // };
//   const AddToFav = async () => {
//     try {
//       if (favList.includes(pet.id)) return; // Avoid duplicates
//       const updatedFavList = [...favList, pet.id];
//       await Shared.UpdateFav(user, updatedFavList);
//       setFavList(updatedFavList); // Update state immediately
//     } catch (error) {
//       console.error("Failed to add to favorites:", error);
//     }
//   };
//   // const removeFromFav = async () => {
//   //   const favResult = favList.filter(item => item !== pet.id);
//   //   await Shared.UpdateFav(user, favResult);
//   //   await GetFav();
//   // };
//   const removeFromFav = async () => {
//     try {
//       const updatedFavList = favList.filter(item => item !== pet.id);
//       await Shared.UpdateFav(user, updatedFavList);
//       setFavList(updatedFavList); // Update state immediately
//     } catch (error) {
//       console.error("Failed to remove from favorites:", error);
//     }
//   };
//   return (
//     <View>
//       {favList.includes(pet.id) ? (
//         <Pressable onPress={removeFromFav}>
//           <Ionicons name="heart" size={30} color="red" />
//         </Pressable>
//       ) : (
//         <Pressable onPress={AddToFav}>
//           <Ionicons name="heart-outline" size={30} color={color} />
//         </Pressable>
//       )}
//     </View>
//   );
// }
import { View, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import Shared from './../Shared/Shared'; // Assuming Shared has the GetFavList and UpdateFav methods
import { useUser } from '@clerk/clerk-expo';

export default function MarkFav({ pet, color = 'black' }) {
  const { user } = useUser();
  const [favList, setFavList] = useState([]);

  // Fetch favorite list when user is available
  useEffect(() => {
    if (user) {
      GetFav();
    }
  }, [user]);

  // Fetch the favorite list for the current user
  const GetFav = async () => {
    try {
      const result = await Shared.GetFavList(user);
      setFavList(result?.favorites || []); // Set favorites list
    } catch (error) {
      console.error("Failed to fetch favorites:", error);
    }
  };

  // Add pet to favorites
  const AddToFav = async () => {
    try {
      if (favList.includes(pet.id)) return; // Avoid duplicates
      const updatedFavList = [...favList, pet.id];
      await Shared.UpdateFav(user, updatedFavList); // Update favorites in Firestore
      setFavList(updatedFavList); // Update local state
    } catch (error) {
      console.error("Failed to add to favorites:", error);
    }
  };

  // Remove pet from favorites
  const removeFromFav = async () => {
    try {
      const updatedFavList = favList.filter(item => item !== pet.id); // Remove pet
      await Shared.UpdateFav(user, updatedFavList); // Update favorites in Firestore
      setFavList(updatedFavList); // Update local state
    } catch (error) {
      console.error("Failed to remove from favorites:", error);
    }
  };

  return (
    <View>
      {favList.includes(pet.id) ? (
        <Pressable onPress={removeFromFav}>
          <Ionicons name="heart" size={30} color="red" />
        </Pressable>
      ) : (
        <Pressable onPress={AddToFav}>
          <Ionicons name="heart-outline" size={30} color={color} />
        </Pressable>
      )}
    </View>
  );
}
