import React, { useState, useRef, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  PermissionsAndroid,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import Proptypes from 'prop-types';
import MapView, { PROVIDER_GOOGLE, Geojson, Marker } from 'react-native-maps';
import decode from '../../service/decode';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Geolocation from 'react-native-geolocation-service';
import http from '../../config/network';
import storeIcon from '../../Images/store.png';

const STORE_POSITION = {
  latitude: 21.0370594,
  longitude: 105.7777756,
};

const initGeo = {
  type: 'FeatureCollection',
  features: [],
};

const Map = ({}) => {
  const [fetching, setfetching] = useState(false);
  const [geojson, setGeojson] = useState({
    ...initGeo,
  });
  const map = useRef(null);
  const routing = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          async position => {
            console.log('lat: ', position.coords.latitude);
            console.log('Long: ', position.coords.longitude);
            try {
              const url = `https://maps.googleapis.com/maps/api/directions/json?mode=walking&origin=${position.coords.latitude},${position.coords.longitude}&destination=${STORE_POSITION.latitude},${STORE_POSITION.longitude}&key=AIzaSyD4C27tVX4h9Qge4NIsw8Xu7Cw2c6Rsdaw`;
              const result = await http.get(url);
              if (result.data?.routes.length) {
                console.log(result.data.routes[0].overview_polyline.points);
                const myPlace = {
                  type: 'FeatureCollection',
                  features: [
                    {
                      type: 'Feature',
                      properties: {},
                      geometry: {
                        type: 'Point',
                        coordinates: [
                          position.coords.longitude,
                          position.coords.latitude,
                        ],
                      },
                    },
                    {
                      type: 'Feature',
                      properties: {},
                      geometry: {
                        type: 'LineString',
                        coordinates: decode(
                          result.data.routes[0].overview_polyline.points,
                        ),
                      },
                    },
                  ],
                };
                setGeojson(myPlace);
              }
              if (map.current) {
                console.log('fit', position.coords, STORE_POSITION);

                map.current.fitToCoordinates(
                  [
                    {
                      latitude: position.coords.latitude,
                      longitude: position.coords.longitude,
                    },
                    {
                      latitude: STORE_POSITION.latitude,
                      longitude: STORE_POSITION.longitude,
                    },
                  ],
                  {
                    animated: true,
                    edgePadding: {
                      top: 100,
                      right: 0,
                      bottom: 0,
                      left: 100,
                    },
                  },
                );
              }
            } catch (error) {
              console.log(error);
              setGeojson({
                ...initGeo,
              });
            }
          },
          error => {
            console.log(error.code, error.message);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const navigateToCurrentLocation = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          position => {
            if (map.current) {
              map.current.setCamera({
                center: {
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                },
              });
            }
          },
          error => {
            // See error code charts below.
            console.log(error.code, error.message);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const onLayout = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          position => {
            if (map.current) {
              map.current.fitToCoordinates(
                [
                  {
                    latitude: STORE_POSITION.latitude,
                    longitude: STORE_POSITION.longitude,
                  },
                ],
                {
                  animated: true,
                },
              );
            }
          },
          error => {
            // See error code charts below.
            console.log(error.code, error.message);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  return (
    <View style={styles.container}>
      <MapView
        ref={map}
        showsUserLocation
        onLayout={onLayout}
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={{
          latitude: STORE_POSITION.latitude,
          longitude: STORE_POSITION.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        <Geojson
          geojson={geojson}
          strokeColor="red"
          fillColor="green"
          strokeWidth={2}
        />
        <Marker
          title={'Cửa hàng đồ ăn nhanh'}
          key="store"
          coordinate={STORE_POSITION}>
          <View>
            <Image
              source={storeIcon}
              style={{ width: 30, height: 30, zIndex: 99 }}
              resizeMode="contain"
            />
          </View>
        </Marker>
      </MapView>
      <TouchableOpacity
        onPress={routing}
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          width: 50,
          height: 50,
          borderRadius: 25,
          backgroundColor: 'white',
          elevation: 5,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {fetching ? (
          <ActivityIndicator />
        ) : (
          <Icon name="vector-polyline" size={24} />
        )}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={navigateToCurrentLocation}
        style={{
          position: 'absolute',
          bottom: 80,
          right: 20,
          width: 50,
          height: 50,
          borderRadius: 25,
          backgroundColor: 'white',
          elevation: 5,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Icon name="map-marker-radius" size={24} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Map;
