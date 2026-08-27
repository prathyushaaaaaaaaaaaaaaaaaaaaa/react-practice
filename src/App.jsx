// function App() {
//   const name = "Prathyusha";
//   return (
//   <div>
//   <h1>Holaaaaaaaaaa</h1>
//   <p>This is the spanish word for HELLOOOOOOOOO</p>
//   <button onClick={() => alert("You just chose Spanishhhhhhhh")}>SPANISHHHHHHH</button> 
//   <button onClick= {() => alert("You just clicked a button!!!!!!!!")}>
//     Click MEEEEE
//   </button>
//   return <h1>Hola {name} </h1>
//   </div>
//   )
// }
// export default App

// function App() {
//   const name = "John"
//   const age = 21
//   const role = "Developer"

//   return (
//   <div className="flex flex-col gap-2">
//     <p> Name : {name}</p>
//     <p> Age : {age}</p>
//     <p> Role : {role}</p>
//   </div>
//   )
// }
// export default App 

// function Profile({name,age,role}) {
//   return (
//     <div>
//       <p>Name: {name}</p>
//       <p>Age: {age}</p>
//       <p>Role: {role}</p>
//     </div>
//   );
// }

// function App() {
//   return (
//     <div>
//       <Profile name = "John" age = {21} role ="Developer" />
//       <Profile name = "Sarah" age = {25} role ="Designer" />
//       <Profile name = "Alex" age = {30} role ="Manager" />
//     </div>
//     );
//   }
// export default App


// import { useState } from "react";

// function App(){
//   const [count,setCount] = useState("Hello");
//   return (
//     <div>
//       <p>{count}</p>
//       <button onClick = {() => setCount("Goodbye")} > 
//         Add
//       </button>
//     </div>

//   );
// }
// export default App;

// import { useState } from "react";

// function App() {
//   const[isHappy,setisHappy] = useState(false);
//   return(
//     <div>
//       {isHappy ? <p>Happy</p> : <p>Sad</p>}
//       <button onClick = {() => setisHappy(!isHappy)}>
//           happy/sad
//       </button>
//     </div>
//   )
// }
// export default App

// import { useState } from "react";

// function App() {
//   const products = [
//     {id:1, name: "Laptop", price : 100000},
//     {id:2, name: "Headphones", price : 2000},
//     {id:1, name: "Phone", price : 40000}
//   ];
//   return (
//     <div>
//       {products.map((product) => (
//         <div key = {product.id}>
//         <p>{product.name}</p>
//         <p>{product.price}</p>
//       </div>
//       ))}
//   </div>
//   );
// }

// export default App;


// import {useState} from "react";
// function App() {
//   const[name,setName] = useState("")

//   return (
//     <div> 
//       <input
//       onChange={(e) => setName(e.target.value)}
//       />
//       <p>Hello {name}</p>
//     </div>
//   );
// }

// export default App


// import { useEffect } from "react";

// function App() {

//   useEffect(() => {
//     console.log("The page has loaded!");
//   }, []);

//   return (
//     <div>
//       <h1>Hello!</h1>
//       <p>Open the browser console </p>
//     </div>
//   );
// }

// export default App;


// // ONE PAGE PRODUCT MANAGEMENT CODE
// import { useEffect, useState } from "react";

// function App() {
//   const [products, setProducts] = useState([]);
//   const [showForm, setShowForm] = useState(false);

//   const [productName, setProductName] = useState("");
//   const [category, setCategory] = useState("");
//   const [price, setPrice] = useState("");
//   const [stockQuantity, setStockQuantity] = useState("");

//   // Stores the product currently being edited
//   const [editingProduct, setEditingProduct] = useState(null);

//   // Stores delete/error messages
//   const [message, setMessage] = useState("");

//   // GET all products
//   useEffect(() => {
//     fetch("http://127.0.0.1:8000/products")
//       .then((response) => response.json())
//       .then((data) => {
//         setProducts(data);
//       })
//       .catch((error) => {
//         console.error("Error fetching products:", error);
//       });
//   }, []);

//   // CREATE product
//   const createProduct = async () => {
//     try {
//       const response = await fetch("http://127.0.0.1:8000/products", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           product_name: productName,
//           category: category,
//           price: Number(price),
//           stock_quantity: Number(stockQuantity),
//         }),
//       });

//       const data = await response.json();

//       console.log(data);

//       // Get updated product list
//       const updatedResponse = await fetch(
//         "http://127.0.0.1:8000/products"
//       );

//       const updatedProducts = await updatedResponse.json();

//       setProducts(updatedProducts);

//       setShowForm(false);

//       // Clear form
//       setProductName("");
//       setCategory("");
//       setPrice("");
//       setStockQuantity("");
//     } catch (error) {
//       console.error("Error creating product:", error);
//     }
//   };

//   // OPEN EDIT FORM
//   const editProduct = (product) => {
//     setEditingProduct(product);

//     setProductName(product[1]);
//     setCategory(product[2]);
//     setPrice(product[3]);
//     setStockQuantity(product[4]);

//     setShowForm(true);
//   };

