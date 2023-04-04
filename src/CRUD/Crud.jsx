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
  const [productId, setid] = useState("");
  const fetchData = async () => {
    const result = await axios.get("http://localhost:3004/data");
    setProduct(result.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteProduct = async (id) => {
    await axios.delete(`http://localhost:3004/data/${id}`);
    fetchData();
  };

  const handleClick = (prod) => {
    setCurrentProduct(prod);
    settitle(prod.title);
    setprice(prod.price);
    setcategory(prod.category);
    setdescription(prod.description);
    setimage(prod.image);
    setrating(prod.rating);
    setid(prod.id);
    console.log(prod);
  };

  const updateProduct = async (id) => {
    await axios.put(`http://localhost:3004/data/${id}`, {
      id: productId,
      title: productTitle,
      price: productPrice,
      description: productDescription,
      category: productCategory,
      image: productImage,
      ratings: productRating,
    });
  };

  // useEffect(() => {
  //   // fetchData();
  //   //   fetch("data.json")
  //   //     .then((response) => response.json())
  //   //     .then((data) => console.log(data))
  //   // .then((jsonData) => setProduct(jsonData))
  //   //     .catch((error) => console.error(error));
  //   setProduct(data);
  // }, []);

  const Sort = (category, categoryName) => {
    setdropCategory(categoryName);
    fetch(`https://fakestoreapi.com/products/category/${category}`)
      .then((res) => res.json())
      .then((res) => setProduct(res))
      .then((json) => console.log(json));
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

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="product-table">
            <h1 className="text-center pb-5">Product's Detail</h1>
            <div className="btn btn-group mb-5 d-flex align-item-center justify-content-end">
              <div className="category">
                <button
                  type="button"
                  class="btn btn-info dropdown-toggle"
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
                  className="btn btn-info dropdown-toggle"
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
                  className="btn btn-info"
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
            </div>

            <div
              class="modal fade"
              id="exampleModal"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                      Product Info
                    </h5>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    <form className="">
                      <div className="col-md-6">
                        <label for="productId" className="form-label">
                          ID
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="productId"
                          name="productId"
                          defaultValue={currentProduct?.id}
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
                          defaultValue={currentProduct?.title}
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
                          defaultValue={currentProduct?.price}
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
                          defaultValue={currentProduct?.category}
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
                          defaultValue={currentProduct?.rating?.rate}
                        />
                      </div>
                      <div className="col-md-6">
                        <img
                          src={currentProduct?.image}
                          alt=""
                          style={{ height: "150px", width: "150px" }}
                        />
                      </div>
                      <div className="form-floating">
                        <textarea
                          className="form-control"
                          placeholder="Leave a comment here"
                          id="description"
                          name="description"
                          style={{ height: "100px" }}
                          defaultValue={currentProduct?.description}
                          onChange={(e) => setdescription(e.target.value)}
                        ></textarea>
                      </div>
                    </form>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>

                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => updateProduct(currentProduct?.id)}
                    >
                      Update Product
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-container">
              {product.map((prod) => (
                <div className="card">
                  <div className="imgBx">
                    <img src={prod.image} alt="" />
                  </div>
                  <div className="action-buttons">
                    <h6>Price : ${prod.price}</h6>
                    <button
                      type="button"
                      class="btn btn-success"
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
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Crud;
