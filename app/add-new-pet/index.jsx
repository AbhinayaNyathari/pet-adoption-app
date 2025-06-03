import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, StyleSheet, ScrollView, TouchableOpacity, Pressable, ToastAndroid, Alert } from 'react-native';
import { useNavigation } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import Colors from '../../constants/Colors';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

export default function AddNewPet() {
    const navigation = useNavigation();
    const [formData, setFormData] = useState({ category: 'Dogs', sex: 'Male' });
    const [gender, setGender] = useState('Male');
    const [CategoryList, setCategoryList] = useState([]);
    const [selectedCategory, setSelectCategory] = useState('Dogs');
    const [image, setImage] = useState(null); // base64 image

    useEffect(() => {
        navigation.setOptions({ headerTitle: 'Add New Pet' });
        requestPermission();
        GetCategories();
    }, []);

    const requestPermission = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission required', 'Please allow access to your gallery.');
        }
    };

    const GetCategories = async () => {
        try {
            const snapshot = await getDocs(collection(db, 'Category'));
            const categories = snapshot.docs.map(doc => doc.data());
            setCategoryList(categories);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const imagePicker = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.5,
                base64: false,
            });

            if (!result.canceled) {
                const uri = result.assets[0].uri;
                const base64 = await FileSystem.readAsStringAsync(uri, {
                    encoding: FileSystem.EncodingType.Base64,
                });
                setImage(`data:image/jpeg;base64,${base64}`);
            }
        } catch (err) {
            console.error("Image picking failed:", err);
        }
    };

    const handleInputChange = (fieldName, fieldValue) => {
        setFormData(prev => ({
            ...prev,
            [fieldName]: fieldValue
        }));
    };

    // const onSubmit = async () => {
    //     if (!image || Object.keys(formData).length < 8) {
    //         ToastAndroid.show('Enter all details including an image.', ToastAndroid.SHORT);
    //         return;
    //     }

    //     try {
    //         await addDoc(collection(db, 'Pets'), {
    //             ...formData,
    //             image: image, // base64 stored in Firestore
    //             createdAt: new Date().toISOString()
    //         });
    //         ToastAndroid.show('Pet added successfully!', ToastAndroid.SHORT);
    //         navigation.goBack();
    //     } catch (error) {
    //         console.error("Error adding pet:", error);
    //         ToastAndroid.show('Error adding pet', ToastAndroid.SHORT);
    //     }
    // };
    const onSubmit = async () => {
        if (Object.keys(formData).length < 8) {
            ToastAndroid.show('Enter all details.', ToastAndroid.SHORT);
            return;
        }
    
        try {
            await addDoc(collection(db, 'Pets'), {
                ...formData,
                image: image || null, // Store image only if available
                createdAt: new Date().toISOString()
            });
            ToastAndroid.show('Pet added successfully!', ToastAndroid.SHORT);
            navigation.goBack();
        } catch (error) {
            console.error("Error adding pet:", error);
            ToastAndroid.show('Error adding pet', ToastAndroid.SHORT);
        }
    };
    
    return (
        <ScrollView style={{ padding: 20 }}>
            <Text style={styles.headerText}>Add New Pet for Adoption</Text>

            <Pressable onPress={imagePicker}>
                {!image ? (
                    <Image
                        source={require('./../../assets/images/login.png')}
                        style={styles.image}
                    />
                ) : (
                    <Image source={{ uri: image }} style={styles.image} />
                )}
            </Pressable>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Pet Name *</Text>
                <TextInput style={styles.input} onChangeText={(value) => handleInputChange('name', value)} />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Pet Category *</Text>
                <Picker
                    selectedValue={selectedCategory}
                    style={styles.input}
                    onValueChange={(itemValue) => {
                        setSelectCategory(itemValue);
                        handleInputChange('category', itemValue);
                    }}
                >
                    <Picker.Item label="Select Category" value="" />
                    {CategoryList.map((category, index) => (
                        <Picker.Item key={index} label={category.name} value={category.name} />
                    ))}
                </Picker>
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Breed *</Text>
                <TextInput style={styles.input} onChangeText={(value) => handleInputChange('breed', value)} />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Age *</Text>
                <TextInput style={styles.input} keyboardType='numeric' onChangeText={(value) => handleInputChange('age', value)} />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Gender *</Text>
                <Picker
                    selectedValue={gender}
                    style={styles.input}
                    onValueChange={(itemValue) => {
                        setGender(itemValue);
                        handleInputChange('sex', itemValue);
                    }}
                >
                    <Picker.Item label="Select Gender" value="" />
                    <Picker.Item label="Male" value="Male" />
                    <Picker.Item label="Female" value="Female" />
                </Picker>
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Weight *</Text>
                <TextInput style={styles.input} keyboardType='numeric' onChangeText={(value) => handleInputChange('weight', value)} />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Address *</Text>
                <TextInput style={styles.input} onChangeText={(value) => handleInputChange('address', value)} />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>About *</Text>
                <TextInput
                    style={[styles.input, { height: 100 }]}
                    multiline
                    numberOfLines={5}
                    onChangeText={(value) => handleInputChange('about', value)}
                />
            </View>

            <TouchableOpacity style={styles.button} onPress={onSubmit}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        borderRadius: 10,
        marginBottom: 20,
    },
    inputContainer: {
        marginBottom: 15,
    },
    label: {
        marginBottom: 5,
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: Colors.PRIMARY,
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 50,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

