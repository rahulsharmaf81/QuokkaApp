import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View,ImageBackground ,Image,Text} from 'react-native';
import {styles} from '../styles/splash_page_style';
import { useDispatch,useSelector } from 'react-redux';
import EncryptedStorage from 'react-native-encrypted-storage';

// import { getStyleAndDimension } from '../styles/common_screen_details';
// import { setGlobalData } from '../../../App';
// import BackImg from '../assets/images/'
import QuokkaImage from '../assets/images/quokka.jpg'
// import Duke from '../../assets/images/dukebg.png'
import BackImg from '../assets/images/backImage.jpg'

const SplashPage = ({ navigation }) => {
//   const { styles, screenHeight } = getStyleAndDimension(SplashStyle);
// const userInfo =  useSelector((state: any) => state.loginUser.loginUserDetails);
// console.log("userInfo");

  useEffect(() => {
    (async () => {
      let nextPage = ''; 
      //updating app.js localStorageData value from here
      const userLocalStorageCheck = await EncryptedStorage.getItem("user")
      // let updateStatus = false
      console.log("user status",userLocalStorageCheck);
      if (userLocalStorageCheck) {
        nextPage = "DashBoard";
      } else {
        nextPage = "LoginPage"
      }
      setTimeout(() => {
        navigation.replace(nextPage);
      }, 2000);
    })();
  }, []);
  return (
    <View >
      <ImageBackground source={BackImg} style={styles.imgBack}>
        <View style={styles.imageView}>
        <Image source={QuokkaImage} />
        </View>
      </ImageBackground>
    </View>
  );
};
export default SplashPage;