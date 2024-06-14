import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Banner = () => {
  return (
    <View style={styles.banner}>
      <Text style={styles.text}>Discover the perfect shopping journey</Text>
      <Text style={styles.text}>Cool and Exciting sales this summer</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    backgroundColor: '#F05152',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    minHeight: 200,
  },
  text: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Banner;
