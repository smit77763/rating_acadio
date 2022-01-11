/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {Rating, AirbnbRating} from 'react-native-ratings';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  Modal,
  Alert,
  View,
  Pressable,
} from 'react-native';

const App = () => {
  function onFinishRating(rating){
    console.log('Rating : '+rating);
    setRating(rating);
    setTimeout(()=>{setModalVisible(!modalVisible);
    },200)
    // setModalVisible(!modalVisible);
    console.log('Rating 2: '+rating);
  }
  const WATER_IMAGE = require('./assets/rating_image/award2.png')
  const [rating,setRating]=useState(0);
  const [modalVisible, setModalVisible] = useState(true);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/* <Text style={styles.modalText}>Rate user !!</Text> */}
            <AirbnbRating
              count={5}
              starImage={WATER_IMAGE}
              ratingContainerStyle={styles.rating_container_style}
              starContainerStyle={styles.rating_star_style}
              reviewColor='lightgreen'
              selectedColor='yellow'
              reviewSize={30}
              reviews={[
                'Very Bad','Bad','Average','Good','Excellent'
              ]}
              defaultRating={rating}
              onFinishRating={onFinishRating}
              size={35}
            />
            {/* <Rating
  type='custom'
  ratingImage={WATER_IMAGE}
  ratingColor='green'
  ratingBackgroundColor='#121212'
   tintColor='yellow'
  showRating
  startingValue={0}
  ratingCount={5}
  imageSize={50}
  // onFinishRating={this.ratingCompleted}
  style={{ paddingVertical: 10 }}
/> */}
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable>
      <Text style={styles.ratingText}>Rating Of User</Text>
      <Text style={styles.ratingText}>{rating}</Text>

    </View>
  );
};

const styles = StyleSheet.create({
  rating_container_style:{
//  padding:10,
  // borderColor:'red',
  elevation:10,
  // borderWidth:2
  },
  rating_star_style:{
// borderColor:'blue',
elevation:10,
padding:10,
  },ratingText:{
fontSize:40,
color:'black'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor:'white'
  },
  modalView: {
    margin: 20,
    backgroundColor: '#121212',
    opacity:0.9,
    borderRadius: 20,
    padding: 35,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    // borderRadius: 20,
    padding: 10,
    elevation: 4,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    // backgroundColor: '#2196',
    elevation:6
    ,paddingHorizontal:20
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize:25
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'right',
    color: 'grey',
    fontSize:30
  },
});

export default App;
