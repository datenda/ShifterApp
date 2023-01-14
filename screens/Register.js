import { Button, View, TextInput, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const RegisterScreen = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
  const registerPressed = () => {
    if(email.includes("@admin"))
    {
        alert("Não foi possivel criar conta")
    }
    else
    {
        auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
        firestore()
        .collection('utilizadores')
        .doc(email)
        .set({
            email: email,
            dataCriacao: Date().toString(),
        })
        .then(() => {
            navigation.replace("Home");
        });
        })
        .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
            alert("Email já existe");
        }
        if (error.code === 'auth/invalid-email') {
            alert("Email Invalido por motivos de segurança");
        }
        //console.error(error);
        });
    }


    


  };

  const mudarLogin = () => {  
    navigation.replace("Login")
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
    
    <Button title='Registar' onPress={registerPressed}></Button>
    <Text></Text>
    <Button title='Ir para o Login' onPress={mudarLogin}></Button>

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


export default RegisterScreen;