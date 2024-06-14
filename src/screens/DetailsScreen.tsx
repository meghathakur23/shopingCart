import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import CustomButton from '../components/CustomButton';
import Geolocation from '@react-native-community/geolocation';
import {ScrollView} from 'react-native-gesture-handler';
const DetailsScreen = ({route}: any) => {
  const {item} = route.params || {};
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location.',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getCurrentLocation();
        } else {
          setErrorMsg('Location permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      getCurrentLocation();
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      async position => {
        setLocation(position.coords);
        try {
          const {latitude, longitude} = position.coords;
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1&countrycodes=in`,
          );
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          const address = data.display_name;
          setAddress(address); // Set state or handle the address as needed
        } catch (error) {
          // console.error('Error fetching address:', error);
        }
      },
      error => {
        setErrorMsg(error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  if (!item) {
    return (
      <View style={styles.center}>
        <Text>Item not found</Text>
      </View>
    );
  }
  console.log(address);
  return (
    <ScrollView>
      <View style={styles.detailsContainer}>
        {item.image ? (
          <View style={styles.imageContainer}>
            <Image source={{uri: item.image}} style={styles.image} />
          </View>
        ) : (
          <Text>No Image Available</Text>
        )}
        <View style={styles.details}>
          <Text style={styles.title}>{item?.title}</Text>
          <View style={styles.ratingsContainer}>
            <Text style={styles.detailsRatings}>
              Ratings {item.rating.rate}|
            </Text>
            <Text style={styles.detailsReviews}>
              {item.rating.count} Reviews
            </Text>
          </View>
          <Text style={styles.detailsPrice}>Rs {item.price}</Text>
          <Text style={styles.detailsCategory}>{item.category}</Text>
          <Text style={styles.productDesTitle}>Product Description</Text>
          <Text
            style={styles.detailsDescription}
            numberOfLines={2}
            ellipsizeMode="tail">
            {item.description}
          </Text>
          <Text>{item.body}</Text>
          {/* Display live location */}
          <View>
            <Text style={styles.location}>{address || ''}</Text>
          </View>
          {errorMsg && <Text>Error getting location: {errorMsg}</Text>}
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton
            title="Add to cart"
            onPress={() => console.log('Add to cart pressed')}
            style={styles.buttonOutline}
            textStyle={styles.buttonOutlineText}
          />
          <CustomButton
            title="Buy now"
            onPress={() => console.log('Buy now pressed')}
            style={styles.buttonSolid}
            textStyle={styles.buttonSolidText}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  detailsContainer: {
    backgroundColor: '#FFF',
    flex: 1,
  },
  details: {
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
  imageContainer: {
    backgroundColor: '#EDEDED',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    minHeight: 300,
  },
  map: {
    flex: 1,
  },
  detailsReviews: {
    color: '#666',
    fontSize: 12,
    fontWeight: '500',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productDesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginVertical: 10,
  },
  detailsPrice: {
    fontSize: 20,
    color: '#F05152',
    fontWeight: 'bold',
  },
  detailsCategory: {},
  detailsDescription: {
    fontSize: 16,
    color: '#888',
    fontWeight: '500',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    padding: 20,
  },
  buttonOutline: {
    padding: 10,
    borderWidth: 2,
    borderColor: '#F05152',
    borderStyle: 'solid',
    minWidth: 100,
    borderRadius: 10,
  },
  buttonSolid: {
    padding: 10,
    backgroundColor: '#F05152',
    minWidth: 100,
    borderRadius: 10,
  },
  buttonSolidText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  buttonOutlineText: {
    color: '#F05152',
  },
  ratingsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  detailsRatings: {
    color: '#666',
    fontSize: 14,
    fontWeight: '600',
  },
  location: {
    color: '#000',
  },
});

export default DetailsScreen;
