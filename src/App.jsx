import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    try {
      await axios.post("http://localhost:5000/products", formData);
      alert("Product added successfully!");
      fetchProducts(); // Refresh the product list
      setName("");
      setDescription("");
      setPrice("");
      setImages([]);
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Error adding product!");
    }
  };

  const handleImageChange = (e) => {
    setImages(e.target.files);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Product Management</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "10px" }}>
          <label>Name: </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Description: </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Price: </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Images: </label>
          <input type="file" multiple onChange={handleImageChange} />
        </div>
        <button type="submit">Add Product</button>
      </form>

      <h2>Product List</h2>
      <div>
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              style={{
                border: "1px solid #ccc",
                marginBottom: "10px",
                padding: "10px",
              }}
            >
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>
                <strong>Price:</strong> ${product.price}
              </p>
              <div>
                {product.imageUrls.map((url, index) => (
                  <img
                    key={index}
                    src={`http://localhost:5000${url}`}
                    alt={product.name}
                    style={{ width: "100px", marginRight: "10px" }}
                  />
                ))}
              </div>
            </div>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </div>
  );
};

export default App;

//////////
////////////////////
//////////////////////////////
// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const App = () => {
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [price, setPrice] = useState("");
//   const [image, setImage] = useState(null);
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/products");
//       setProducts(response.data);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("description", description);
//     formData.append("price", price);
//     formData.append("image", image);

//     try {
//       await axios.post("http://localhost:5000/products", formData);
//       alert("Product added successfully!");
//       fetchProducts(); // Refresh the product list
//       setName("");
//       setDescription("");
//       setPrice("");
//       setImage(null);
//     } catch (error) {
//       console.error("Error adding product:", error);
//       alert("Error adding product!");
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Product Management</h1>
//       <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
//         <div style={{ marginBottom: "10px" }}>
//           <label>Name: </label>
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//         </div>
//         <div style={{ marginBottom: "10px" }}>
//           <label>Description: </label>
//           <input
//             type="text"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//         </div>
//         <div style={{ marginBottom: "10px" }}>
//           <label>Price: </label>
//           <input
//             type="number"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//           />
//         </div>
//         <div style={{ marginBottom: "10px" }}>
//           <label>Image: </label>
//           <input type="file" onChange={(e) => setImage(e.target.files[0])} />
//         </div>
//         <button type="submit">Add Product</button>
//       </form>

//       <h2>Product List</h2>
//       <div>
//         {products.length > 0 ? (
//           products.map((product) => (
//             <div
//               key={product._id}
//               style={{
//                 border: "1px solid #ccc",
//                 marginBottom: "10px",
//                 padding: "10px",
//               }}
//             >
//               <h3>{product.name}</h3>
//               <p>{product.description}</p>
//               <p>
//                 <strong>Price:</strong> ${product.price}
//               </p>
//               <img
//                 src={`http://localhost:5000${product.imageUrl}`}
//                 alt={product.name}
//                 style={{ width: "100px" }}
//               />
//             </div>
//           ))
//         ) : (
//           <p>No products available.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default App;
