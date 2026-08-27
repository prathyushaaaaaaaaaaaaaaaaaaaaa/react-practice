import { useEffect, useState } from "react";

function ProductManagementPage() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");

  // Stores the product currently being edited
  const [editingProduct, setEditingProduct] = useState(null);

  // Stores success/error messages
  const [message, setMessage] = useState("");

  // Stores the selected image
  const [imageFile, setImageFile] = useState(null);

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
        setMessage("Error fetching products.");
      });
  }, []);

  // CREATE product
  const createProduct = async () => {
    try {
      setMessage("");

      const formData = new FormData();

      formData.append("product_name", productName);
      formData.append("category", category);
      formData.append("price", price);
      formData.append("stock_quantity", stockQuantity);

      if (imageFile) {
        formData.append("image", imageFile);
      }

      const response = await fetch(
        "http://127.0.0.1:8000/products",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      console.log("Create response:", data);

      const updatedResponse = await fetch(
        "http://127.0.0.1:8000/products"
      );

      const updatedProducts = await updatedResponse.json();

      setProducts(updatedProducts);

      setShowForm(false);

      setProductName("");
      setCategory("");
      setPrice("");
      setStockQuantity("");
      setImageFile(null);
      setEditingProduct(null);

      setMessage("Product created successfully!");

    } catch (error) {
      console.error("Error creating product:", error);
      setMessage("Error creating product.");
    }
  };

  // OPEN EDIT FORM
  const editProduct = (product) => {
    setEditingProduct(product);

    setProductName(product[1]);
    setCategory(product[2]);
    setPrice(product[3]);
    setStockQuantity(product[4]);

    setImageFile(null);

    setShowForm(true);
    setMessage("");
  };

  // UPDATE product
  const updateProduct = async () => {
    try {
      setMessage("");

      const formData = new FormData();

      formData.append("product_name", productName);
      formData.append("category", category);
      formData.append("price", price);
      formData.append("stock_quantity", stockQuantity);

      if (imageFile) {
        formData.append("image", imageFile);
      }

      console.log("Updating product:", editingProduct[0]);
      console.log("Image:", imageFile);

      const response = await fetch(
        `http://127.0.0.1:8000/products/${editingProduct[0]}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      console.log("Response status:", response.status);
      console.log("Response OK:", response.ok);

      const data = await response.json();

      console.log("Response data:", data);

      const updatedResponse = await fetch(
        "http://127.0.0.1:8000/products"
      );

      const updatedProducts = await updatedResponse.json();

      console.log("Updated products:", updatedProducts);

      setProducts(updatedProducts);

      setShowForm(false);
      setEditingProduct(null);

      setProductName("");
      setCategory("");
      setPrice("");
      setStockQuantity("");
      setImageFile(null);

      setMessage("Product updated successfully!");

    } catch (error) {
      console.error("UPDATE ERROR:", error);
      setMessage("Error updating product.");
    }
  };

  // DELETE product
  const deleteProduct = async (id) => {
    try {
      setMessage("");

      const response = await fetch(
        `http://127.0.0.1:8000/products/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      console.log("Delete response:", data);
      console.log("Delete status:", response.status);

      // Handle error response from FastAPI
      if (!response.ok) {
        setMessage(data.detail || "Unable to delete product.");
        return;
      }

      // Delete successful
      setMessage("Product deleted successfully!");

      // Refresh product list
      const updatedResponse = await fetch(
        "http://127.0.0.1:8000/products"
      );

      const updatedProducts = await updatedResponse.json();

      setProducts(updatedProducts);

    } catch (error) {
      console.error("DELETE ERROR:", error);
      setMessage("Something went wrong while deleting the product.");
    }
  };

  // OPEN CREATE FORM
  const openCreateForm = () => {
    setEditingProduct(null);

    setProductName("");
    setCategory("");
    setPrice("");
    setStockQuantity("");
    setImageFile(null);

    setMessage("");
    setShowForm(true);
  };

  // CANCEL FORM
  const cancelForm = () => {
    setShowForm(false);
    setEditingProduct(null);

    setProductName("");
    setCategory("");
    setPrice("");
    setStockQuantity("");
    setImageFile(null);

    setMessage("");
  };

  return (
    <div className="min-h-screen bg-grey-900 p-8">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold text-gray-100">
          Product Management
        </h1>

        <button
          onClick={openCreateForm}
          className="mt-4 bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + Add Product
        </button>

        {/* Success/Error Message */}
        {message && (
          <p className="mt-4 text-gray-100">
            {message}
          </p>
        )}

        {/* Create/Edit Form */}
        {showForm && (
          <div className="mt-6 p-6 border border-gray-600 rounded-lg bg-gray-800">

            <h2 className="text-xl font-semibold text-gray-100 mb-5">
              {editingProduct ? "Edit Product" : "Create Product"}
            </h2>

            <div className="flex flex-col gap-4">

              <input
                className="w-full px-3 py-2 border border-gray-500 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                placeholder="Product Name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />

              <input
                className="w-full px-3 py-2 border border-gray-500 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />

              <input
                className="w-full px-3 py-2 border border-gray-500 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />

              <input
                className="w-full px-3 py-2 border border-gray-500 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                placeholder="Stock Quantity"
                value={stockQuantity}
                onChange={(e) => setStockQuantity(e.target.value)}
              />

              {/* Image Upload */}
              <input
                type="file"
                accept="image/*"
                className="w-full px-3 py-2 border border-gray-500 rounded-lg bg-gray-700 text-gray-200"
                onChange={(e) => {
                  const file = e.target.files[0];

                  if (file) {
                    setImageFile(file);
                  }
                }}
              />

              <div className="flex gap-3">

                <button
                  onClick={cancelForm}
                  className="px-4 py-2 rounded-lg border border-gray-500 text-gray-200 hover:bg-gray-700"
                >
                  Cancel
                </button>

                <button
                  onClick={
                    editingProduct
                      ? updateProduct
                      : createProduct
                  }
                  className="px-4 py-2 rounded-lg bg-blue-700 text-white hover:bg-blue-600"
                >
                  {editingProduct ? "Update" : "Create"}
                </button>

              </div>

            </div>
          </div>
        )}
      </div>

      {/* Product Table */}
      <table className="mt-6 w-full border-collapse border border-gray-400">

        <thead className="bg-blue-800">

          <tr>

            <th className="border border-gray-400 py-3 px-4 text-sm font-semibold text-gray-100">
              ID
            </th>

            <th className="border border-gray-400 py-3 px-4 text-sm font-semibold text-gray-100">
              Product Name
            </th>

            <th className="border border-gray-400 py-3 px-4 text-sm font-semibold text-gray-100">
              Category
            </th>

            <th className="border border-gray-400 py-3 px-4 text-sm font-semibold text-gray-100">
              Price
            </th>

            <th className="border border-gray-400 py-3 px-4 text-sm font-semibold text-gray-100">
              Stock
            </th>

            <th className="border border-gray-400 py-3 px-4 text-sm font-semibold text-gray-100">
              Image
            </th>

            <th className="border border-gray-400 py-3 px-4 text-sm font-semibold text-gray-100">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {products.map((product) => (

            <tr key={product[0]}>

              <td className="border border-gray-400 py-3 px-4 text-gray-100">
                {product[0]}
              </td>

              <td className="border border-gray-400 py-3 px-4 text-gray-100">
                {product[1]}
              </td>

              <td className="border border-gray-400 py-3 px-4 text-gray-100">
                {product[2]}
              </td>

              <td className="border border-gray-400 py-3 px-4 text-gray-100">
                ₹{product[3]}
              </td>

              <td className="border border-gray-400 py-3 px-4 text-gray-100">
                {product[4]}
              </td>

              <td className="border border-gray-400 py-3 px-4 text-gray-100">

                {product[5] && (
                  <img
                    src={`http://127.0.0.1:8000/uploads/${product[5]}`}
                    alt={product[1]}
                    width="80"
                  />
                )}

              </td>

              <td className="border border-gray-400 py-3 px-4 text-gray-100">

                <div className="flex gap-2 justify-center">

                  <button
                    onClick={() => editProduct(product)}
                    className="bg-blue-700 text-white px-2 py-1 rounded hover:bg-blue-500"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteProduct(product[0])}
                    className="bg-blue-700 text-white px-2 py-1 rounded hover:bg-blue-500"
                  >
                    Delete
                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default ProductManagementPage;