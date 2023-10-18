import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DashboardScreen from '../Dashboard/Dashboard';
import LoginScreen from '../Login/Login';
import { DrawerContent } from '../DrawerContent/DrawerContent';
import { auth } from '../../firebase/config';
import AddProductScreen from '../AddProduct/AddProductScreen';
import ProductVariantsScreen from '../ProductVariants/ProductVariantsScreen';
import ProductsScreen from '../Products/ProductsScreen';

const Drawer = createDrawerNavigator();

const DrawerContainer = () => {
    return (
        <Drawer.Navigator
            initialRouteName="Login"
            drawerContent={(props) => <DrawerContent {...props} auth={auth} />}

        >
            <Drawer.Screen name="AddProduct" component={AddProductScreen} />
            <Drawer.Screen name="ProductVariants" component={ProductVariantsScreen} />
            <Drawer.Screen name="Products" component={ProductsScreen} />
            <Drawer.Screen name="Dashboard" component={DashboardScreen} />
            <Drawer.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        </Drawer.Navigator>
    );
};

export default DrawerContainer;
