import { Icon, MapView } from "expo";
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


