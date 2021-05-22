/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

 import React, { useState, useEffect, useContext } from 'react'

 import SplashScreen from 'react-native-splash-screen'
 
 import { Provider } from 'mobx-react'
 
 import Root from './src/scene/Root'
 
 import stores from './src/stores'
 
 import { SafeAreaProvider } from 'react-native-safe-area-context'
 
 import Orientation from "react-native-orientation";
 
 console.disableYellowBox = true // disable warning box
 
 
 const App = () => {
 
   useEffect(() => {
     Orientation.lockToPortrait()
     SplashScreen.hide()
   }, [])
   return (
     <SafeAreaProvider>
       <Provider {...stores}>
         <Root />
       </Provider>
     </SafeAreaProvider>
   )
 }
 
 export default App