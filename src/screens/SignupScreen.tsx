import { View, Text, TextInput, Button, StyleSheet ,Alert, Image, TouchableOpacity} from 'react-native';
import React,{useState} from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import QuokkaImage from '../assets/images/quokkaImg.png'

export default function SignupScreen({navigation}:any) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  
 

  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const validateForm = () => {
    let valid = true;
    const errors = {} as typeof formErrors;

    if (!formData.email) {
      errors.email = 'Email is required';
      valid = false;
    }else if(formData.email){
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if(!emailPattern.test(formData.email)){
        errors.email = 'Email is not valid'
      }
    }

    if (!formData.password) {
     
      errors.password = 'Password is required';
      valid = false;
    }else if(formData.password){
      console.log("passs",formData.password);
      
 const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
       if(!passwordPattern.test(formData.password)){
        errors.password = 'Password is not valid'
      }
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Confirm Password is required';
      valid = false;
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
      valid = false;
    }else if(formData.confirmPassword){
      const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
            if(!passwordPattern.test(formData.confirmPassword)){
             errors.confirmPassword = 'Password is not valid'
           }
         }

    setFormErrors(errors);
    return valid;
  };

  const handleSignup = () => {
    if (validateForm()) {
   
      console.log("form data",formData);
      createUserWithEmailAndPassword(auth,formData.email,formData.password).then(
        userCreditials => {
          const user = userCreditials.user;
          console.log("user.email",user.email);
          Alert.alert('Success', 'Authentication successful', [
            {
              text: 'OK',
              onPress: () => navigation.navigate('LoginPage'), 
            },
          ]);
        }
      ).catch((error) => {
        console.log("errorr",error.message);
        
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
      <Text style={styles.heading}>Create An Account</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={formData.email}
        onChangeText={(value) => handleChange('email', value)}
      />
      {formErrors.email ? <Text style={styles.error}>{formErrors.email}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={formData.password}
        onChangeText={(value) => handleChange('password', value)}
        secureTextEntry
      />
      {formErrors.password ? <Text style={styles.error}>{formErrors.password}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChangeText={(value) => handleChange('confirmPassword', value)}
        secureTextEntry
      />
      {formErrors.confirmPassword ? <Text style={styles.error}>{formErrors.confirmPassword}</Text> : null}
      <TouchableOpacity  onPress={handleSignup} >
        <Text style={styles.text}>Signup</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
  heading: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight:'bold',
    color:'black'
  },
  input: {
    width: '80%',
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
});