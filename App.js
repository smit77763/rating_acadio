/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState, useRef} from 'react';
import {Rating, AirbnbRating} from 'react-native-ratings';
import RBSheet from 'react-native-raw-bottom-sheet';
import Snackbar from 'react-native-snackbar';

import {StyleSheet, Text, View, Pressable} from 'react-native';

const App = () => {
  //For the testing purpose we are user number 3 an we are rating use number 1

  const apiUrl = 'https://ratings-acadio.herokuapp.com/api/v1';
  const refRBSheet = useRef();

  let avgRating;
  const WATER_IMAGE = require('./assets/rating_image/star2.png');
  const [userRating, setUserRating] = useState(0);
  const [modalVisible, setModalVisible] = useState(true);
  const [averageRating, setAverageRating] = useState(0);
  const [uid, setUid] = useState(0);
  const [myUid, setMyUid] = useState(3);
  const [ratingCount, setRatingCount] = useState(0);

  const getUserData = async () => {
    try {
      const response = await fetch(apiUrl);

      const resp = await response.json();

      const ratePerson = resp.data.userData[0];

      const avgRating = ratePerson.avg_rating.toFixed(1);

      setAverageRating(avgRating);

      setUid(ratePerson.uid);

      setRatingCount(ratePerson.count);

      const user = resp.data.userData[2];

      console.log(averageRating);
    } catch (e) {
      console.error('Error : ', e);
    }
  };

  const sendUpdatedRating = async () => {
    try {
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: uid,
          obj_uid: myUid,
          ratings: userRating,
        }),
      });

      const res = await response.json();
      console.log(res);
    } catch (e) {
      console.error(e);
    }
  };

  function onFinishRating(userRating) {
    console.log('Rating : ' + userRating);
    setUserRating(userRating); //ahiya api call karvani chhe jethi update thai

    setTimeout(() => {
      // setModalVisible(!modalVisible);
      refRBSheet.current.close();
    }, 500);
    // sendUpdatedRating();
    Snackbar.show({
      text: 'User Rating Set To ' + userRating,
      duration: Snackbar.LENGTH_LONG,
    });
    console.log('Rating 2: ' + userRating);
  }

  useEffect(() => {
    getUserData();
  }, [userRating, averageRating]);
  useEffect(() => {
    sendUpdatedRating();
  }, [userRating]);

  return (
    <View style={styles.centeredView}>
      <Text style={styles.ratingText}>Rating Of User : {userRating}</Text>

      <Pressable
        onPress={() => {
          refRBSheet.current.open();
        }}>
        <View style={styles.cardView}>
          <Text style={styles.ratingText}>Id :{uid}</Text>
          <View style={styles.averageRatingView}>
            <View style={styles.left}>
              <Text style={styles.ratingText}>
                Average Rating : {averageRating}
              </Text>
            </View>
            <View style={styles.right}>
              <Rating
                type="custom"
                ratingCount={5}
                imageSize={20}
                fractions={1}
                ratingColor="gold"
                jumpValue={0.1}
                readonly={true}
                ratingBackgroundColor="grey"
                ratingTextColor="lightgreen"
                startingValue={averageRating}
                tintColor="#121212"
                // tintColor="pink"
                // onFinishRating={onFinishRating}
                style={styles.ratingStyle}
              />
            </View>
          </View>

          <Text style={styles.ratingText}> Count: {ratingCount}</Text>
        </View>
      </Pressable>

      {/* <Button
        title="OPEN BOTTOM SHEET"
        onPress={() => refRBSheet.current.open()}
      /> */}

      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        animationType="fade"
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: 'white',
            width: 60,
            opacity: 0.5,
          },
          container: {
            backgroundColor: 'black',
          },
        }}>
        <Rating
          type="custom"
          ratingCount={5}
          imageSize={30}
          showRating
          fractions={1}
          ratingColor="yellow"
          jumpValue={0.1}
          ratingBackgroundColor="grey"
          ratingTextColor="lightgreen"
          startingValue={userRating}
          tintColor="#121212"
          // tintColor="transparent"
          onFinishRating={onFinishRating}
          style={styles.ratingStyle}
        />
      </RBSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  cardView: {
    backgroundColor: 'pink',
    padding: 10,
    borderRadius: 10.9,
    margin: 10,
  },
  averageRatingView: {
    // justifyContent: 'space-between',
    // alignContent: 'space-between',
    flexDirection: 'row',
  },
  ratingStyle: {
    paddingHorizontal: 89,
    elevation: 10,
    fontSize: 30,
    // color: 'blue',
  },
  left: {},
  right: {
    flex: 1,
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
    fontSize: 20,
    color: 'black',
    // borderWidth: 2,
    alignSelf: 'flex-start',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    // marginTop: 22,
    backgroundColor: 'white',
  },

  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 25,
  },
});

export default App;
