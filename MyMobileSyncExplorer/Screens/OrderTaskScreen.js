import React, { useState,useEffect } from "react";
import NavImgButton from "./components/NavImgButton";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
  StyleSheet,
} from "react-native";
import { useCart } from "./components/CartContex";

const products = [
  {
    id: 1,
    name: "Product 1",
    category: "Category A",
    price: 10.99,
    image: require("../images/product1.jpg"),
  },
  {
    id: 2,
    name: "Product 2",
    category: "Category B",
    price: 20.49,
    image: require("../images/product2.jpg"),
  },
  {
    id: 3,
    name: "Product 3",
    category: "Category A",
    price: 15.99,
    image: require("../images/product3.jpg"),
  },

  // Add more products as needed
];

const groupProductsByCategory = (products) => {

  return products.reduce((result, product) => {
    const category = product.category;
    if (!result[category]) {
      result[category] = [];
    }
    result[category].push(product);
    return result;
  }, {});
};

const OrderTask = ({ navigation }) => {
    const { cart, addToCart, removeFromCart } = useCart();
    console.log('Cart context value:', cart);
    const groupedProducts = groupProductsByCategory(products);

    const [expandedCategories, setExpandedCategories] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState({});
    const [quantity, setQuantity] = useState("");
    // const [ setCart] = useState([]);
    // const [showCart, setShowCart] = useState(false);
 
  const toggleCategory = (category) => {
    setExpandedCategories((prevCategories) => {
      if (prevCategories.includes(category)) {
        return prevCategories.filter((c) => c !== category);
      } else {
        return [...prevCategories, category];
      }
    });
  };

  const handleProductClick = (product) => {
    setSelectedProduct((prevSelectedProduct) =>
      prevSelectedProduct === product ? null : product
    );
    setQuantity("");
  };

  const isProductInCart = (productId) => {
    return cart.some((item) => item.id === productId);
  };

  return (
    <View style={styles.container}>
      {Object.entries(groupedProducts).map(([category, products]) => (
        <View key={category} style={styles.categoryContainer}>
          {/* Category header */}
          <TouchableOpacity
            style={styles.categoryHeader}
            onPress={() => toggleCategory(category)}
          >
            <Text style={styles.categoryHeaderText}>{category}</Text>
          </TouchableOpacity>

          {/* Product details */}
          {expandedCategories.includes(category) && (
            <FlatList
              data={products}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleProductClick(item)}>
                  <View style={styles.productContainer}>
                    <Image source={item.image} style={styles.productImage} />
                    <Text style={styles.productText}>{item.name}</Text>
                  </View>
                  {selectedProduct && selectedProduct.id === item.id && (
                    <View>
                        {isProductInCart(item.id) && (
                        <View>
                          <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                            <View style={styles.addToCartButton}>
                              <Text>Remove From Cart</Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      )}
                        <View style={styles.quantityContainer}>
                      {!isProductInCart(item.id) && (
                        <View>
                          <Text>Enter Quantity:</Text>
                          <TextInput
                            style={styles.quantityInput}
                            placeholder="Quantity"
                            keyboardType="numeric"
                            value={quantity}
                            onChangeText={(text) => setQuantity(text)}
                            editable={!isProductInCart(item.id)} // Disable if product is in the cart
                          />
                          <TouchableOpacity onPress={addToCart(selectedProduct, quantity)}>
                            <View style={styles.addToCartButton}>
                              <Text>Add to Cart</Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      )}
                    </View>
                    </View>
                    
                  )}
                </TouchableOpacity>
              )}
            />
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  categoryContainer: {
    marginBottom: 10,
    backgroundColor: "#EDEDED",
    borderRadius: 8,
  },
  categoryHeader: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
  },
  categoryHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  productContainer: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  productImage: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 8,
  },
  productText: {
    fontSize: 16,
  },
  quantityContainer: {
    padding: 10,
    backgroundColor: "#F0F0F0",
    marginTop: 5,
    borderRadius: 8,
  },
  quantityInput: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 5,
    padding: 5,
    marginTop: 5,
  },
  addToCartButton: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 8,
    marginTop: 5,
    alignItems: "center",
  },
  openCartButton: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },
  navButtonsGroup: {
    flexDirection: 'row',
    marginRight: 10,
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 10, 
  },
});

export default OrderTask;
