import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/FirebaseConfig';
import Colors from './../constants/Colors'

export default function Category({category}) {
    const [CategoryList, setCategoryList] = useState([]);
    const [selectedCategory, setSelectCategory] = useState('Dogs');

    useEffect(() => {
        GetCategories();
    }, []);

    // USED TO GET CATEGORY LIST FROM DB
    const GetCategories = async () => {
        setCategoryList([]);
        const snapshot = await getDocs(collection(db, 'Category'));
        snapshot.forEach((doc) => {
            setCategoryList(CategoryList => [...CategoryList, doc.data()]);
        });
    }

    return (
        <View style={{ marginTop: 20 }}>
            <Text style={{ fontFamily: 'outfit-medium', fontSize: 20 }}>
                Category
            </Text>

            <FlatList
                data={CategoryList}
                numColumns={4}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        style={{ flex: 1 }}
                        onPress={() => {

                            setSelectCategory(item.name);
                            category(item.name)
                        }}
                    >
                        <View style={{ flex: 1 }}>
                            <View style={[
                                styles.container,
                                selectedCategory == item.name && styles.selectedCategoryContainer
                            ]}>
                                <Image source={{ uri: item?.imageUrl }}
                                    style={{ width: 40, height: 40 }} />
                            </View>
                            <Text style={{
                                textAlign: 'center',
                                fontFamily: 'outfit'
                            }}>{item?.name}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.LIGHT_PRIMARY,
        padding: 15,
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 15,
        borderColor: Colors.PRIMARY,
        margin: 5,
    },
    selectedCategoryContainer: {
        backgroundColor: Colors.SECONDARY,
        borderColor: Colors.SECONDARY
    }
});
