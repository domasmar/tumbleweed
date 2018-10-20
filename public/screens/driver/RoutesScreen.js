import React from 'react';
import {connect} from 'react-redux';

import ListView from '../../components/ListView';
import LoadingView from '../../components/Loading';
import RouteListItem from "../../components/RouteListItem";

class RoutesScreen extends React.Component {
  static navigationOptions = {
    title: 'Drivers Routes',
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
  }

  renderItem(item) {
    return <RouteListItem route={item}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(RoutesScreen);
