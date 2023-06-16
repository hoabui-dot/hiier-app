import React, { useRef } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Easing,
} from 'react-native';
import { TaskApi } from '../../services/api/task';
import { DEFAULT_LOCATION } from '../../utils/defaultValue/common';

const SwitchButtonWithStatusText = () => {
  const positionButton = useRef(new Animated.Value(0)).current;
  const isOnRef = useRef(false);

  const handleOffStatus = () => {
    TaskApi.setInActive().then((response) => {
      if (response.status === 200) {
        Animated.timing(positionButton, {
          toValue: 0,
          duration: 50,
          easing: Easing.ease,
          useNativeDriver: false,
        }).start();
      }
    });
  };

  const handleOnStatus = () => {
    TaskApi.setActive(DEFAULT_LOCATION).then((response) => {
      if (response.status === 200) {
        Animated.timing(positionButton, {
          toValue: 1,
          duration: 50,
          easing: Easing.ease,
          useNativeDriver: false,
        }).start();
      }
    });
  };

  const positionInterPol = positionButton.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 34],
  });

  const backgroundColorAnim = positionButton.interpolate({
    inputRange: [0, 1],
    outputRange: ['#FF3333', '#33CC33'],
  });

  const initialOpacityOn = positionButton.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const initialOpacityOff = positionButton.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const onPress = () => {
    if (isOnRef.current) {
      handleOffStatus();
      isOnRef.current = false;
    } else {
      handleOnStatus();
      isOnRef.current = true;
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ height: 30, width: 90 }}
        activeOpacity={0.9}
        onPress={onPress}
      >
        <Animated.View
          style={[
            styles.mainStyes,
            {
              backgroundColor: backgroundColorAnim,
            },
          ]}
        >
          <Animated.View
            style={[
              styles.circle,
              {
                transform: [
                  {
                    translateX: positionInterPol,
                  },
                ],
              },
            ]}
          />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

export default SwitchButtonWithStatusText;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  circle: {
    height: 30,
    width: 30,
    borderRadius: 20,
    backgroundColor: '#FFF',
    marginTop: 5,
    marginLeft: 5,
  },
  leftText: {
    top: 8,
    left: 8,
  },
  statusText: {
    fontSize: 15,
    color: '#fff',
    fontWeight: 'bold',
    position: 'absolute',
  },
  rightText: {
    top: 9,
    right: 8,
  },
  mainStyes: {
    borderRadius: 30,
    backgroundColor: '#81b0ff',
    height: 40,
    width: 74,
  },

  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
