import React, { createContext, useContext, useEffect, useState } from "react";
const CartContext = createContext(null);
const CartContext1 = createContext(null);
const CartContext2 = createContext(null);
export default function ShoppingComponent() {
  const [products, setProducts] = useState([]);
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(true);
  const [cartProducts, setCartProducts] = useState([]);
  const [cart, setCart] = useState(0);
  const [amount, setAmount] = useState(0);
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(true);
      });
  }, []);
  const [category, setCategory] = useState("all");
  const filteredproducts = products.filter((product) => {
    if (category === "all") {
      return true;
    } else {
      return product.category === category;
    }
  });
  function handleCategory(e) {
    setCategory(e.target.dataset.value);
  }
  function handleAmount() {
    cartProducts.map((item) => {
      setAmount(amount + item.price);
    });
  }

  return (
    <div>
      <CartContext.Provider value={[cart, setCart]}>
        <CartContext1.Provider value={[cartProducts, setCartProducts]}>
          <CartContext2.Provider value={[amount, setAmount]}>
            {loading ? (
              <div className="text-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <nav className="navbar navbar-expand-lg bg-info">
                <div className="container-fluid">
                  <div className="collapse navbar-collapse justify-content-center">
                    <ul className="navbar-nav">
                      <li className="nav-item">
                        <a className="nav-link active text-white">Home</a>
                      </li>
                      <li className="nav-item dropdown ">
                        <a
                          className="nav-link dropdown-toggle text-white"
                          role="button"
                          data-bs-toggle="dropdown"
                        >
                          Categories
                        </a>
                        <ul className="dropdown-menu">
                          <li
                            className="dropdown-item"
                            data-value="all"
                            onClick={handleCategory}
                          >
                            All
                          </li>
                          <li
                            className="dropdown-item"
                            data-value="women's clothing"
                            onClick={handleCategory}
                          >
                            Women's Clothing
                          </li>
                          <li
                            className="dropdown-item"
                            data-value="men's clothing"
                            onClick={handleCategory}
                          >
                            Men's Clothing
                          </li>
                          <li
                            className="dropdown-item"
                            data-value="jewelery"
                            onClick={handleCategory}
                          >
                            Jewelery
                          </li>
                          <li
                            className="dropdown-item"
                            data-value="electronics"
                            onClick={handleCategory}
                          >
                            Electronics
                          </li>
                        </ul>
                      </li>
                      <div className="justify-content-end">
                        <li className="nav-item text-white mt-2 ">
                          <button
                            className="btn btn-dark"
                            data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop"
                            style={{ borderRadius: "20%" }}
                          >
                            Cart [{cart}]
                            {cart > 0 ? (
                              <span className="bi bi-cart-fill p-2"></span>
                            ) : (
                              <span className="bi bi-cart p-2"></span>
                            )}
                          </button>
                          <div
                            className="modal fade"
                            id="staticBackdrop"
                            data-bs-keyboard="false"
                            tabindex="-1"
                            aria-labelledby="staticBackdropLabel"
                            aria-hidden="true"
                          >
                            {/*......Modal......*/}
                            <div className="modal-dialog modal-dialog-scrollable">
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h3
                                    className="modal-title text-dark"
                                    id="staticBackdropLabel"
                                  >
                                    Your Cart
                                  </h3>
                                  <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                  ></button>
                                </div>
                                <div className="modal-body">
                                  {cart == 0 ? (
                                    <p>
                                      <h4 className="text-dark">
                                        Your cart is empty!!!
                                      </h4>
                                    </p>
                                  ) : (
                                    <h4></h4>
                                  )}
                                  {cartProducts.map((item) => (
                                    <div
                                      key={item.id}
                                      className="container-fluid"
                                    >
                                      <p className="text-dark">
                                        <h5>{item.title}</h5>
                                      </p>
                                      <p className="text-dark">
                                        <h5 className="text-dark">
                                          Price:${item.price}
                                        </h5>
                                      </p>
                                      <hr className="text-dark" />
                                    </div>
                                  ))}
                                  {cart > 0 ? (
                                    <p className="text-dark">
                                      <h5>Total Payable Amount:{amount}</h5>
                                    </p>
                                  ) : (
                                    <h4></h4>
                                  )}
                                </div>
                                <div className="modal-footer">
                                  <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                  >
                                    Close
                                  </button>
                                  <button type="button" class="btn btn-primary">
                                    Pay Now
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      </div>
                    </ul>
                  </div>
                </div>
              </nav>
            )}
            <header>
              <h2 className="text-center bg-body-tertiary mt-3">
                Explore Our Exciting Products!!!
              </h2>
            </header>
            <div className="container">
              <div className="row">
                {filteredproducts.map((product) => (
                  <div className="col-4" key={product.id}>
                    <div className="card">
                      <img
                        src={product.image}
                        alt=""
                        height="250"
                        className="card-img-top"
                      />
                      <div className="card-body">
                        <h5 className="card-title">{product.title}</h5>
                        <p className="card-body">{product.description}</p>
                        <p className="card-text">Price:${product.price}</p>
                        <p className="card-text">
                          Rating:{product.rating.rate}
                          <span
                            className="bi bi-star-fill"
                            style={{ color: "green" }}
                          ></span>
                          [{product.rating.count}]
                        </p>
                        <p className="card-footer">
                          <CartButton product={product} />
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CartContext2.Provider>
        </CartContext1.Provider>
      </CartContext.Provider>
    </div>
  );
}
const AddContext = createContext(null);
function CartButton(props) {
  const [isAdded, setIsAdded] = useState(false);
  const [cartProducts, setCartProducts] = useContext(CartContext1);
  const [cart, setCart] = useContext(CartContext);
  const [amount, setAmount] = useContext(CartContext2);
  function handleChange(e) {
    setIsAdded(!isAdded);
    setCart(cart + 1);
    cartProducts.push(props.product);
    setCartProducts([...cartProducts]);
    setAmount(Number(amount + Number(props.product.price)));
  }
  return (
    <div className="d-flex">
      <AddContext.Provider value={[isAdded, setIsAdded]}>
        <CartContext1.Provider value={[cartProducts, setCartProducts]}>
          <CartContext2.Provider value={[amount, setAmount]}>
            <button
              disabled={isAdded}
              enable={!isAdded}
              className="btn btn-warning"
              onClick={handleChange}
            >
              {isAdded ? "Added to Cart" : "Add to Cart"}
              {isAdded ? (
                <span className="bi bi-cart-fill p-2"></span>
              ) : (
                <span className="bi bi-cart-plus p-2"></span>
              )}
            </button>
            {isAdded && <RemoveButton product={props.product} />}
          </CartContext2.Provider>
        </CartContext1.Provider>
      </AddContext.Provider>
    </div>
  );
}
function RemoveButton(props) {
  const [isAdded, setIsAdded] = useContext(AddContext);
  const [cart, setCart] = useContext(CartContext);
  const [cartProducts, setCartProducts] = useContext(CartContext1);
  const [amount, setAmount] = useContext(CartContext2);
  function handleRemove(e) {
    setIsAdded(!isAdded);
    setCart(cart - 1);
    let n = cartProducts.findIndex((item) => {
      return item.id == props.product.id;
    });
    if (n === -1) {
      alert(`Ooops!!! Product  ${props.product.category} not in the store`);
    } else {
      cartProducts.splice(n, 1);
      setCartProducts([...cartProducts]);
    }
    setAmount((amount - props.product.price).toFixed(2));
  }
  return (
    <div>
      <button className="btn btn-danger m-1" onClick={handleRemove}>
        Remove from Cart<span className="bi bi-cart-x p-1"></span>
      </button>
    </div>
  );
}
