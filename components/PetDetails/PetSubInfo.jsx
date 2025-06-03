// import { View, Text, Image } from 'react-native'
// import React from 'react'
// import Colors from '../../constants/Colors'


// export default function PetSubInfo({pet}) {
//   return (
//     <View
//     style={{
//     padding:20
//     }}>
//      <View style={{  display:'flex',
//       flexDirection:'row'}}>
//         <View style={{display:'flex',
//             flexDirection:'row',
//             alignItems:'center',
//             backgroundColor:Colors.WHITE,
//             padding:10,
//             margin:5,
//             borderRadius:8,
//             gap:10,
//     flex:1
//         }}>
//         <Image  source={require('../../assets/images/calendar.png')}
//         style={{
//           width:40,
//           height:40  
//         }}
//         />

//         <View>
//           <Text style={{
//           fontFamily:'out-fit',
//           fontSize:16,
//           color:Colors.GRAY
//         }}>Age </Text> 
//           <Text>{pet?.age}</Text> 
//         </View>
//      </View>
//     </View>
//     <View style={{  display:'flex',
//       flexDirection:'row'}}>
//         <View style={{display:'flex',
//             flexDirection:'row',
//             alignItems:'center',
//             backgroundColor:Colors.WHITE,
//             padding:10,
//             margin:5,
//             borderRadius:8,
//             gap:10,
//             flex:1
//         }}>
//         <Image  source={require('../../assets/images/calendar.png')}
//         style={{
//           width:40,
//           height:40  
//         }}
//         />

//         <View>
//           <Text style={{
//           fontFamily:'out-fit',
//           fontSize:16,
//           color:Colors.GRAY
//         }}>Age </Text> 
//           <Text>{pet?.age}</Text> 
//         </View>
//      </View>
//     </View>
//     </View>
//   )
// }
import { View } from 'react-native';
import React from 'react';
import PetSubInfoCard from './PetSubInfoCard';

export default function PetSubInfo({ pet }) {
  return (
    <View style={{ padding: 20 }}>
      {/* Row 1 */}
      <View style={{ flexDirection: 'row' }}>
        <PetSubInfoCard
          icon={require('../../assets/images/calendar.png')}
          title="Age"
          value={`${pet?.age} YRS`}
        />
          <PetSubInfoCard
          icon={require('../../assets/images/bone.png')} // placeholder
          title="Breed"
          value={pet?.type || 'Dog'}
        />
      </View>

      {/* Row 2 */}
      <View style={{ flexDirection: 'row' }}>
        <PetSubInfoCard
          icon={require('../../assets/images/weight.png')}
          title="Weight"
          value={`${pet?.weight} KG`}
        />
        <PetSubInfoCard
          icon={require('../../assets/images/sex.png')}
          title="Sex"
          value={pet?.sex}
        />
      </View>
    </View>
  );
}
