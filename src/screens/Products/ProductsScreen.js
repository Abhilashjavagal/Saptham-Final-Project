import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator,Image, TouchableOpacity} from 'react-native';
import { ref, get, getDatabase } from 'firebase/database';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';

const ProductsScreen = (props) => {
  const { navigation } = props;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    // Function to fetch orders from the Realtime Database
    const fetchProducts = async () => {
      const db = getDatabase();
      const productsRef = ref(db, 'Products'); // Update 'orders' to match your database structure
      try {
        const snapshot = await get(productsRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          const productList = Object.values(data);
          setProducts(productList);
        } else {
          console.log('No products found.');
        }
      } catch (error) {
        console.error('Error fetching products:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

  }, []); // Fetch orders when the component mounts

 

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }


  if (products.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No products available.</Text>
      </View>
    );

  }


  return (

    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item, index) => (item && item.productsId ? item.productsId.toString() : index.toString())}
        renderItem={({ item }) => (
          <View style={styles.productcontainer}>
          <Image style={styles.photo} source={{ uri: item.images[0].src }} />
          <Text style={styles.title}>{item.name}</Text>
          <Icon name="edit" size={30} color="#333" />
        </View>      
        )}
      />
      <TouchableOpacity style={styles.button}  onPress={() => {
        navigation.navigate('AddProduct');
    }}>
      <Text style={styles.buttonText}>Add</Text>
       </TouchableOpacity>
    </View>
  );

};

export default ProductsScreen;
