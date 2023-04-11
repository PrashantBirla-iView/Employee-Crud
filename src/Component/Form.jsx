// <div
//               className="modal fade"
//               id="exampleModal"
//               tabindex="-1"
//               aria-labelledby="exampleModalLabel"
//               aria-hidden="true"
//             >
//               <div className="modal-dialog modal-lg">
//                 <div className="modal-content">
//                   <div className="modal-header">
//                     <h5
//                       className="modal-title"
//                       id="exampleModalLabel"
//                       style={{ color: "#000" }}
//                     >
//                       Product Info
//                     </h5>
//                     <button
//                       type="button"
//                       className="btn-close"
//                       data-bs-dismiss="modal"
//                       aria-label="Close"
//                     ></button>
//                   </div>
//                   <div className="modal-body ">
//                     <form className="row g-3">
//                       <div className="col-md-6">
//                         <label for="productId" className="form-label">
//                           ID
//                         </label>
//                         <input
//                           type="number"
//                           className="form-control"
//                           id="productId"
//                           name="productId"
//                           min={0}
//                           value={productId}
//                           placeholder="Product ID"
//                           onChange={(e) => setid(e.target.value)}
//                           required
//                         />
//                       </div>
//                       <div className="col-md-6">
//                         <label for="productTitle" className="form-label">
//                           Title
//                         </label>
//                         <input
//                           type="text"
//                           className="form-control"
//                           id="productTitle"
//                           name="productTitle"
//                           value={productTitle}
//                           placeholder="Product Title"
//                           onChange={(e) => settitle(e.target.value)}
//                           required
//                         />
//                       </div>
//                       <div className="col-md-6">
//                         <label for="productPrice" className="form-label">
//                           Price
//                         </label>
//                         <input
//                           type="number"
//                           className="form-control"
//                           id="productPrice"
//                           name="productPrice"
//                           value={productPrice}
//                           min={0}
//                           placeholder="Price"
//                           onChange={(e) => setprice(e.target.value)}
//                           required
//                         />
//                       </div>
//                       <div className="col-md-6">
//                         <div className="btn-group category">
//                           <button
//                             type="button"
//                             class="btn  dropdown-toggle buttons text-white"
//                             data-bs-toggle="dropdown"
//                             aria-expanded="false"
//                           >
//                             {dropCategory}
//                           </button>
//                           <ul className="dropdown-menu">
//                             <li>
//                               <button
//                                 className="dropdown-item"
//                                 href="#"
//                                 onClick={() => {
//                                   setcategory("men's clothing");
//                                   setdropCategory("Men's Clothing");
//                                 }}
//                               >
//                                 Men's Clothing
//                               </button>
//                             </li>
//                             <li>
//                               <button
//                                 className="dropdown-item"
//                                 href="#"
//                                 onClick={() => {
//                                   setcategory("jewelery");
//                                   setdropCategory("Jewelery");
//                                 }}
//                               >
//                                 Jewelery
//                               </button>
//                             </li>
//                             <li>
//                               <button
//                                 className="dropdown-item"
//                                 href="#"
//                                 onClick={() => {
//                                   setcategory("electronics");
//                                   setdropCategory("Electronics");
//                                 }}
//                               >
//                                 Electronics
//                               </button>
//                             </li>
//                             <li>
//                               <button
//                                 className="dropdown-item"
//                                 href="#"
//                                 onClick={() => {
//                                   setcategory("women's clothing");
//                                   setdropCategory("Women's Clothing");
//                                 }}
//                               >
//                                 Women's Clothing
//                               </button>
//                             </li>
//                           </ul>
//                         </div>
//                       </div>
//                       <div className="col-md-6">
//                         <label for="rating" className="form-label">
//                           Rating
//                         </label>
//                         <input
//                           type="number"
//                           className="form-control"
//                           id="rating"
//                           name="rating"
//                           min={0}
//                           max={5}
//                           value={productRating}
//                           placeholder="Rating"
//                           onChange={(e) => setrating(e.target.value)}
//                           required
//                         />
//                       </div>
//                       <div className="col-md-6">
//                         {buttonClicked ? (
//                           <>
//                             <label for="productImage" className="form-label">
//                               Image
//                             </label>
//                             <input
//                               type="url"
//                               className="form-control"
//                               id="productImage"
//                               name="productImage"
//                               placeholder="Image URL"
//                               value={productImage}
//                               onChange={(e) => setimage(e.target.value)}
//                               required
//                             />
//                           </>
//                         ) : (
//                           <>
//                             <img
//                               src={currentProduct?.image}
//                               alt=""
//                               style={{ height: "150px", width: "150px" }}
//                             />
//                             <label for="productImage" className="form-label">
//                               Image
//                             </label>
//                             <input
//                               type="url"
//                               className="form-control"
//                               id="productImage"
//                               name="productImage"
//                               placeholder="Image URL"
//                               value={productImage}
//                               onChange={(e) => setimage(e.target.value)}
//                             />
//                           </>
//                         )}
//                       </div>
//                       <div className="form-floating">
//                         <textarea
//                           className="form-control"
//                           placeholder="Description"
//                           id="description"
//                           name="description"
//                           style={{ height: "100px" }}
//                           value={productDescription}
//                           onChange={(e) => setdescription(e.target.value)}
//                           required
//                         ></textarea>
//                       </div>
//                       <div className="modal-footer">
//                         <button
//                           type="button"
//                           className="btn btn-secondary"
//                           data-bs-dismiss="modal"
//                         >
//                           Close
//                         </button>

