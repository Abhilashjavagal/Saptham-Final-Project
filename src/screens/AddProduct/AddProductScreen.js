import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Picker, TextArea, Button, StyleSheet } from 'react-native';
import styles from './styles';
import { getDatabase, ref, set } from "firebase/database";
import ImagePicker from 'react-native-image-picker';
import ModalDropdown from 'react-native-modal-dropdown';

const AddProductScreen = () => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category_id, setCategory_id] = useState('');
    const [price,setPrice] =useState('');
    const [images,setImages] =useState(null);
    const options = ['Option 1', 'Option 2', 'Option 3'];
    const [selectedOption, setSelectedOption] = useState('Select an option');
  
    const handleSelect = (index) => {
      setSelectedOption(options[index]);
    };

    handleFieldChange = (fieldName, text) => {
        this.setState({ [fieldName]: text });
    };

   const handleSubmit = ( name, description, category_id, price, images ) => {
    console.log(name, description, category_id, price, images)
        const db = getDatabase();
        const productRef = ref(db, 'Products/');
        set(productRef, {
            // id: userId,
            name: "",
            description: "",
            category_id: "",
            price: "",
            images: "",
        });
    };

    const handleImagePick = () => {
        const options = {
          title: 'Select Image',
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
    
        ImagePicker.showImagePicker(options, (response) => {
          if (response.didCancel) {
            console.log('Image selection canceled');
          } else if (response.error) {
            console.error('ImagePicker Error: ', response.error);
          } else {
            setImages({ uri: response.uri });
          }
        });
    };    
   
        return (
            <View style={styles.container}>
                <View>
                  <Text style={styles.label}>Name</Text>
                  <TextInput
                    placeholder="Enter name"
                    value={name}
                    onChangeText={(text) => setName(text)}
                    style={styles.input}
                    maxLength={30}
                  />
                  <Text style={styles.label}>Description</Text>
                  <TextInput
                    placeholder="Enter Description"
                    value={description}
                    onChangeText={(text) => setDescription(text)}
                    style={styles.input}
                    maxLength={30}
                  />
        
                  <Text>Select an option:</Text>
                  <ModalDropdown
                    options={options}
                    onSelect={(index) => handleSelect(index)}
                  >
                    <TouchableOpacity style={styles.dropdownButton}>
                      <Text>{selectedOption}</Text>
                    </TouchableOpacity>
                  </ModalDropdown>

                  <Text style={styles.label}>Price</Text>
                  <TextInput
                    placeholder="Enter price"
                    value={price}
                    onChangeText={(text) => setPrice(text)}
                    style={styles.input}
                    maxLength={30}
                  />
                  <Text style={styles.label}>Images</Text>
                  {images && <Image source={images} style={styles.images} />}
                  <Button title="Select Image" onPress={handleImagePick} />
        
                  <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <Text>Submit</Text>
                  </TouchableOpacity>
                </View>
            </View>
        );
    }



export default AddProductScreen;