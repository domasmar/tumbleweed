import React from "react";
import {FlatList, StyleSheet, View, Text} from "react-native";

export default class ListView extends React.Component {
  render() {
    if(this.props.items) {
      return (
        <FlatList
          data={this.props.items}
          style={styles.container}
          renderItem={
            ({item}) => (
              <View style={styles.listItem}>
                <Text>{item.key}</Text>
              </View>
            )
          }
        />
      );
    }
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  listItem: {
    width: '100%',
    height: 60,
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
});
