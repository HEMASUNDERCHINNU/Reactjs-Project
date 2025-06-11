import React, { useContext, useState } from "react";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { fireDB } from "../../firebase/Firebase";
import { useNavigate } from "react-router";
import myContext from "../../context/myContext";
import toast from "react-hot-toast";
import Loader from "../../components/loader/Loader";

const categoryList = [
  {
    name: "Fashion",
    subCategories: ["Men's Wear", "Women's Wear", "Kid's Wear"],
  },
  {
    name: "Mobiles",
    subCategories: ["Smartphones", "Feature Phones"],
  },
  {
    name: "Electronics",
    subCategories: ["Laptops", "Cameras", "Audio"],
  },
  {
    name: "Home & Furniture",
    subCategories: ["Living Room", "Bedroom"],
  },
  {
    name: "Appliances",
    subCategories: ["Kitchen", "Laundry"],
  },
  {
    name: "Shoes",
    subCategories: ["Men's Shoes", "Women's Shoes"],
  },
  {
    name: "Books",
    subCategories: ["Fiction", "Non-fiction", "Academic"],
  },
];

const AddProductPage = () => {
  const context = useContext(myContext);
  const { loading, setLoading } = context;
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    title: "",
    price: "",
    productImageUrl: "",
    sideImageUrl: "",
    backImageUrl: "",
    category: "",
    subCategory: "",
    description: "",
    quantity: 1,
    colors: [],
    sizes: [],
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  const [colorInput, setColorInput] = useState("");
  const [sizeInput, setSizeInput] = useState("");

  const addProductFunction = async () => {
    if (
      product.title === "" ||
      product.price === "" ||
      product.productImageUrl === "" ||
      product.sideImageUrl === "" ||
      product.backImageUrl === "" ||
      product.category === "" ||
      product.description === "" ||
      product.subCategory === "" ||
      product.colors.length === 0 ||
      product.sizes.length === 0
    ) {
      return toast.error("All fields including colors and sizes are required");
    }

    setLoading(true);
    try {
      const productRef = collection(fireDB, "products");
      await addDoc(productRef, product);
      toast.success("Product added successfully");
      navigate("/admin-dashboard");
    } catch (error) {
      console.log(error);
      toast.error("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  const selectedCategoryObj = categoryList.find(
    (cat) => cat.name === product.category
  );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {loading && <Loader />}
      <div className="bg-white px-8 py-6 border border-slate-200 rounded-xl shadow-md">
        <div className="mb-5">
          <h2 className="text-center text-2xl font-bold text-slate-700">
            Add Product
          </h2>
        </div>

        {/* Product Title */}
        <div className="mb-3">
          <input
            type="text"
            placeholder="Product Title"
            value={product.title}
            onChange={(e) =>
              setProduct({ ...product, title: e.target.value })
            }
            className="bg-slate-50 border text-zinc-700 border-zinc-300 px-2 py-2 w-96 rounded-md outline-none placeholder-slate-400"
          />
        </div>

        {/* Product Price */}
        <div className="mb-3">
          <input
            type="number"
            placeholder="Product Price"
            value={product.price}
            onChange={(e) =>
              setProduct({ ...product, price: e.target.value })
            }
            className="bg-slate-50 border text-zinc-700 border-zinc-300 px-2 py-2 w-96 rounded-md outline-none placeholder-slate-400"
          />
        </div>

        {/* Product Images */}
        {["productImageUrl", "sideImageUrl", "backImageUrl"].map((imgType) => (
          <div key={imgType} className="mb-3">
            <input
              type="text"
              placeholder={`${imgType.replace("Url", "").replace(/([A-Z])/g, " $1")} URL`}
              value={product[imgType]}
              onChange={(e) =>
                setProduct({ ...product, [imgType]: e.target.value })
              }
              className="bg-slate-50 border text-zinc-700 border-zinc-300 px-2 py-2 w-96 rounded-md outline-none placeholder-slate-400"
            />
            {product[imgType] && (
              <img
                src={product[imgType]}
                alt={imgType}
                className="w-32 h-32 object-cover rounded-md mt-2 border"
              />
            )}
          </div>
        ))}

        {/* Category */}
        <div className="mb-3">
          <select
            value={product.category}
            onChange={(e) =>
              setProduct({
                ...product,
                category: e.target.value,
                subCategory: "",
              })
            }
            className="bg-slate-50 border text-zinc-700 border-zinc-300 px-2 py-2 w-96 rounded-md outline-none"
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

        {/* Subcategory */}
        {selectedCategoryObj && (
          <div className="mb-3">
            <select
              value={product.subCategory}
              onChange={(e) =>
                setProduct({ ...product, subCategory: e.target.value })
              }
              className="bg-slate-50 border text-zinc-700 border-zinc-300 px-2 py-2 w-96 rounded-md outline-none"
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

        {/* Colors */}
        <div className="mb-3">
          <label className="block mb-1 text-zinc-700 font-medium">Colors</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={colorInput}
              onChange={(e) => setColorInput(e.target.value)}
              placeholder="Enter a color (e.g., Red)"
              className="flex-1 bg-slate-50 border border-zinc-300 px-2 py-2 rounded-md outline-none placeholder-slate-400"
            />
            <button
              type="button"
              onClick={() => {
                if (colorInput && !product.colors.includes(colorInput)) {
                  setProduct({
                    ...product,
                    colors: [...product.colors, colorInput],
                  });
                  setColorInput("");
                }
              }}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 rounded"
            >
              Add
            </button>
          </div>
          <div className="flex gap-2 flex-wrap">
            {product.colors.map((color, idx) => (
              <span
                key={idx}
                className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-sm"
              >
                {color}
              </span>
            ))}
          </div>
        </div>

        {/* Sizes */}
        <div className="mb-3">
          <label className="block mb-1 text-zinc-700 font-medium">Sizes</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={sizeInput}
              onChange={(e) => setSizeInput(e.target.value)}
              placeholder="Enter a size (e.g., M, L, XL)"
              className="flex-1 bg-slate-50 border border-zinc-300 px-2 py-2 rounded-md outline-none placeholder-slate-400"
            />
            <button
              type="button"
              onClick={() => {
                if (sizeInput && !product.sizes.includes(sizeInput)) {
                  setProduct({
                    ...product,
                    sizes: [...product.sizes, sizeInput],
                  });
                  setSizeInput("");
                }
              }}
              className="bg-green-500 hover:bg-green-600 text-white px-4 rounded"
            >
              Add
            </button>
          </div>
          <div className="flex gap-2 flex-wrap">
            {product.sizes.map((size, idx) => (
              <span
                key={idx}
                className="bg-green-100 text-green-700 px-2 py-1 rounded-md text-sm"
              >
                {size}
              </span>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="mb-3">
          <textarea
            value={product.description}
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
            placeholder="Product Description"
            rows="4"
            className="bg-slate-50 border text-zinc-700 border-zinc-300 px-2 py-2 w-96 rounded-md outline-none placeholder-slate-400"
          />
        </div>

        {/* Submit Button */}
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
  );
};

export default AddProductPage;
