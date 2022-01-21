import React, {useRef} from 'react';
import {View, Button} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {Rating, AirbnbRating} from 'react-native-ratings';

export default function App1() {
  const refRBSheet = useRef();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
      }}>
      <Button
        title="OPEN BOTTOM SHEET"
        onPress={() => refRBSheet.current.open()}
      />
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        animationType="slide"
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#000',
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
          startingValue={1}
          tintColor="#121212"
          // onSwipeRating={onSwipeRating}
          //   onFinishRating={onFinishRating}
          //   style={styles.ratingStyle}
        />
      </RBSheet>
    </View>
  );
}
