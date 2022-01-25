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

  let avgRating; //count , averagerating,
  const [userRating, setUserRating] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [uid, setUid] = useState(1);
  const [myUid, setMyUid] = useState(3);
  const [ratingCount, setRatingCount] = useState(0);

  const getUserData = async () => {
    try {
      const response = await fetch(`${apiUrl}/getOne`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: uid,
          by_uid: myUid,
        }),
      });

      const resp = await response.json();

      const ratePerson = resp.result[0]; //uid:1
      console.log(ratePerson.count);

      const avgRating = ratePerson.avg_rating.toFixed(1);

      setAverageRating(avgRating); //
      setUserRating(ratePerson.obj_uid[0].ratings);
      setRatingCount(ratePerson.count);
    } catch (e) {
      console.error('Error : ', e);
    }
  };

  const sendUpdatedRating = async userRating => {
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
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

  function onFinishRating(userRating1) {
    console.log('Rating1 : ' + userRating1);
    setUserRating(userRating1);
    console.log(userRating); //ahiya api call karvani chhe jethi update thai
    setTimeout(() => {
      refRBSheet.current.close();
      Snackbar.show({
        text: 'User Rating Set To ' + userRating,
        duration: Snackbar.LENGTH_INDEFINITE,
      });
    }, 2000);

    sendUpdatedRating(userRating1);
    setTimeout(getUserData, 500);
  }

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <View style={styles.centeredView}>
      <Text style={{color: 'black', alignSelf: 'center', fontSize: 20}}>
        Rating Of User : {userRating}
      </Text>

      <Pressable
        onPress={() => {
          refRBSheet.current.open();
        }}>
        <View style={styles.cardView}>
          <Text style={styles.ratingText}>Id :{uid}</Text>
          <View style={styles.averageRatingView}>
            <View style={styles.left}>
              <Text style={styles.ratingText}> Average Rating :</Text>
            </View>
            <View style={styles.right}>
              <Rating
                type="custom"
                ratingCount={5}
                imageSize={12}
                fractions={1}
                ratingColor="gold"
                jumpValue={0.1}
                readonly={true}
                ratingBackgroundColor="grey"
                ratingTextColor="lightgreen"
                startingValue={averageRating}
                tintColor="#121212"
                style={styles.ratingStyle}
              />
            </View>
          </View>

          <Text style={styles.ratingText}> Count: {ratingCount}</Text>
        </View>
      </Pressable>

      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        animationType="fade"
        height={150}
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
        <View style={styles.drawerRatingView}>
          <Rating
            type="custom"
            ratingCount={5}
            imageSize={23}
            showRating
            fractions={1}
            ratingColor="yellow"
            jumpValue={0.1}
            ratingBackgroundColor="grey"
            ratingTextColor="lightgreen"
            startingValue={userRating}
            tintColor="black"
            onFinishRating={onFinishRating}
            style={styles.ratingStyle}
          />
        </View>
      </RBSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  cardView: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 10.9,
    margin: 7,
  },
  averageRatingView: {
    flexDirection: 'row',
  },
  drawerRatingView: {
    flex: 0.5,
    borderWidth: 2,
  },
  ratingStyle: {
    paddingHorizontal: 89,
    fontSize: 30,
  },
  left: {flex: 1},
  right: {
    flex: 1.9,
    borderWidth: 2,
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
  },
  ratingText: {
    fontSize: 15,
    color: 'white',
    alignSelf: 'flex-start',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
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
