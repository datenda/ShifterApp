import { Button, View, StyleSheet, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { SelectList } from 'react-native-dropdown-select-list';

const HomeScreen = ({ navigation }) => {

  const [isUser, setAdminScreen] = React.useState(true);

  const signOutPressed = () => {
    auth()
    .signOut()
    .then(navigation.replace("Login"))
  };

  useEffect(() => {
    if(auth().currentUser?.email.includes("@admin"))
    {
      setAdminScreen(false)
    }
  }, []);

  const [data] = React.useState([]);

  useEffect(() => {
    firestore()
    .doc(`utilizadores/${auth().currentUser?.email}`)
    .collection('turnos')
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        data.push(doc.id)
        console.log(doc.id)
      });
    });
  }, []);

  const [selected, setSelected] = React.useState("");

  const [horaInicio, setHoraInicio] = React.useState([]);
  const [horaFim, setHoraFim] = React.useState([]);

  function getHoraInicio(documentSnapshot){return documentSnapshot.get('inicio');}
  function getHoraFim(documentSnapshot){return documentSnapshot.get('fim');}

  //Mostrar as horas do horario selecionado
  const lol = () => {
    firestore()
    .doc(`utilizadores/${auth().currentUser?.email}`)
    .collection('turnos')
    .doc(`${selected}`)
    .get()
    .then(documentSnapshot => getHoraInicio(documentSnapshot))
    .then(horaInicio => {
      const horinha = []
      horinha.push(horaInicio)
      setHoraInicio(horinha)
    })
  };

  const lolo = () => {
    firestore()
    .doc(`utilizadores/${auth().currentUser?.email}`)
    .collection('turnos')
    .doc(`${selected}`)
    .get()
    .then(documentSnapshot => getHoraFim(documentSnapshot))
    .then(horaFim => {
      const horinha = []
      console.log(horaFim);
      horinha.push(horaFim)
      setHoraFim(horinha)
    });
  };


  const mudarTempo = () => {  
    navigation.navigate("TimeTables")
  };

  return (

    <View>
    
    <Text>Bem Vindo <Text style={{fontWeight: 'bold'}}>{auth().currentUser?.email}</Text></Text>
    
    <View style={isUser ? {display: 'flex'} : {display: 'none'}}>
    <SelectList
      placeholder='Escolhe o Utilizador'
      setSelected={(val) => setSelected(val)} 
      data={data} 
      save= "key"
      search={true}
      onSelect={async () => {
      Promise.all([lol(), lolo()]);
      }}
    />

    <View style={styles.row}>
    <Text>Data do Turno: <Text style={{fontWeight: 'bold'}}>{selected}</Text></Text>
    <Text>Hora de Inicio do Turno: <Text style={{fontWeight: 'bold'}}>{horaInicio}</Text></Text>
    <Text>Hora de Fim do Turno: <Text style={{fontWeight: 'bold'}}>{horaFim}</Text></Text>
    </View>

    </View>

    <View style={styles.row}>
    <Button title='Sair' onPress={signOutPressed}></Button>
    <Text></Text>
    <Button title={isUser ? "Marcar Turnos" : "Marcar Turnos"} disabled={isUser} onPress={mudarTempo}></Button>
    </View>


    
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


export default HomeScreen;