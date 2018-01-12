/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Slider,
  PanResponder,
  Animated,
  Text
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { value: 10, waterPercent: 50 };
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true
    })
  }
  // {   transform: [{ scaleX: this.state.age}, { scaleY: this.state.age}],   }  

  render() {
    //TODO округлить waterpercent до сотых 
    const weight = this.state.waterPercent == 99 ? this.state.value : (this.state.value * (0.01 / (1 - this.state.waterPercent * 0.01))).toFixed(2);
    const waterScale = weight / this.state.value;
    const initialSize = 200 * waterScale < 30 ? 30 : 200 * waterScale;
    const sizeDelta = 50;
    const s = new Animated.Value(this.state.value).interpolate({
      inputRange: [10, 100],
      outputRange: [initialSize, initialSize + sizeDelta],
      extrapolate: 'clamp',
    });
    const r = new Animated.Value(this.state.value).interpolate({
      inputRange: [0, 100],
      outputRange: [initialSize / 2, (initialSize + sizeDelta) / 2],
      extrapolate: 'clamp',
    });
    const w = new Animated.Value(this.state.waterPercent).interpolate({
      inputRange: [50, 99],
      outputRange: [10, 3],
      extrapolate: 'clamp',
    });
    console.log(r);
    console.log(s);
    return (
      <View style={styles.rootContainer}>
        <Text style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: 16 }}>
          {"Симулятор арбуза"}
        </Text>
        <View style={styles.mellonContainer}>
          <Text style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: 16 }}>
            {"Вес после усыхания:" + weight + "кг."}
          </Text>
          <Animated.View style={[styles.circle, { width: s, height: s, borderRadius: r, borderWidth: w }]} />
        </View>
        <View style={styles.sliderContainer}>
          <Text style={{ marginTop: 100, marginLeft: 10, fontWeight: 'bold', fontSize: 16 }}>
            {"Начальный вес арбуза:" + this.state.value + "кг."}
          </Text>
          <Slider
            {...this._panResponder.panHandlers}
            style={{
              marginTop: 200,
              width: 400,
              alignSelf: 'flex-start',
              transform: [
                { rotateZ: '-90deg' },
              ],
              marginLeft: -180,
            }}
            step={1}
            minimumValue={10}
            maximumValue={100}
            value={this.state.value}
            onValueChange={val => this.setState({ value: val })}
          />
          <Text style={{ marginTop: 150, marginLeft: 90, fontWeight: 'bold', fontSize: 16 }}>
            {"Процент воды после усыхания:" + this.state.waterPercent + "%"}
          </Text>
          <Slider
            {...this._panResponder.panHandlers}
            style={{
              marginLeft: 60,
              marginTop: 10,
              width: 300,
              alignSelf: 'flex-start',
            }}
            step={1}
            minimumValue={50}
            maximumValue={99}
            value={this.state.waterPercent}
            onValueChange={val => this.setState({ waterPercent: val })}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
  },
  sliderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    backgroundColor: 'transparent',
  },
  mellonContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  circle: {
    borderColor: 'green',
    backgroundColor: 'red',
    alignSelf: 'center'
  }
});
