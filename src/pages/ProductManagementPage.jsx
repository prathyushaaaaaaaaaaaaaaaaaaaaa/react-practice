import { useEffect, useState } from "react";

function ProductManagementPage() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageVersion, setImageVersion] = useState(Date.now());


  // Stores the product currently being edited
  const [editingProduct, setEditingProduct] = useState(null);

  // Stores success/error messages
  const [message, setMessage] = useState("");
  const [showOrders, setShowOrders] = useState(false);
  const [orders, setOrders] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);


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
    console.log("Create status:", response.status);

    if (!response.ok) {
      setMessage(data.detail || "Unable to create product.");
      return;
    }

    // Get the updated product list
    const updatedResponse = await fetch(
      "http://127.0.0.1:8000/products"
    );

    const updatedProducts = await updatedResponse.json();

    console.log("Updated products:", updatedProducts);

    setProducts(updatedProducts);
    setImageVersion(Date.now());

    setShowForm(false);

    setProductName("");
    setCategory("");
    setPrice("");
    setStockQuantity("");
    setEditingProduct(null);
    setImageFile(null);

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
      setImageVersion(Date.now());

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
      setImageVersion(Date.now());

    } catch (error) {
      console.error("DELETE ERROR:", error);
      setMessage("Something went wrong while deleting the product.");
    }
  };

// to fetch the orders

const showProductOrders = async (product) => {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/products/${product[0]}/orders`
    );

    const data = await response.json();

    console.log("Orders received:", data);

    setOrders(data);
    setSelectedProduct(product);
    setShowOrders(true);

  } catch (error) {
    console.error("Error fetching orders:", error);
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
    <div className="w-full">

        <h1 className="text-3xl font-bold text-gray-100 text-center">
          Product Management
        </h1>

        <div className="flex justify-center">
        <button
          onClick={openCreateForm}
          className="mt-4 bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + Add Product
        </button>
        </div>

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

                <input
                type="file"
                accept="image/*"
                className="w-full px-3 py-2 border border-gray-500 rounded-lg bg-gray-700 text-white"
                onChange={(e) => setImageFile(e.target.files[0])}
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
      


      {/* Orders Popup */}
        {showOrders && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">

            <div className="bg-gray-800 p-6 rounded-lg w-3/4 max-h-[80vh] overflow-y-auto">

            <div className="flex justify-between items-center mb-5">

                <h2 className="text-2xl font-semibold text-gray-100">
                Orders for {selectedProduct[1]}
                </h2>

                <button
                onClick={() => setShowOrders(false)}
                className="text-gray-300 hover:text-white text-xl"
                >
                ✕
                </button>

            </div>

            {orders.length === 0 ? (

                <p className="text-gray-300">
                No orders found for this product.
                </p>

            ) : (

                <table className="w-full border-collapse border border-gray-400">

                <thead className="bg-blue-800">

                    <tr>

                    <th className="border border-gray-400 py-2 px-3 text-gray-100">
                        Order ID
                    </th>

                    <th className="border border-gray-400 py-2 px-3 text-gray-100">
                        Order Date
                    </th>

                    <th className="border border-gray-400 py-2 px-3 text-gray-100">
                        Customer ID
                    </th>

                    <th className="border border-gray-400 py-2 px-3 text-gray-100">
                        Quantity
                    </th>

                    <th className="border border-gray-400 py-2 px-3 text-gray-100">
                        Status
                    </th>

                    </tr>

                </thead>

                <tbody>

                    {orders.map((order) => (

                    <tr key={order[0]}>

                        <td className="border border-gray-400 py-2 px-3 text-gray-100">
                        {order[0]}
                        </td>

                        <td className="border border-gray-400 py-2 px-3 text-gray-100">
                        {order[1]}
                        </td>

                        <td className="border border-gray-400 py-2 px-3 text-gray-100">
                        {order[2]}
                        </td>

                        <td className="border border-gray-400 py-2 px-3 text-gray-100">
                        {order[3]}
                        </td>

                        <td className="border border-gray-400 py-2 px-3 text-gray-100">
                        {order[4]}
                        </td>

                    </tr>

                    ))}

                </tbody>

                </table>

            )}

            </div>

        </div>
        )}

      {/* Product Table */}
      <div className="mt-4 overflow-x-auto">
      <table className="mt-4 w-full border-collapse border border-gray-400">

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
                Successful
            </th>

            <th className="border border-gray-400 py-3 px-4 text-sm font-semibold text-gray-100">
                Failed
            </th>

            <th className="border border-gray-400 py-3 px-4 text-sm font-semibold text-gray-100">
                Payment Due
            </th>

            <th className="border border-gray-400 py-3 px-4 text-sm font-semibold text-gray-100">
                Total Received</th>

            <th className="border border-gray-400 py-3 px-4 text-sm font-semibold text-gray-100">Pending Amount</th>

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
                {product[5]}
            </td>

            <td className="border border-gray-400 py-3 px-4 text-gray-100">
                {product[6]}
            </td>
            <td className="border border-gray-400 py-3 px-4 text-gray-100">
                {product[7]}
            </td>

            <td className="border border-gray-400 py-3 px-4 text-gray-100">
                ₹{product[8]}
            </td>

            <td className="border border-gray-400 py-3 px-4 text-gray-100">
                ₹{product[9]}
            </td>

             <td className="border border-gray-400 py-3 px-4">
            <img
                key={`${product[0]}-${imageVersion}`}
                src={`http://127.0.0.1:8000/products/${product[0]}/image?v=${imageVersion}`}
                alt={product[1]}
                onError={(e) => {
                    e.currentTarget.style.display = "none";
                }}
            />
            </td>

            {/* Actions */}
            <td className="border border-gray-400 py-3 px-4 text-gray-100">
                <div className="flex gap-2 justify-center">
                
                
                <button
                    onClick={() => showProductOrders(product)}
                    className="bg-blue-700 text-white px-2 py-1 rounded hover:bg-blue-500"
                >
                    Show Orders
                </button>

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

    </div>
  );
}

export default ProductManagementPage;