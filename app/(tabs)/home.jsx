// import { View, Text, StyleSheet, TouchableOpacity,Link } from 'react-native'
// import React from 'react'
// import Header from '../../components/Header'
// import Slider from '../../components/Slider'
// import PetListByCategory from '../../components/PetListByCategory'
// import MaterialIcons from '@expo/vector-icons/MaterialIcons'
// import Colors from '../../constants/Colors'



// export default function Home() {
//   return (
//     <View style={{ padding: 20, marginTop: 20 }}>
//       {/* HEADER */}
//       <Header />
      
//       {/* SLIDER */}
//       <Slider />
      
//       {/* PETLIST+CATEGORY */}
//       <PetListByCategory />
      
//       {/* ADD NEW PET OPTION */}
//       <Link
//       href={'/add-new-pet'}
//         style={styles.addNewPetContainer}>
//         <MaterialIcons name="pets" size={24} color={Colors.PRIMARY} />
//         <Text style={{
//           fontFamily: 'outfit-medium',
//           color: Colors.PRIMARY
//         }}>
//           Add New Pet
//         </Text>
//       </Link>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   addNewPetContainer: {
//     display: 'flex',
//     flexDirection: 'row',
//     gap: 10,
//     alignItems: 'center',
//     padding: 20,
//     marginTop: 20,
//     backgroundColor: Colors.LIGHT_PRIMARY,
//     borderWidth: 1,
//     borderColor: Colors.PRIMARY,
//     borderRadius: 15,
//     borderStyle: 'dashed',
//     justifyContent: 'center',
//   }
// })
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Link } from 'expo-router'
import React from 'react'
import Header from '../../components/Header'
import Slider from '../../components/Slider'
import PetListByCategory from '../../components/PetListByCategory'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import Colors from '../../constants/Colors'

export default function Home() {
  return (
    <View style={{ padding: 20, marginTop: 20 }}>
      {/* HEADER */}
      <Header />

      {/* SLIDER */}
      <Slider />

      {/* PETLIST+CATEGORY */}
      <PetListByCategory />

      {/* ADD NEW PET OPTION */}
      <Link
        href={'/add-new-pet'}
        style={styles.addNewPetContainer}>
        <MaterialIcons name="pets" size={24} color={Colors.PRIMARY} />
        <Text style={{
          fontFamily: 'outfit-medium',
          color: Colors.PRIMARY
        }}>
          Add New Pet
        </Text>
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  addNewPetContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    padding: 20,
    marginTop: 20,
    backgroundColor: Colors.LIGHT_PRIMARY,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    borderRadius: 15,
    textAlign:'center',
    borderStyle: 'dashed',
    justifyContent: 'center',
  }
})
