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
        <ListView
            initialListSize={24}
            pageSize={24}
            contentContainerStyle={styles.listContainer}
                  dataSource={this.state.dataSource}
                  renderRow={row => <View style={styles.listItem}><Text>{row}</Text></View>} />
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
    paddingBottom: 5,
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    width: 100,
    height: 30
  }
})

AppRegistry.registerComponent('app', () => app);
