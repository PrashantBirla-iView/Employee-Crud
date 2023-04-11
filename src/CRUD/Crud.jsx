import React, { useEffect, useState } from "react";
import "../CRUD/Card.css";
import axios from "axios";
import FadeLoader from "react-spinners/FadeLoader";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  productId: Yup.string().required("Product ID is required"),
  productTitle: Yup.string().required("Title is required"),
  productPrice: Yup.string().required("Price is required"),
  productCategory: Yup.string().required("Select a category from dropdown"),
  productRating: Yup.string().required("Rating is required"),
  productImage: Yup.string().required("Enter url for the image"),
  productDescription: Yup.string().required("Product description is required"),
});

function Crud() {
  const [product, setProduct] = useState([]);
  const [dropCategory, setdropCategory] = useState("Set-Category");
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
  const [buttonClicked, setbuttonClicked] = useState();
  const [loading, setloading] = useState(false);
  const [scrollBar, setscrollBar] = useState(100);
  const [productUpdated, setproductUpdated] = useState(false);
  let productID;

  const override = {
    position: "fixed",
    left: "0",
    top: "0%",
    right: "0",
    bottom: "0",
    margin: "auto",
  };

  useEffect(() => {
    console.log("hello!!");
    fetchData();
  }, [productUpdated]);

  useEffect(() => {
    function displayProduct() {
      if (window.scrollY >= scrollBar) {
        setloading(true);
        setTimeout(() => {
          setproductDisplay(productDisplay + 5);
          setloading(false);
        }, 1000);
        setscrollBar(
          document.documentElement.getBoundingClientRect().height - 500
        );
      }
    }

    window.addEventListener("scroll", displayProduct);

    return () => {
      window.removeEventListener("scroll", displayProduct);
    };
  }, [productDisplay, scrollBar]);

  const fetchData = async () => {
    const result = await axios.get("http://localhost:3004/data");
    setProduct(result.data);
  };

  const handleDelete = (id) => {
    productID = id;
  };

  const deleteProduct = async () => {
    // const result = window.confirm("Do you want to delete");
    await axios.delete(`http://localhost:3004/data/${productID}`);
    fetchData();
  };

  const handleClick = (prod) => {
    setbuttonClicked(false);
    console.log("handleClick", buttonClicked);
    setCurrentProduct(prod);
    setid(prod?.id);
    settitle(prod?.title);
    setprice(prod?.price);
    setcategory(prod?.category);
    setdropCategory(prod?.category);
    setrating(prod?.rating?.rate);
    setproductRatingCount(prod?.rating?.count);
    setimage(prod?.image);
    setdescription(prod?.description);
    console.log(prod);
  };

  const updateProduct = async (id) => {
    const updatedProduct = await axios.put(`http://localhost:3004/data/${id}`, {
      id: productId,
      title: productTitle,
      price: productPrice,
      description: productDescription,
      category: productCategory,
      image: productImage,
      rating: { rate: productRating, count: productRatingCount },
    });
    // console.log("Update Product Button", buttonClicked);
    setProduct((prev) => [...prev, updatedProduct]);
    // setbuttonClicked(true);
    setproductUpdated(true);
    alert("Product Updated Successfully!!");
  };

  const Sort = async (category, categoryName) => {
    setdropCategory(categoryName);
    const result = await axios.get("http://localhost:3004/data");
    const cat = result.data.filter((item) => item.category === category);
    setProduct(cat);
  };

  const sortProductList = (sortProd) => {
    let descending = [];
    let ascending = [];
    descending = [...product].sort((a, b) => b.id - a.id);
    ascending = [...product].sort((a, b) => a.id - b.id);
    sort ? setProduct(descending) : setProduct(ascending);
    setSort(!sort);
  };

  const addProduct = async () => {
    setbuttonClicked(false);
    setproductUpdated(true);
    const newProduct = axios.post(`http://localhost:3004/data`, {
      id: productId,
      title: productTitle,
      price: productPrice,
      description: productDescription,
      category: productCategory,
      image: productImage,
      rating: { rate: productRating, count: productRatingCount },
    });
    // console.log("Add Product Button", buttonClicked);
    setProduct((prev) => [...prev, newProduct]);
    alert("Product Added Successfully!!");
  };

  const handleAddProduct = () => {
    setbuttonClicked(true);
    setid("");
    settitle("");
    setprice("");
    setcategory("");
    setimage("");
    setrating("");
    setproductRatingCount("");
    setdescription("");
    console.log("handleAddProduct", buttonClicked);
  };

  const productInfo = (productINFO) => {
    console.log("Hellloooo!!");
    console.log(productINFO);
    setid(productINFO?.id);
    settitle(productINFO?.title);
    setprice(productINFO?.price);
    setcategory(productINFO?.category);
    setrating(productINFO?.rating?.rate);
    setimage(productINFO?.image);
    setdescription(productINFO?.description);
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
                  class="btn  dropdown-toggle buttons text-white"
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
              <div className="btn-group sort-btn sort-product">
                <button
                  className="btn  buttons text-white"
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
                  className="btn buttons text-white"
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
                          type="number"
                          className="form-control"
                          id="productId"
                          name="productId"
                          min={0}
                          value={productId}
                          placeholder="Product ID"
                          onChange={(e) => setid(e.target.value)}
                          required
                          autoComplete="off"
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
                          value={productTitle}
                          placeholder="Product Title"
                          onChange={(e) => settitle(e.target.value)}
                          required
                          autoComplete="off"
                        />
                      </div>
                      <div className="col-md-6">
                        <label for="productPrice" className="form-label">
                          Price
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="productPrice"
                          name="productPrice"
                          value={productPrice}
                          min={0}
                          placeholder="Price"
                          onChange={(e) => setprice(e.target.value)}
                          required
                          autoComplete="off"
                        />
                      </div>
                      <div className="col-md-6">
                        <div className="btn-group category">
                          <button
                            type="button"
                            class="btn  dropdown-toggle buttons text-white"
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
                                onClick={() => {
                                  setcategory("men's clothing");
                                  setdropCategory("Men's Clothing");
                                }}
                              >
                                Men's Clothing
                              </button>
                            </li>
                            <li>
                              <button
                                className="dropdown-item"
                                href="#"
                                onClick={() => {
                                  setcategory("jewelery");
                                  setdropCategory("Jewelery");
                                }}
                              >
                                Jewelery
                              </button>
                            </li>
                            <li>
                              <button
                                className="dropdown-item"
                                href="#"
                                onClick={() => {
                                  setcategory("electronics");
                                  setdropCategory("Electronics");
                                }}
                              >
                                Electronics
                              </button>
                            </li>
                            <li>
                              <button
                                className="dropdown-item"
                                href="#"
                                onClick={() => {
                                  setcategory("women's clothing");
                                  setdropCategory("Women's Clothing");
                                }}
                              >
                                Women's Clothing
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <label for="rating" className="form-label">
                          Rating
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="rating"
                          name="rating"
                          min={0}
                          max={5}
                          value={productRating}
                          placeholder="Rating"
                          onChange={(e) => setrating(e.target.value)}
                          required
                          autoComplete="off"
                        />
                      </div>
                      <div className="col-md-6">
                        {buttonClicked ? (
                          <>
                            <label for="productImage" className="form-label">
                              Image
                            </label>
                            <input
                              type="url"
                              className="form-control"
                              id="productImage"
                              name="productImage"
                              placeholder="Image URL"
                              value={productImage}
                              onChange={(e) => setimage(e.target.value)}
                              required
                              autoComplete="off"
                            />
                          </>
                        ) : (
                          <>
                            <img
                              src={productImage}
                              alt=""
                              style={{ height: "150px", width: "150px" }}
                            />
                            <label for="productImage" className="form-label">
                              Image
                            </label>
                            <input
                              type="url"
                              className="form-control"
                              id="productImage"
                              name="productImage"
                              placeholder="Image URL"
                              value={productImage}
                              onChange={(e) => setimage(e.target.value)}
                            />
                          </>
                        )}
                      </div>
                      <div className="form-floating">
                        <textarea
                          className="form-control"
                          placeholder="Description"
                          id="description"
                          name="description"
                          style={{ height: "100px" }}
                          value={productDescription}
                          onChange={(e) => setdescription(e.target.value)}
                          required
                          autoComplete="off"
                        ></textarea>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                          onClick={() => setdropCategory("Set-Category")}
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
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <div
              class="modal fade"
              id="deleteModal"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content text-primary">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                      Confirm
                    </h5>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    Do you want to delete this product?
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      No
                    </button>
                    <button
                      type="button"
                      class="btn btn-primary"
                      data-bs-dismiss="modal"
                      onClick={deleteProduct}
                    >
                      Yes
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div
              class="modal fade"
              id="productInfoModal"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog ">
                <div class="modal-content text-dark productInfoModal">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                      {productTitle}
                    </h5>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body row">
                    <div className="product-image col-md-6">
                      <img
                        src={productImage}
                        alt=""
                        height={"200px"}
                        width={"200px"}
                      />
                    </div>
                    <div className="product-info col-md-6 pt-3">
                      <h6>Product ID: {productId}</h6>
                      <h6>Product Price: {productPrice}</h6>
                      <h6>Product Category: {productCategory}</h6>
                      <h6>Product Rating: {productRating}</h6>
                    </div>
                    <h6 className="pt-3">Product Description: </h6>{" "}
                    <span>{productDescription}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-container py-5">
              {product.map((prod, index) =>
                index < productDisplay ? (
                  <>
                    <div
                      className="card"
                      type="button"
                      key={index}
                      data-bs-toggle="modal"
                      data-bs-target="#productInfoModal"
                      onClick={() => productInfo(prod)}
                    >
                      <div className="imgBx">
                        <img src={prod.image} alt="" />
                      </div>
                      <div className="action-buttons">
                        <h6>Price : ${prod.price}</h6>

                        <button
                          type="button"
                          class="btn btn-info text-white"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          onClick={() => handleClick(prod)}
                        >
                          Update
                        </button>

                        <button
                          type="button"
                          class="btn btn-danger"
                          data-bs-toggle="modal"
                          data-bs-target="#deleteModal"
                          onClick={() => handleDelete(prod.id)}
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
            <FadeLoader
              color={"#264653"}
              loading={loading}
              cssOverride={override}
              size={100}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Crud;
