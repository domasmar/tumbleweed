import React from "react";
import {FlatList, StyleSheet, View, Text, CheckBox} from "react-native";

export default class RouteView extends React.Component {
    render() {
        if (this.props.route) {
            const route = this.props.route;
            return (
                <React.Fragment>
                    <View style={styles.listItem}>
                        <View style={{flexBasis: '80%'}}>
                            <View style={styles.rowView}>
                                <Text style={{fontWeight: "bold"}}>ROUTE ID:</Text>
                                <Text style={{paddingLeft: 3}}>{route.routeId}</Text>
                            </View>
                            <View style={styles.fromTo}>
                                <View style={styles.rowView}>
                                    <Text style={{fontWeight: "bold"}}>FROM:</Text>
                                    <Text style={{paddingLeft: 3}}>{route.startLabel}</Text>
                                </View>
                                <View style={[styles.rowView]}>
                                    <Text style={{fontWeight: "bold"}}>TO:</Text>
                                    <Text style={{paddingLeft: 3}}>{route.endLabel}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.endContainer}>
                            <View style={[styles.full]}>
                                <Text style={{fontWeight: "bold"}}>Full</Text>
                                <CheckBox
                                    title='full'
                                    checked={route.hidden}
                                />
                            </View>
                        </View>
                    </View>
                </React.Fragment>
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
        height: 65,
        paddingLeft: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderColor: '#eee',
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingTop: 3
    },
    rowView: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    fromTo: {
        paddingTop: 5,
    },
    endContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        flexBasis: '20%',
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    full: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
