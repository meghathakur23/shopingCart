import React, {useContext} from 'react';
import {DataContext} from '../context/DataContext';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import Banner from '../components/Banner';
const HomeScreen = ({navigation}: any) => {
  const items = useContext(DataContext);

  const handlePress = (item: any) => {
    navigation.navigate('Details', {item});
  };
  const renderItem = ({item}: any) => (
    <TouchableOpacity onPress={() => handlePress(item)} style={styles.item}>
      {item.image ? (
        <View style={styles.imageContainer}>
          <Image source={{uri: item.image}} style={styles.image} />
        </View>
      ) : (
        <Text>No Image Available</Text>
      )}
      <View style={styles.itemInfoContainer}>
        <Text style={styles.title}>{item?.title}</Text>
        <Text style={styles.price}>Rs {item.price}</Text>
        <Text style={styles.category}>{item.category}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* <Banner /> */}
      <FlatList
        renderItem={renderItem}
        data={items}
        numColumns={2}
        contentContainerStyle={styles.flatListContainer}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#FFF',
  },
  flatListContainer: {
    justifyContent: 'space-between',
  },
  item: {
    flex: 1,
    elevation: 5,
    backgroundColor: '#EDEDED',
    borderRadius: 10,
    margin: 12,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginVertical: 10,
  },
  imageContainer: {
    backgroundColor: '#FFF',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
  },
  itemInfoContainer: {
    margin: 10,
  },
  title: {
    fontSize: 14,
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    color: '#000',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  category: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
  },
  description: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});

export default HomeScreen;
HomeScreen.navigationOptions = {
  headerShown: false,
};
