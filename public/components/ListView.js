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
            ({item}) => {
              return (
                <View style={styles.listItem}>
                  {this.props.getRenderItem(item)}
                </View>
              );
            }
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
    height: 'auto',
    flex: 1,
    padding: 20,
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
});
