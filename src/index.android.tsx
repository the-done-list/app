/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import * as React from 'react-native';

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput
} = React;

var items = [
  "First",
  "Second",
  "Third"
]

var app = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>What did you do?</Text>
        <View style={styles.input}>
          <TextInput />
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#fff',
  },
  input: {
    fontSize: 15,
    textAlign: 'left',
    margin: 10,
    backgroundColor: "#fff"
  },
  header: {
    fontSize: 30,
    textAlign: 'left',
    margin: 10
  }
});

AppRegistry.registerComponent('app', () => app);
