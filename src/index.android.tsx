/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import * as React from 'react-native';

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  ListView
} = React;


var rows = ['lets', 'test', 'how', 'those', 'rows', 'work', 'with', 'this', 'thing']

var app = React.createClass({

  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(rows)
    }
  },
  filterRows: function(text:string) {
    var ds = this.state.dataSource;
    var newRows = ds.cloneWithRows(rows.filter(row => row.indexOf(text) >= 0))
    this.setState({dataSource: newRows})
  },
  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>What did you do?</Text>
        <View style={styles.input}>
          <TextInput onChangeText={this.filterRows} />
        </View>
        <ListView contentContainerStyle={styles.listContainer}
                  dataSource={this.state.dataSource}
                  renderRow={row => <Text style={styles.listItem}>{row}</Text>} />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    //backgroundColor: '#fff',
  },
  input: {
    fontSize: 15,
    textAlign: 'left',
    margin: 10,
    //backgroundColor: "#fff"
  },
  header: {
    fontSize: 20,
    textAlign: 'left',
    margin: 10
  },
  listContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  listItem:{
    backgroundColor: '#ccc',
    margin: 5,
    paddingBottom: 8,
    paddingTop: 8,
    paddingLeft: 15,
    paddingRight: 15,
    width: 100,
    height: 20
  }
})

AppRegistry.registerComponent('app', () => app);
