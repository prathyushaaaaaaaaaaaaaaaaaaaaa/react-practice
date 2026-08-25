import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");

  // Stores the product currently being edited
  const [editingProduct, setEditingProduct] = useState(null);

  // Stores delete/error messages
  const [message, setMessage] = useState("");

  // GET all products
  useEffect(() => {
  fetch("http://127.0.0.1:8000/products")
    .then((response) => response.json())
    .then((data) => {
      console.log("Products received:", data);
      setProducts(data);
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
    });
}, []);

  // CREATE product
  const createProduct = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_name: productName,
          category: category,
          price: Number(price),
          stock_quantity: Number(stockQuantity),
        }),
      });

      const data = await response.json();

      console.log(data);

      // Get updated product list
      const updatedResponse = await fetch(
        "http://127.0.0.1:8000/products"
      );

      const updatedProducts = await updatedResponse.json();

      setProducts(updatedProducts);

      setShowForm(false);

      // Clear form
      setProductName("");
      setCategory("");
      setPrice("");
      setStockQuantity("");
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  // OPEN EDIT FORM
  const editProduct = (product) => {
    setEditingProduct(product);

    setProductName(product[1]);
    setCategory(product[2]);
    setPrice(product[3]);
    setStockQuantity(product[4]);

    setShowForm(true);
  };

  // UPDATE product
  const updateProduct = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/products/${editingProduct[0]}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            product_name: productName,
            category: category,
            price: Number(price),
            stock_quantity: Number(stockQuantity),
          }),
        }
      );

      const data = await response.json();

      console.log(data);

      // Get updated product list
      const updatedResponse = await fetch(
        "http://127.0.0.1:8000/products"
      );

      const updatedProducts = await updatedResponse.json();

      setProducts(updatedProducts);

      setShowForm(false);
      setEditingProduct(null);

      // Clear form
      setProductName("");
      setCategory("");
      setPrice("");
      setStockQuantity("");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  // delete product
  const deleteProduct = async (productId) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/products/${productId}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      console.log(data);

      // Product successfully deleted
      if (response.ok) {
        const updatedResponse = await fetch(
          "http://127.0.0.1:8000/products"
        );

        const updatedProducts = await updatedResponse.json();

        setProducts(updatedProducts);

        setMessage("Product deleted successfully.");

        // remove message after 3 seconds
        setTimeout(() => {
          setMessage("");
        }, 3000);
      }

      // product cannot be deleted because of existing orders
      else if (response.status === 409) {
        setMessage(data.detail);

        setTimeout(() => {
          setMessage("");
        }, 4000);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      setMessage("Something went wrong while deleting the product.");
    }
  };

  return (
    <div>
      <div>
        <h1>Product Management</h1>

        <button onClick={() => setShowForm(true)}>
          + Add Product
        </button>

        {/* Success/Error Message */}
        {message && (
          <p>
            {message}
          </p>
        )}

        {/* Create/Edit Form */}
        {showForm && (
          <div>
            <h2>
              {editingProduct ? "Edit Product" : "Create Product"}
            </h2>

            <input
              placeholder="Product Name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />

            <input
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />

            <input
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <input
              placeholder="Stock Quantity"
              value={stockQuantity}
              onChange={(e) => setStockQuantity(e.target.value)}
            />

            <button
              onClick={() => {
                setShowForm(false);
                setEditingProduct(null);
              }}
            >
              Cancel
            </button>

            <button
              onClick={
                editingProduct ? updateProduct : createProduct
              }
            >
              {editingProduct ? "Update" : "Create"}
            </button>
          </div>
        )}
      </div>

      {/* Product Table */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product[0]}>
              <td>{product[0]}</td>
              <td>{product[1]}</td>
              <td>{product[2]}</td>
              <td>₹{product[3]}</td>
              <td>{product[4]}</td>

              <td>
                <button onClick={() => editProduct(product)}>
                  Edit
                </button>

                <button
                  onClick={() => deleteProduct(product[0])}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;