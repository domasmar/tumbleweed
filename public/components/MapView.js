import { Icon, MapView, Polyline } from "expo";
import React from "react";

export default class MapViewComponent extends React.Component {
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
        strokeWidth={6}
        strokeColor="#00a8ff"
        lineCap="round"
      />
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
          style={{ flex: 1 }}
          initialRegion={{
            latitude,
            longitude,
            latitudeDelta: zoom,
            longitudeDelta: zoom,
          }}
        >
          {
            this.props.polylines.map((polyline, index) => {
              return this.renderPolyline(polyline, index);
            })
          }
          {
            this.props.markerArr.map(marker => {
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
            })
          }
        </MapView>
      );
    }
  }
}


