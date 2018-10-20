import {Platform} from "react-native";
import Colors from "../../constants/Colors";

export function PinMarker(lat, lng, title = '') {
  return {
    title,
    key: Math.random().toString(36).substr(2, 9),
    latitude: lat,
    longitude: lng,
    icon: {
      name: Platform.OS === 'ios' ? 'ios-pin' : 'md-pin',
      color: Colors.markerStart,
      size: 42,
    },
  };
}

export function FinishMarker(lat, lng, title = '') {
  return {
    title,
    key: Math.random().toString(36).substr(2, 9),
    latitude: lat,
    longitude: lng,
    icon: {
      name: Platform.OS === 'ios' ? 'ios-flag' : 'md-flag',
      color: Colors.markerFinish,
      size: 42,
    },
  };
}
