import React, { useState } from "react";
import PropTypes from "prop-types";
import ShoppingCart from "../components/ShoppingCart";
import ProductList from "../components/ProductList";
import { items } from "../components/Items";

const ShoppingPage = () => {
  //"products" is the state variable in ShoppingPage (a prop of ProductList)
  const [products, setProducts] = useState(items);

  //"total" is the state variable in ShoppingPage that is a prop for ShoppingCart
  //   const [total, setTotal] = useState(0);

  //"productsInCart" is the state variable in ShoppingPage that is a prop for ShoppingCart
  const [productsInCart, setProductsInCart] = useState(new Map());
  console.log("line 19 productsInCart: ", productsInCart);

  /**
   * function addProduct adds items to Shopping Cart
   * @param {*} takes the product that gets added
   */
  function addProduct(product) {
    //To keep it immutable
    const newProductsInCart = new Map(productsInCart);
    console.log("line 23 new newProductsInCart: ", newProductsInCart);

    let currentQty = newProductsInCart.get(product.name);

    console.log("line 28, currentQTY", currentQty);

    //haven't added the product yet, this initializes the currentQty
    if (currentQty === undefined) {
      currentQty = { product: product, qty: 0 };
    }
    console.log("line 34, currentQTY", currentQty);
    currentQty.qty += 1;
    newProductsInCart.set(product.name, currentQty);
    console.log("line 36 final newProductsInCart: ", newProductsInCart);
    setProductsInCart(newProductsInCart);
  }

  function removeProduct(productMap, productArray) {
    console.log(
      "line12 MainPage, removeProduct function, productMap, productArray: ",
      productMap,
      productArray
    );
    console.log("productArray: ", productArray);
    console.log(
      "MainPage: productMap.get(productArray[0]): ",
      productMap.get(productArray[0])
    );
    productMap.set(productArray[0], productMap.get(productArray[1].qty) - 1);
    setProductsInCart(productMap);
    console.log("line 49 MainPage productMap and setProductsInCart ");
  }

  return (
    <div className="ShoppingPage">
      <h1 style={{ textAlign: "center" }}>My Shopping Cart</h1>
      <div style={{ display: "flex" }}>
        <div style={{ width: "60%" }}>
          <ProductList
            products={products}
            addProduct={addProduct}
          ></ProductList>
        </div>
        <div style={{ width: "40%" }}>
          <ShoppingCart
            productsInCart={productsInCart}
            removeProduct={removeProduct}
          ></ShoppingCart>
        </div>
      </div>
    </div>
  );
};
ShoppingPage.propTypes = {};
export default ShoppingPage;
