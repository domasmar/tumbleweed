import { Icon, MapView, Polyline } from "expo";
import React from "react";

export default class MapViewComponent extends React.Component {

  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    this.state = {
      isMapReady: false
    }
  }

  fit() {
    this.mapRef.current.fitToElements();
  }

  onMapLayout = () => {
    this.setState({ isMapReady: true });
  };

  renderMarker(marker) {
    return (
      <MapView.Marker
        key={`${marker.longitude}${marker.latitude}`}
        coordinate={{
          latitude: marker.latitude,
          longitude: marker.longitude,
        }}
        title={marker.title}
      >
        { this.renderIcon(marker) }
      </MapView.Marker>
    );
  }

  renderIcon(marker) {
    if(marker.icon) {
      const {
        name,
        size,
        color,
      } = marker.icon;
      return (
        <Icon.Ionicons
          name={name}
          size={size}
          color={color}
        />
      );
    }
  }

  renderPolyline(polyline, idx) {
    const coords = polyline.routeSteps.map(step => ({
      latitude: step.lat,
      longitude: step.lng,
    }));
    return (
      <MapView.Polyline
        key={idx}
        coordinates={coords}
        strokeWidth={5}
        strokeColor="#00a8ff"
        lineCap="round"
      ></MapView.Polyline>
    );
  }

  render() {
    const {
      zoom,
      latitude,
      longitude,
    } = this.props;

    if (latitude && longitude) {
      return (
        <MapView
          ref={this.mapRef}
          style={{ flex: 1 }}
          initialRegion={{
            latitude,
            longitude,
            latitudeDelta: zoom,
            longitudeDelta: zoom,
          }}
          onLayout={this.onMapLayout}
        >
          {
            this.state.isMapReady && this.props.polylines && this.props.polylines.map((polyline, index) => {
              return this.renderPolyline(polyline, index);
            })
          }
          {
            this.state.isMapReady && this.props.markerArr && this.props.markerArr.map(marker => {
              return this.renderMarker(marker);
            })
          }
        </MapView>
      );
    }
  }
}


