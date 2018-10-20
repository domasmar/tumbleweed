import React from 'react';

import {connect} from 'react-redux';
import {FlatList, View, Text} from 'react-native';

import ListView from '../../components/ListView';
import RouteView from "../../components/RouteView";

class RoutesList extends React.Component {
    static navigationOptions = {
        title: 'Drivers Routes',
    };

    constructor(props) {
        super(props);
    }

    componentWillMount() {

    }

    renderItem(item) {
        return <RouteView route={item}/>
    }

    render() {
        if (!this.props.isLoading) {
            return (
                <ListView
                    items={[{key: 'a'}, {key: 'b'}]}
                    getRenderItem={this.renderItem}
                />
            );
        }
        return <LoadingView/>;
    }
}

const mapStateToProps = ({isLoading}) => {
    return {isLoading};
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(RoutesList);
