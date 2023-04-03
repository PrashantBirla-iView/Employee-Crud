import React, { useEffect, useState } from "react";
import "../CRUD/Crud.css";
import "../CRUD/Card.css";

function Crud() {
  const [product, setProduct] = useState([]);
  const [dropCategory, setdropCategory] = useState("Sort-by-category");
  const [dropLimit, setdropLimit] = useState("Limit");
  const [sort, setSort] = useState(true);
  const [showInfo, setShowInfo] = useState(false);
  const [currentProduct, setCurrentProduct] = useState();
  const [productTitle, settitle] = useState(currentProduct?.title);
  const [productPrice, setprice] = useState(currentProduct?.price);
  const [productCategory, setcategory] = useState(currentProduct?.category);
  const [productDescription, setdescription] = useState(
    currentProduct?.description
  );
  const [productImage, setimage] = useState(currentProduct?.image);

  const fetchData = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const jsonData = await response.json();
      console.log(jsonData);
      setProduct(jsonData);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProduct = (id) => {
    fetch(`https://fakestoreapi.com/products/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((json) => console.log(json));

    setProduct(product.filter((item) => item.id !== id));
  };

  const handleClick = (prod) => {
    setShowInfo(true);
    setCurrentProduct(prod);
  };

  const updateProduct = (event) => {
    event.preventDefault();
    // getProductInfo();

    let formData = {
      title: productTitle,
      price: productPrice,
      category: productCategory,
      description: productDescription,
      image: productImage,
    };
    fetch(`https://fakestoreapi.com/products/${currentProduct.id}`, {
      method: "PUT",
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((json) => console.log(json));
    console.warn(formData);
    console.log(currentProduct);
    console.log("Title", currentProduct.title);
    console.log("Price", currentProduct.price);
  };

  useEffect(() => {
    fetchData();
  }, []);

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
          {showInfo ? (
            <div className="info">
              <div className="product-info">
                <h1 className="text-center">Product Info</h1>
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
                      defaultValue={currentProduct.id}
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
                      defaultValue={currentProduct.title}
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
                      defaultValue={currentProduct.price}
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
                      defaultValue={currentProduct.category}
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
                      defaultValue={currentProduct.rating.rate}
                    />
                  </div>
                  <div className="col-md-6">
                    <img
                      src={currentProduct.image}
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
                      defaultValue={currentProduct.description}
                      onChange={(e) => setdescription(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="col-12">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={(e) => updateProduct(e)}
                    >
                      Update Product
                    </button>
                  </div>
                </form>
              </div>
            </div>
          ) : (
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

              <div className="card-container">
                {product.map((prod) => (
                  <div className="card">
                    <div className="imgBx">
                      <img src={prod.image} alt="" />
                    </div>
                    <h6>Price : ${prod.price}</h6>
                  </div>
                ))}
              </div>

              <table
                className="table table-bordered table-hover"
                style={{ cursor: "pointer" }}
              >
                <tbody>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Update</th>
                    <th>Delete</th>
                  </tr>
                  {product.map((prod) => (
                    <tr>
                      <td>{prod.id}</td>
                      <td>{prod.title}</td>
                      <td>{prod.category}</td>
                      <td>{prod.price}</td>
                      <td>
                        <button
                          className="btn btn-success"
                          onClick={() => {
                            handleClick(prod);
                          }}
                        >
                          Update
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteProduct(prod.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Crud;
