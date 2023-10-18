import React, { Component } from 'react';
import { View,Text, TextInput, TextArea, Button, StyleSheet } from 'react-native';
import styles from "./styles";
import { getDatabase, ref, set } from "firebase/database";

class ProductVarientScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sku: '',
      parent_product_id: '',
      varient_name: '',
      quantity: '',
      price: '',
    };
  }

  handleFieldChange = (fieldName, text) => {
    this.setState({ [fieldName]: text });
  };

  handleSubmit = () => {
    // Handle form submission here, e.g., send data to an API
    // const { sku, parent_Product_ID, varient_Name, quantity, price, stock_Quantity } = this.state;
    // You can perform validation or submit the data as needed
    // console.log('SKU:', sku);
    // console.log('Parent_Product_ID:', parent_Product_ID);
    // console.log('Varient_Name:', varient_Name);
    // console.log('Quantity:',quantity);
    // console.log('Price:', price);
    // console.log('Stock_Quantity:', stock_Quantity);
    const db = getDatabase();
    const userRef = ref(db, 'ProductVariants/');
    const {sku, parent_product_id, varient_name, quantity, price, } = this.state;
    set(userRef, {
        // id: userId,
        sku: sku,
        parent_product_id:  parent_product_id,
        varient_name: varient_Name,
        quantity: quantity,
        price: price,
    });
    console.log('productsadded')
  };

  render() {
    return (
      <View style={styles.container}>
      <Text style={styles.label}>SKU</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Sku"
          onChangeText={(text) => this.handleFieldChange('sku', text)}
        />
        <Text style={styles.label}>Parent_Product_ID</Text>
        <TextInput
        style={styles.input}
          placeholder="Enter Product_ID"
          onChangeText={(text) => this.handleFieldChange('parent_Product_ID', text)}
        />
        <Text style={styles.label}>Varient_Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Varient_Name"
          onChangeText={(text) => this.handleFieldChange('varient_Name', text)}
        />
        <Text style={styles.label}>Quantity</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Quantity"
          onChangeText={(text) => this.handleFieldChange('quantity', text)}
        />
        <Text style={styles.label}>Price</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Price"
          onChangeText={(text) => this.handleFieldChange('price', text)}
        />
        <Button title="Submit" onPress={this.handleSubmit} />
      </View>
    );
  }
}

export default ProductVarientScreen;
