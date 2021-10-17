import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Animated,
} from 'react-native';

import Form from '../components/SignInForm';

const SignInScreen = ({navigation}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const animation = {
    opacity: fadeAnim,
    transform: [
      {
        translateY: fadeAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [150, 0],
        }),
      },
    ],
  };

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#201e28',
      }}>
      <View style={styles.topView}>
        <Animated.Text
          style={[
            {
              color: '#fff',
              fontSize: 28,
            },
            animation,
          ]}>
          Let's get started.
        </Animated.Text>
        <Animated.Text
          style={[
            {
              color: 'gray',
              fontSize: 28,
            },
            animation,
          ]}>
          Login to your account.
        </Animated.Text>
      </View>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Animated.View
          style={[
            styles.bottomView,
            {
              opacity: fadeAnim,
              transform: [
                {
                  translateY: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [150, 0],
                  }),
                },
              ],
            },
          ]}>
          <View>
            <Form navigation={navigation} />
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  topView: {
    backgroundColor: '#201e28',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomView: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopStartRadius: 60,
    borderTopEndRadius: 60,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    bottom: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SignInScreen;
