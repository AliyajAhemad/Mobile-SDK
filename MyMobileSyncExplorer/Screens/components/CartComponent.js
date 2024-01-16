import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useCart } from "./CartContex";

const CartComponent = ({ route }) => {
    const { cart, addToCart, removeFromCart } = useCart();
    const groupedCartProducts = cart ? cart.reduce((result, product) => {
        const category = product.category;
        if (!result[category]) {
          result[category] = [];
        }
        result[category].push(product);
        return result;
      }, {}) : {};

    const calculateCategoryTotal = (products) => {
        return products.reduce((total, product) => total + (product.price * product.quantity), 0);
    };

    const calculateGrandTotal = () => {
        return Object.values(groupedCartProducts).reduce((grandTotal, categoryProducts) => {
            return grandTotal + calculateCategoryTotal(categoryProducts);
        }, 0);
    };

  return (
    <View style={styles.cartContainer}>
      {Object.entries(groupedCartProducts).map(([category, products]) => (
        <View key={category} style={styles.categoryContainer}>
          <Text style={styles.categoryHeaderText}>{category}</Text>
          <FlatList
            data={products}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.productContainer}>
                <Text>{`${item.name} - Quantity: ${item.quantity}`}</Text>
              </View>
            )}
          />
          <Text style={styles.totalText}>{`Total: $${calculateCategoryTotal(products).toFixed(2)}`}</Text>
        </View>
      ))}
      <Text style={styles.grandTotalText}>{`Grand Total: $${calculateGrandTotal().toFixed(2)}`}</Text>
      <TouchableOpacity style={styles.checkoutButton}>
        <Text style={styles.checkoutButtonText}>Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cartContainer: {    
    padding: 10,
  },
  closeIcon: {
    alignItems: "flex-end",
    marginBottom: 10,
  },
  categoryContainer: {
    marginBottom: 10,
  },
  categoryHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  productContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 8,
    marginTop: 5,
  },
  totalText: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },
  grandTotalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  checkoutButton: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },
  checkoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CartComponent;