//   // UPDATE product
//   const updateProduct = async () => {
//     try {
//       const response = await fetch(
//         `http://127.0.0.1:8000/products/${editingProduct[0]}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             product_name: productName,
//             category: category,
//             price: Number(price),
//             stock_quantity: Number(stockQuantity),
//           }),
//         }
//       );

//       const data = await response.json();

//       console.log(data);

//       // Get updated product list
//       const updatedResponse = await fetch(
//         "http://127.0.0.1:8000/products"
//       );

//       const updatedProducts = await updatedResponse.json();

//       setProducts(updatedProducts);

//       setShowForm(false);
//       setEditingProduct(null);

//       // Clear form
//       setProductName("");
//       setCategory("");
//       setPrice("");
//       setStockQuantity("");
//     } catch (error) {
//       console.error("Error updating product:", error);
//     }
//   };

//   // DELETE product
//   const deleteProduct = async (productId) => {
//     try {
//       const response = await fetch(
//         `http://127.0.0.1:8000/products/${productId}`,
//         {
//           method: "DELETE",
//         }
//       );

//       const data = await response.json();

//       console.log(data);

//       // Product successfully deleted
//       if (response.ok) {
//         const updatedResponse = await fetch(
//           "http://127.0.0.1:8000/products"
//         );

//         const updatedProducts = await updatedResponse.json();

//         setProducts(updatedProducts);

//         setMessage("Product deleted successfully.");

//         // Remove message after 3 seconds
//         setTimeout(() => {
//           setMessage("");
//         }, 3000);
//       }

//       // Product cannot be deleted because of existing orders
//       else if (response.status === 409) {
//         setMessage(data.detail);

//         setTimeout(() => {
//           setMessage("");
//         }, 4000);
//       }
//     } catch (error) {
//       console.error("Error deleting product:", error);
//       setMessage("Something went wrong while deleting the product.");
//     }
//   };

//   return (
//     <div>
//       <div>
//         <h1>Product Management</h1>

//         <button onClick={() => setShowForm(true)}>
//           + Add Product
//         </button>

//         {/* Success/Error Message */}
//         {message && (
//           <p>
//             {message}
//           </p>
//         )}

//         {/* Create/Edit Form */}
//         {showForm && (
//           <div>
//             <h2>
//               {editingProduct ? "Edit Product" : "Create Product"}
//             </h2>

//             <input
//               placeholder="Product Name"
//               value={productName}
//               onChange={(e) => setProductName(e.target.value)}
//             />

//             <input
//               placeholder="Category"
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//             />

//             <input
//               placeholder="Price"
//               value={price}
//               onChange={(e) => setPrice(e.target.value)}
//             />

//             <input
//               placeholder="Stock Quantity"
//               value={stockQuantity}
//               onChange={(e) => setStockQuantity(e.target.value)}
//             />

//             <button
//               onClick={() => {
//                 setShowForm(false);
//                 setEditingProduct(null);
//               }}
//             >
//               Cancel
//             </button>

//             <button
//               onClick={
//                 editingProduct ? updateProduct : createProduct
//               }
//             >
//               {editingProduct ? "Update" : "Create"}
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Product Table */}
//       <table>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Product Name</th>
//             <th>Category</th>
//             <th>Price</th>
//             <th>Stock</th>
//             <th>Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {products.map((product) => (
//             <tr key={product[0]}>
//               <td>{product[0]}</td>
//               <td>{product[1]}</td>
//               <td>{product[2]}</td>
//               <td>₹{product[3]}</td>
//               <td>{product[4]}</td>

//               <td>
//                 <button onClick={() => editProduct(product)}>
//                   Edit
//                 </button>

//                 <button
//                   onClick={() => deleteProduct(product[0])}
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default App;

// // to view just the usermanagementpage
// import UserManagementPage from "./pages/UserManagementPage";

// function App() {
//   return <UserManagementPage />;
// }

// export default App;

// // to view just the productmanagement page
// import ProductManagementPage from "./pages/ProductManagementPage";

// function App() {
//   return <ProductManagementPage />;
// }

// export default App;

// FINAL APP.JSX CODE WITH FUNCTIONAL SIDEBAR


// import { useState } from "react";
// import Sidebar from "./components/Sidebar";
// import ProductManagementPage from "./pages/ProductManagementPage";
// import UserManagementPage from "./pages/UserManagementPage";

// function App() {
//   const [currentPage, setCurrentPage] = useState("products");

//   return (
//     <div>
//       <Sidebar setCurrentPage={setCurrentPage} />

//       {currentPage === "products" && <ProductManagementPage />}

//       {currentPage === "users" && <UserManagementPage />}
//     </div>
//   );
// }

// export default App;

import { useState } from "react";
import Sidebar from "./components/Sidebar";
import ProductManagementPage from "./pages/ProductManagementPage";
import UserManagementPage from "./pages/UserManagementPage";

function App() {
  const [currentPage, setCurrentPage] = useState("products");

  return (
    <div>
      <Sidebar setCurrentPage={setCurrentPage} />

      {currentPage === "products" && <ProductManagementPage />}

      {currentPage === "users" && <UserManagementPage />}
    </div>
  );
}

export default App;