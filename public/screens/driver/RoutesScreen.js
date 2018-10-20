import React from 'react';
import {connect} from 'react-redux';

import ListView from '../../components/ListView';
import LoadingView from '../../components/Loading';
import RouteView from "../../components/RouteView";

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

const mapStateToProps = ({isLoading, driversList}) => {
  return {isLoading, driversList};
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(RoutesScreen);
