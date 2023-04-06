import React, { useEffect, useState } from "react";
import "../CRUD/Crud.css";
import "../CRUD/Card.css";
import axios from "axios";

function Crud() {
  const [product, setProduct] = useState([]);
  const [dropCategory, setdropCategory] = useState("Sort-by-category");
  const [dropLimit, setdropLimit] = useState("Limit");
  const [sort, setSort] = useState(true);
  const [currentProduct, setCurrentProduct] = useState();
  const [productTitle, settitle] = useState("");
  const [productPrice, setprice] = useState("");
  const [productCategory, setcategory] = useState("");
  const [productDescription, setdescription] = useState("");
  const [productImage, setimage] = useState("");
  const [productRating, setrating] = useState("");
  const [productRatingCount, setproductRatingCount] = useState("");
  const [productId, setid] = useState("");
  const [productDisplay, setproductDisplay] = useState(5);
  const [buttonClicked, setbuttonClicked] = useState(false);
  const [scrollBar, setscrollBar] = useState();

  const fetchData = async () => {
    const result = await axios.get("http://localhost:3004/data");
    setProduct(result.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // const displayProduct = () => {
  //   const html = document.documentElement;
  //   const height = html.getBoundingClientRect().height;

  //   if (window.scrollY >= height) {
  //     console.log("Height", height);
  //     setTimeout(() => {
  //       setproductDisplay(productDisplay + 3);
  //     }, 1500);
  //   } else {
  //   }
  // };

  useEffect(() => {
    // displayProduct();
    // window.addEventListener("scroll", displayProduct);
    // const html = document.documentElement;
    // const height = html.getBoundingClientRect().height;

    // console.log("height", height);
    setTimeout(() => {
      setproductDisplay(productDisplay + 3);
    }, 1500);
  }, [productDisplay]);

  const deleteProduct = async (id) => {
    await axios.delete(`http://localhost:3004/data/${id}`);
    fetchData();
  };

  const handleClick = (prod) => {
    setCurrentProduct(prod);
    setid(prod.id);
    settitle(prod.title);
    setprice(prod.price);
    setcategory(prod.category);
    setrating(prod?.rating?.rate);
    setproductRatingCount(prod?.rating?.count);
    setimage(prod.image);
    setdescription(prod.description);
    // console.log(prod);
  };

  const updateProduct = async (id) => {
    await axios.put(`http://localhost:3004/data/${id}`, {
      id: productId,
      title: productTitle,
      price: productPrice,
      description: productDescription,
      category: productCategory,
      image: productImage,
      rating: { rate: productRating, count: productRatingCount },
    });
  };

  const Sort = async (category, categoryName) => {
    setdropCategory(categoryName);
    // fetch(`https://fakestoreapi.com/products/category/${category}`)
    //   .then((res) => res.json())
    //   .then((res) => setProduct(res))
    //   .then((json) => console.log(json));
    const result = await axios.get("http://localhost:3004/data");
    // setProduct(result.data);
    const cat = result.data.filter((item) => item.category === category);
    setProduct(cat);
  };

  const Limit = (limit) => {
    setdropLimit(limit);
    fetch(`https://fakestoreapi.com/products?limit=${limit}`)
      .then((res) => res.json())
      .then((res) => setProduct(res))
      .then((json) => console.log(json));
  };

  const sortProductList = (sortProd) => {
    setSort(!sort);
    fetch(`https://fakestoreapi.com/products?sort=${sortProd}`)
      .then((res) => res.json())
      .then((res) => setProduct(res))
      .then((json) => console.log(json));
  };

  const addProduct = async () => {
    axios.post(`http://localhost:3004/data`, {
      id: productId,
      title: productTitle,
      price: productPrice,
      description: productDescription,
      category: productCategory,
      image: productImage,
      rating: { rate: productRating, count: productRatingCount },
    });
  };

  const handleAddProduct = () => {
    console.log("Helloooooo");
    setid("");
    settitle("");
    setprice("");
    setcategory("");
    setimage("");
    setrating("");
    setproductRatingCount("");
    setdescription("");
    setbuttonClicked(true);
  };

  return (
    <div className="main">
      <div className="container">
        <div className="row">
          <div className="product-table">
            <div className="btn btn-group mt-5 d-flex align-item-center justify-content-end">
              <div className="btn-group category">
                <button
                  type="button"
                  class="btn btn-success dropdown-toggle buttons"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {dropCategory}
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <button
                      className="dropdown-item"
                      href="#"
                      onClick={() => Sort("men's clothing", "Men's Clothing")}
                    >
                      Men's Clothing
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      href="#"
                      onClick={() => Sort("jewelery", "Jewlery")}
                    >
                      Jewlery
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      href="#"
                      onClick={() => Sort("electronics", "Electronics")}
                    >
                      Electronics
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      href="#"
                      onClick={() =>
                        Sort("women's clothing", "Women's Clothing")
                      }
                    >
                      Women's Clothing
                    </button>
                  </li>
                </ul>
              </div>
              &nbsp; &nbsp; &nbsp;
              <div className="btn-group limit">
                <button
                  type="button"
                  className="btn btn-success dropdown-toggle buttons"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {dropLimit}
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <button
                      className="dropdown-item"
                      href="#"
                      onClick={() => Limit("5")}
                    >
                      5
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      href="#"
                      onClick={() => Limit("10")}
                    >
                      10
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      href="#"
                      onClick={() => Limit("20")}
                    >
                      20
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      href="#"
                      onClick={() => Limit("50")}
                    >
                      50
                    </button>
                  </li>
                </ul>
              </div>
              &nbsp; &nbsp; &nbsp;
              <div className="btn-group sort-btn sort-product">
                <button
                  className="btn btn-success buttons"
                  type="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  onClick={() =>
                    sort ? sortProductList("desc") : sortProductList("asc")
                  }
                >
                  Sort&nbsp;&nbsp;
                  <span className="icons">
                    <i className="fa-solid fa-sort-down"></i>
                    <i className="fa-solid fa-sort-up"></i>
                  </span>
                </button>
              </div>
              &nbsp; &nbsp; &nbsp;
              <div className="btn-group add">
                <button
                  type="button"
                  className="btn btn-success buttons"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={handleAddProduct}
                >
                  Add
                </button>
              </div>
            </div>

            <div
              className="modal fade"
              id="exampleModal"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5
                      className="modal-title"
                      id="exampleModalLabel"
                      style={{ color: "#000" }}
                    >
                      Product Info
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body ">
                    <form className="row g-3">
                      <div className="col-md-6">
                        <label for="productId" className="form-label">
                          ID
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="productId"
                          name="productId"
                          defaultValue={buttonClicked ? "" : currentProduct?.id}
                          placeholder="Product ID"
                          onChange={(e) => setid(e.target.value)}
                        />
                      </div>
                      <div className="col-md-6">
                        <label for="productTitle" className="form-label">
                          Title
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="productTitle"
                          name="productTitle"
                          defaultValue={
                            buttonClicked ? "" : currentProduct?.title
                          }
                          placeholder="Product Title"
                          onChange={(e) => settitle(e.target.value)}
                        />
                      </div>
                      <div className="col-md-6">
                        <label for="productPrice" className="form-label">
                          Price
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="productPrice"
                          name="productPrice"
                          defaultValue={
                            buttonClicked ? "" : currentProduct?.price
                          }
                          placeholder="Price"
                          onChange={(e) => setprice(e.target.value)}
                        />
                      </div>
                      <div className="col-md-6">
                        <label for="productCategory" className="form-label">
                          Category
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="productCategory"
                          name="productCategory"
                          defaultValue={
                            buttonClicked ? "" : currentProduct?.category
                          }
                          placeholder="Category"
                          onChange={(e) => setcategory(e.target.value)}
                        />
                      </div>
                      <div className="col-md-6">
                        <label for="rating" className="form-label">
                          Rating
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="rating"
                          name="rating"
                          defaultValue={
                            buttonClicked ? "" : currentProduct?.rating?.rate
                          }
                          placeholder="Rating"
                          onChange={(e) => setrating(e.target.value)}
                        />
                      </div>
                      <div className="col-md-6">
                        {buttonClicked ? (
                          <>
                            <label for="rating" className="form-label">
                              Rating
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="rating"
                              name="rating"
                              placeholder="Image URL"
                              onChange={(e) => setimage(e.target.value)}
                            />
                          </>
                        ) : (
                          <img
                            src={currentProduct?.image}
                            alt=""
                            style={{ height: "150px", width: "150px" }}
                          />
                        )}
                      </div>
                      <div className="form-floating">
                        <textarea
                          className="form-control"
                          placeholder="Description"
                          id="description"
                          name="description"
                          style={{ height: "100px" }}
                          defaultValue={
                            buttonClicked ? "" : currentProduct?.description
                          }
                          onChange={(e) => setdescription(e.target.value)}
                        ></textarea>
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>

                    <button
                      type="button"
                      className="btn btn-primary"
                      data-bs-dismiss="modal"
                      onClick={() =>
                        buttonClicked
                          ? addProduct()
                          : updateProduct(currentProduct?.id)
                      }
                    >
                      {buttonClicked ? "Add Product" : "Update Product"}{" "}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-container">
              {product.map((prod, index) =>
                index < productDisplay ? (
                  <>
                    <div className="card">
                      <div className="imgBx">
                        <img src={prod.image} alt="" />
                      </div>
                      <div className="action-buttons">
                        <h6>Price : ${prod.price}</h6>

                        <button
                          type="button"
                          class="btn btn-info"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          onClick={() => handleClick(prod)}
                        >
                          Update
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteProduct(prod.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  ""
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Crud;
