import React, { useEffect, useState } from "react";
import "../CRUD/Crud.css";

function Crud() {
  const [product, setProduct] = useState([]);
  const [showInfo, setShowInfo] = useState(false);
  const [currentProduct, setCurrentProduct] = useState();
  // const [Id, setId] = useState(currentProduct?.id);
  const [title, settitle] = useState(currentProduct?.title);
  const [price, setprice] = useState(currentProduct?.price);
  const [category, setcategory] = useState(currentProduct?.category);
  const [image, setimage] = useState(currentProduct?.image);
  // const [rating, setrating] = useState(currentProduct?.rating);
  const [description, setdescription] = useState(currentProduct?.description);

  const getProductInfo = () => {
    // setId(currentProduct.id);
    settitle(currentProduct.title);
    setprice(currentProduct.price);
    setcategory(currentProduct.category);
    // setrating(currentProduct.rating.rate);
    setdescription(currentProduct.description);
    setimage(currentProduct.image);
  };

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

    getProductInfo();
    let formData = {
      title,
      price,
      description,
      image,
      category,
    };
    fetch(`https://fakestoreapi.com/products/${currentProduct.id}`, {
      method: "PUT",
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((json) => console.log(json));
    console.warn(formData);
  };

  useEffect(() => {
    fetchData();
  }, []);

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
                      // onClick={(e) => setId(e.target.value)}
                      // onChange={(e) => setId(e.target.value)}
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
                      // onChange={handleInputChange}
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
                      // onChange={handleInputChange}
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
                      // onChange={handleInputChange}
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
                      // onChange={(e) => setrating(e.target.value)}
                      // onChange={handleInputChange}
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
                      // onChange={handleInputChange}
                    ></textarea>
                  </div>
                  <div className="col-12">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={updateProduct}
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
