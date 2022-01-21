/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {Rating, AirbnbRating} from 'react-native-ratings';

import {StyleSheet, Text, Modal, Alert, View, Pressable} from 'react-native';

const App = () => {
  //For the testing purpose we are user number 3 an we are rating use number 1

  const apiUrl = 'https://ratings-acadio.herokuapp.com/api/v1';

  const WATER_IMAGE = require('./assets/rating_image/star2.png');
  const [rating, setRating] = useState(0);
  const [modalVisible, setModalVisible] = useState(true);

  const getUserData = () => {
    fetch(apiUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(result => {
      result.json().then(resp => {
        //resp is array
        // console.warn('response : ',resp);
      });
    });
  };

  function onFinishRating(rating) {
    console.log('Rating : ' + rating);
    setRating(rating);
    setTimeout(() => {
      setModalVisible(!modalVisible);
    }, 200);

    console.log('Rating 2: ' + rating);
  }

  // useEffect(getUserData());

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
            <Rating
              type="custom"
              // ratingImage={WATER_IMAGE}
              ratingCount={5}
              imageSize={30}
              showRating
              fractions={1}
              ratingColor="yellow"
              jumpValue={0.1}
              ratingBackgroundColor="grey"
              ratingTextColor="lightgreen"
              startingValue={rating}
              tintColor="#121212"
              // onSwipeRating={onSwipeRating}
              onFinishRating={onFinishRating}
              style={styles.ratingStyle}
            />

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
  ratingStyle: {
    paddingHorizontal: 89,
    elevation: 10,
    fontSize: 30,
    // margin:
  },
  rating_container_style: {
    //  padding:10,
    // borderColor:'red',
    elevation: 10,
    // borderWidth:2
  },
  rating_star_style: {
    // borderColor:'blue',
    elevation: 10,
    padding: 10,
  },
  ratingText: {
    fontSize: 40,
    color: 'black',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'white',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#121212',
    // opacity: 0.9,
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
    elevation: 7,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    // backgroundColor: '#2196',
    elevation: 6,
    paddingHorizontal: 20,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 25,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'right',
    color: 'grey',
    fontSize: 30,
  },
});

export default App;
