import React from "react";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { useContext, useState } from "react";
import myContext from "../../context/myContext";
import toast from "react-hot-toast";
import { fireDB } from "../../firebase/Firebase";
import { useNavigate } from "react-router";
import Loader from "../../components/loader/Loader";

const categoryList = [
  {
    name: "Fashion",
    subCategories: ["Men's Wear", "Women's Wear", "Kid's Wear"]
  },
  {
    name: "Mobiles",
    subCategories: ["Smartphones", "Feature Phones"]
  },
  {
    name: "Electronics",
    subCategories: ["Laptops", "Cameras", "Audio"]
  },
  {
    name: "Home & Furniture",
    subCategories: ["Living Room", "Bedroom"]
  },
  {
    name: "Appliances",
    subCategories: ["Kitchen", "Laundry"]
  },
  {
    name: "Shoes",
    subCategories: ["Men's Shoes", "Women's Shoes"]
  },
  {
    name: "Books",
    subCategories: ["Fiction", "Non-fiction", "Academic"]
  }
];

const AddProductPage = () => {
  const context = useContext(myContext);
  const { loading, setLoading } = context;
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    title: "",
    price: "",
    productImageUrl: "",
    category: "",
    subCategory: "",
    description: "",
    quantity: 1,
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric"
    })
  });

  const addProductFunction = async () => {
    if (
      product.title === "" ||
      product.price === "" ||
      product.productImageUrl === "" ||
      product.category === "" ||
      product.description === "" ||
      product.subCategory === ""
    ) {
      return toast.error("All fields are required");
    }

    setLoading(true);
    try {
      const productRef = collection(fireDB, "products");
      await addDoc(productRef, product);
      toast.success("Product added successfully");
      navigate("/admin-dashboard");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Failed to add product");
    }
  };

  const selectedCategoryObj = categoryList.find(
    (cat) => cat.name === product.category
  );

  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        {loading && <Loader />}
        <div className="login_Form bg-slate-200 px-8 py-6 border border-slate-200 rounded-xl shadow-md">
          <div className="mb-5">
            <h2 className="text-center text-2xl font-bold text-slate-700">
              Add Product
            </h2>
          </div>

          <div className="mb-3">
            <input
              type="text"
              name="title"
              value={product.title}
              onChange={(e) => setProduct({ ...product, title: e.target.value })}
              placeholder="Product Title"
              className="bg-slate-50 border text-zinc-700 border-zinc-300 px-2 py-2 w-96 rounded-md outline-none placeholder-slate-400"
            />
          </div>

          <div className="mb-3">
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={(e) => setProduct({ ...product, price: e.target.value })}
              placeholder="Product Price"
              className="bg-slate-50 border text-zinc-700 border-zinc-300 px-2 py-2 w-96 rounded-md outline-none placeholder-slate-400"
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              name="productImageUrl"
              value={product.productImageUrl}
              onChange={(e) => setProduct({ ...product, productImageUrl: e.target.value })}
              placeholder="Product Image URL"
              className="bg-slate-50 border text-zinc-700 border-zinc-300 px-2 py-2 w-96 rounded-md outline-none placeholder-slate-400"
            />
          </div>

          <div className="mb-3">
            <select
              value={product.category}
              onChange={(e) => setProduct({ ...product, category: e.target.value, subCategory: "" })}
              className="bg-slate-50 border text-zinc-700 border-zinc-300 px-2 py-2 w-96 rounded-md outline-none placeholder-slate-400"
            >
              <option value="" disabled>
                Select Product Category
              </option>
              {categoryList.map((cat, index) => (
                <option key={index} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {selectedCategoryObj && (
            <div className="mb-3">
              <select
                value={product.subCategory}
                onChange={(e) => setProduct({ ...product, subCategory: e.target.value })}
                className="bg-slate-50 border text-zinc-700 border-zinc-300 px-2 py-2 w-96 rounded-md outline-none placeholder-slate-400"
              >
                <option value="" disabled>
                  Select Subcategory
                </option>
                {selectedCategoryObj.subCategories.map((subCat, idx) => (
                  <option key={idx} value={subCat}>
                    {subCat}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="mb-3">
            <textarea
              value={product.description}
              onChange={(e) => setProduct({ ...product, description: e.target.value })}
              placeholder="Product Description"
              rows="5"
              className="bg-slate-50 border text-zinc-700 border-zinc-300 px-2 py-2 w-96 rounded-md outline-none placeholder-slate-400"
            />
          </div>

          <div className="mb-3">
            <button
              onClick={addProductFunction}
              type="button"
              className="bg-slate-700 hover:bg-slate-800 w-full text-white text-center py-2 font-bold rounded-md"
            >
              Add Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;