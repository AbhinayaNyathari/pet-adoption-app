// import { Link,Redirect, useRootNavigationState, useRouter } from "expo-router";
// import { useEffect } from "react";
// import { useUser } from '@clerk/clerk-expo';

// import { Text, View } from "react-native";

// export default function Index() {
//   const {user} = useUser();
//   const rootNavigationState = useRootNavigationState()

//   useEffect(()=>{
// CheckNavLoaded();
//   },[])

//   const CheckNavLoaded=()=>{
//     if (!rootNavigationState.key)
//       return null;
//   }
//   return user &&(
//     <View
//       style={{
//         flex: 1,
//       }}
//     >
//       {user?
//       <Redirect href={'/(tabs)/home'}/>
//       :<Redirect href={'/login/home'}/>}
//  {/* <Link href={'/login'}>

//     <Text>Go To Login Screen</Text>
 
//   </Link> */}
//     </View>
//   );
// }
import { Redirect, useRootNavigationState } from "expo-router";
import { useEffect, useState } from "react";

export default function Index() {
  const rootNavigationState = useRootNavigationState();
  const [navReady, setNavReady] = useState(false);

  useEffect(() => {
    if (rootNavigationState?.key) {
      setNavReady(true);
    }
  }, [rootNavigationState]);

  if (!navReady) return null;

  return <Redirect href="/(tabs)/home" />;
}