//                         <button
//                           type="submit"
//                           className="btn btn-primary"
//                           data-bs-dismiss="modal"
//                           onClick={() =>
//                             buttonClicked
//                               ? addProduct()
//                               : updateProduct(currentProduct?.id)
//                           }
//                         >
//                           {buttonClicked ? "Add Product" : "Update Product"}{" "}
//                         </button>
//                       </div>
//                     </form>
//                   </div>
//                 </div>
//               </div>
//             </div>

// <Formik
//                       initialValues={{ name: "", email: "" }}
//                       onSubmit={handleSubmit}
//                       validationSchema={validationSchema}
//                     >
//                       {({ errors, touched }) => (
//                         <Form>
//                           <label>
//                             ID:
//                             <Field
//                               type="number"
//                               className="form-control"
//                               id="productId"
//                               name="productId"
//                               min={0}
//                               value={productId}
//                               placeholder="Product ID"
//                               onChange={(e) => setid(e.target.value)}
//                             />
//                             <ErrorMessage name="name" component="div" />
//                           </label>
//                           <label>
//                             Title:
//                             <Field
//                               type="text"
//                               className="form-control"
//                               id="productTitle"
//                               name="productTitle"
//                               value={productTitle}
//                               placeholder="Product Title"
//                               onChange={(e) => settitle(e.target.value)}
//                             />
//                             <ErrorMessage name="email" component="div" />
//                           </label>
//                           <label>
//                             Price:
//                             <Field
//                               type="number"
//                               className="form-control"
//                               id="productPrice"
//                               name="productPrice"
//                               value={productPrice}
//                               min={0}
//                               placeholder="Price"
//                               onChange={(e) => setprice(e.target.value)}
//                             />
//                             <ErrorMessage name="email" component="div" />
//                           </label>
//                           <label>
//                             Category:
//                             <Field as="select">
//                               <option
//                                 value="men's clothing"
//                                 onClick={() => {
//                                   setcategory("men's clothing");
//                                   setdropCategory("Men's Clothing");
//                                 }}
//                               >
//                                 Men's Clothing
//                               </option>
//                               <option
//                                 value="jewelery"
//                                 onClick={() => {
//                                   setcategory("jewelery");
//                                   setdropCategory("Jewelery");
//                                 }}
//                               >
//                                 Jewelery
//                               </option>
//                               <option
//                                 value="electronics"
//                                 onClick={() => {
//                                   setcategory("electronics");
//                                   setdropCategory("Electronics");
//                                 }}
//                               >
//                                 Electronics
//                               </option>
//                               <option
//                                 value="women's clothing"
//                                 onClick={() => {
//                                   setcategory("women's clothing");
//                                   setdropCategory("Women's Clothing");
//                                 }}
//                               >
//                                 Women's Clothing
//                               </option>
//                             </Field>
//                             <ErrorMessage name="email" component="div" />
//                           </label>
//                           <label>
//                             Rating:
//                             <Field
//                               type="number"
//                               className="form-control"
//                               id="rating"
//                               name="rating"
//                               min={0}
//                               max={5}
//                               value={productRating}
//                               placeholder="Rating"
//                               onChange={(e) => setrating(e.target.value)}
//                             />
//                             <ErrorMessage name="email" component="div" />
//                           </label>
//                           <label>
//                             Image:
//                             {buttonClicked ? (
//                               <Field
//                                 type="url"
//                                 className="form-control"
//                                 id="productImage"
//                                 name="productImage"
//                                 placeholder="Image URL"
//                                 value={productImage}
//                                 onChange={(e) => setimage(e.target.value)}
//                               />
//                             ) : (
//                               <>
//                                 <Field
//                                   type="image"
//                                   src={currentProduct?.image}
//                                   style={{ height: "150px", width: "150px" }}
//                                 />
//                                 <Field
//                                   type="url"
//                                   className="form-control"
//                                   id="productImage"
//                                   name="productImage"
//                                   placeholder="Image URL"
//                                   value={productImage}
//                                   onChange={(e) => setimage(e.target.value)}
//                                 />
//                               </>
//                             )}
//                             <ErrorMessage name="email" component="div" />
//                           </label>
//                           <label>
//                             Description:
//                             <Field
//                               as="textarea"
//                               placeholder="Description"
//                               id="description"
//                               name="description"
//                               style={{ height: "100px" }}
//                               value={productDescription}
//                               onChange={(e) => setdescription(e.target.value)}
//                             />
//                             <ErrorMessage name="email" component="div" />
//                           </label>

//                           <button type="submit">Submit</button>
//                         </Form>
//                       )}
//                     </Formik>
