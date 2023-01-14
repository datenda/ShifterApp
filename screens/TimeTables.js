import { Button, View, TextInput, Text, StyleSheet, Alert } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

const TimeTables = ({ navigation }) => {

  const [isHoraVisivel, setIsHoraVisivel] = useState(false);
  const [horaEscolhida, setHoraEscolhida] = useState(new Date());

  const verHora = () => {
    setIsHoraVisivel(true);
  };

  const confirmarHora = (date) => {
    setIsHoraVisivel(false);
    setHoraEscolhida(date);
  };

  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handlePress = () => {
    setIsPickerVisible(true);
  };

  const handleDateChange = (event, date) => {
    setIsPickerVisible(false);
    setSelectedDate(date);
  };




  //MANDAR O DIA CERTO
  const dateString = selectedDate.toLocaleString();
  const indexvirgula = dateString.indexOf(",");
  let dataDia = dateString.substring(0, indexvirgula);

  //Pronto para mandar para o firebase
  let fireDia = dataDia.split('/').join('-');

  const mandarHora = () => {
    firestore()
    .doc(`utilizadores/${email}`)
    .collection('turnos')
    .doc(fireDia)
    .set({
      inicio: horaDia,
      fim: acabarTurno
    })
    .then(() => {
      alert("O seu turno foi criado!");
    });
  };

  const [email, setEmail] = useState('');

  const [isPickerVisible2, setIsPickerVisible2] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());

  const handlePress2 = () => {
    setIsPickerVisible2(true);
  };

  const handleTimeChange = (event, date) => {
    setIsPickerVisible2(false);
    setSelectedTime(date);
  };

  //TEMPO
  const timeString = selectedTime.toTimeString();

  const indexdp = timeString.split(":");

  const horaDia = indexdp.slice(0, 2).join(":");

  //mudar as horas para o final do turno  
  const parts = horaDia.split(':');

  const acabarTurno = `${(parseInt(parts[0]) + 8) % 24}:${parts[1]}`

  return (
    <View style={styles.row}>
    
    <TextInput
    value={email}
    placeholder="Email do funcionario"
    onChangeText={text => setEmail(text)}
    style={styles.textinput}
    />

      <Button title='Escolher a hora' onPress={handlePress2}></Button>
      {isPickerVisible2 && (
        <RNDateTimePicker
          value={selectedTime}
          minuteInterval={10}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={handleTimeChange}
        />
      )}

      <Text></Text>

      <Button title='Escolher o dia' onPress={handlePress}/>
      {isPickerVisible && (
        <RNDateTimePicker
          value={selectedDate}
          minimumDate={new Date()}
          mode="date"
          onChange={handleDateChange}
        />
      )}

    <Text></Text>

    <Button title='Marcar Turno' onPress={mandarHora}></Button>


    <Text>Começo do turno - <Text style={{fontWeight: 'bold'}}>{horaDia}</Text></Text>
    <Text>Fim do turno - <Text style={{fontWeight: 'bold'}}>{acabarTurno}</Text></Text>
    <Text>Dia do turno - <Text style={{fontWeight: 'bold'}}>{selectedDate.toLocaleDateString()}</Text></Text>

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

export default TimeTables;