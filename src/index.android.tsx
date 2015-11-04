/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

declare var global: any; global.self = global;

import * as Promise from 'bluebird'

Promise.setScheduler(function(cb) {
  setTimeout(cb, 1);
})
Promise.longStackTraces()

import * as React from 'react-native'
import {DoneStore} from './done-store'
import {SuggestionService} from './suggestion-service'


var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  ListView
} = React;



var store = new DoneStore()
var suggestion = new SuggestionService(store)

var app = React.createClass({

  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    Promise.resolve().then(_ => this.filterRows(this.state.filter));
    return {
      dataSource: ds.cloneWithRows([]),
      filter: ''
    }
  },
  filterRows: function(text:string) {
    this.setState({filter: text});
    var ds = this.state.dataSource;
    suggestion.suggest(text).then(items => {
      console.log("Suggestion", items);
      this.setState({dataSource: ds.cloneWithRows(items)})
    })
  },

  addItem: function(text:string) {
    store.add(text).then(_ => this.filterRows(''))
  },
  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>What did you do?</Text>
        <View style={styles.input}>
          <TextInput value={this.state.filter} onChangeText={this.filterRows} />
        </View>
        <ListView
            initialListSize={24}
            pageSize={24}
            contentContainerStyle={styles.listContainer}
                  dataSource={this.state.dataSource}
                  renderRow={row => <View style={styles.listItem}>
                    <Text onPress={() => this.addItem(row)}>{row}</Text></View>} />
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
    //fontSize: 15,
    textAlign: 'left',
    margin: 10,
    backgroundColor: "#fff"
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
    //height: 30
  }
})

AppRegistry.registerComponent('app', () => app);
