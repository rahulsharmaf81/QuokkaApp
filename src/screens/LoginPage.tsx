import { View, Text, Button, TextInput, StyleSheet,Alert, Image, TouchableOpacity } from 'react-native';
import React,{useState} from 'react'
import {signInWithEmailAndPassword } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import QuokkaImage from '../assets/images/quokkaImg.png'

import { auth } from '../config/firebase';
import EncryptedStorage from 'react-native-encrypted-storage';
import { LoginActions } from '../store/slices/user_slice';
export default function LoginPage({navigation}:any) {
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isChecked, setIsChecked] = useState(false);


  
    const validateForm = () => {
      let valid = true;
  
      if (!formData.email) {
        setEmailError('Email is required');
        valid = false;
      } else if(formData.email){
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if(emailPattern.test(formData.email)){
          setEmailError('');

        }else{
          setEmailError('email is not valid');
        }
        return emailPattern.test(formData.email);
      }else{
        setEmailError('');

      }
  
      if (!formData.password) {
        setPasswordError('Password is required');
        valid = false;
      } else if(formData.password) {
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        if(passwordPattern.test(formData.password)){
          setPasswordError('');

        }else{
          setPasswordError('password is not valid');
        }
      }
  
      return valid;
    };
  
    const handleLogin = () => {
      if (validateForm()) {
        // Perform login logic here
        console.log("login data",formData);
        signInWithEmailAndPassword(auth,formData.email,formData.password)
        .then((userCred) => {
          const user = userCred.user;
          console.log("user",user);
          const user_email = user.email
          const user_token = user.refreshToken
          dispatch(LoginActions.login({loginUserDetails:user_email,token:user_token})) 
          Alert.alert('Successfully', 'Logged In', [
            {
              text: 'OK',
              onPress: () =>navigation.replace('DashBoard'), 
            },
          ]);
          
        }).catch((error) =>{
          console.log("error in login catch",error.message);
          Alert.alert('Failed', 'Authentication Failed', [
            {
              text: 'OK',
              // onPress: () => navigation.navigate('LoginPage'), 
            },
          ]);
          
        })
        

      }
    };
    const handleChange = (key: keyof typeof formData, value: string) => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [key]: value,
      }));
    };
  
    return (
      <View style={styles.container}>
       
        <View style={styles.img}>
        <Image  source={QuokkaImage} />
        </View>
        <Text style={styles.text}>Sign In</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={formData.email}
          onChangeText={(value) => handleChange('email', value)}
        />
        {emailError ? <Text style={styles.error}>{emailError}</Text> : null}
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={formData.password}
          onChangeText={(value) => handleChange('password', value)}
          secureTextEntry
        />
        {passwordError ? <Text style={styles.error}>{passwordError}</Text> : null}
        <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={() => setIsChecked(!isChecked)}
      >
        <Text style={styles.checkboxText}>
          {isChecked ? '✓' : <View style={styles.smallbox}></View>}  By logging in, I accept the terms & conditions of the platform
        </Text>
      </TouchableOpacity>
        <TouchableOpacity disabled={!isChecked} onPress={handleLogin} >
          <Text style={styles.text}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity  onPress={() => navigation.navigate('SignUpScreen')} >
        <Text style={styles.text}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#EADBC8'
  },
  img:{
      width:'30%',
      height:'30%',
      // backgroundColor:'#'
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight:'bold',
    color:'black'
  },
  input: {
    width: '85%',
    height: 40,
    borderWidth: 0.4,
    marginBottom: 10,
    padding: 10,
    borderRadius:10,
    borderColor:'blue'
  },
  error: {
    color: 'black',
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxText: {
    marginLeft: 10,
  },
  smallbox:{
      width:15,
      height:15,
      borderWidth:1,
      borderColor:'black'
  }
});