import { Button, View, TextInput, StyleSheet, Text } from 'react-native';
import React, { useState} from 'react';
import auth from '@react-native-firebase/auth';

const LoginScreen = ({ navigation }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
    
  const signInPressed = () => {  
    auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
    navigation.replace("Home")
    })
    .catch(() =>{
        alert("Ocorreu um erro")
    })
    
  };

  const mudarRegister = () => {  
    navigation.replace("Register")
  };

  return (
    <View style={styles.row}>
    
        <TextInput
          value={email}
          placeholder="Email"
          onChangeText={text => setEmail(text)}
          style={styles.textinput}
        />

        <TextInput
          value={password}
          placeholder="Password"
          onChangeText={text => setPassword(text)}
          style={styles.textinput}
        />
    
    <Button title='Login' onPress={signInPressed}></Button>
    <Text></Text>
    <Button title='Registar uma conta' onPress={mudarRegister}></Button>

    </View>
  );
};


const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 10,
    marginVertical: 5,
    borderRadius: 5,
    width: '100%',
    paddingTop: '50%',
  },
  textinput: {
    borderRadius: 5,
    borderColor: '#e8e8e8',
    borderWidth: 1,
    backgroundColor: 'white',
    marginVertical: 5,
  }
});



export default LoginScreen;