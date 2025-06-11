import React from "react";
import { useNavigate, useParams } from "react-router";
import myContext from "../../context/myContext";
import { useContext, useEffect, useState } from "react";
import { Timestamp, doc, getDoc, setDoc } from "firebase/firestore";
import { fireDB } from "../../firebase/Firebase";
import toast from "react-hot-toast";
import Loader from "../../components/loader/Loader";

const categoryList = [
    {
        name: 'Fashion',
        subcategories: ["Men's Wear" , "Women's Wear", "Kid's Wear"]
    },
    {
        name: 'Mobiles',
        subcategories: ['Smartphones', 'Feature Phones']
    },
    {
        name: 'Electronics',
        subcategories: ['Laptops', 'Cameras', 'Audio']
    },
    {
        name: 'Home & Furniture',
        subcategories: ['Living Room', 'Bedroom']
    },
    {
        name: 'Appliances',
        subcategories: ['Kitchen', 'Laundry']
    },
    {
        name: 'Shoes',
        subcategories: ["Men's Shoes", "Women's Shoes"]
    },
    {
        name: 'Books',
        subcategories: ['Fiction', 'Non-Fiction', 'Academic']
    }
];

const UpdateProductPage = () => {
    const context = useContext(myContext);
    const { loading, setLoading, getAllProductFunction } = context;

    const navigate = useNavigate();
    const { id } = useParams();

    const [product, setProduct] = useState({
        title: "",
        price: "",
        productImageUrl: "",
        sideImageUrl : "",
        backImageUrl : "",
        category: "",
        subcategory: "",
        description: "",
        colors: [],
        sizes: [],
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", { month: "short", day: "2-digit", year: "numeric" })
    });

    const [subcategories, setSubcategories] = useState([]);
     const [colorInput, setColorInput] = useState("");
      const [sizeInput, setSizeInput] = useState("");
    

    const getSingleProductFunction = async () => {
        setLoading(true);
        try {
            const productTemp = await getDoc(doc(fireDB, "products", id));
            const product = productTemp.data();
            setProduct({
    title: product?.title,
    price: product?.price,
    productImageUrl: product?.productImageUrl,
    sideImageUrl : product?.sideImageUrl,
    backImageUrl : product?.backImageUrl,
    category: product?.category,
    subcategory: product?.subcategory || "",
    description: product?.description,
    sizes : product?.sizes || [],
    colors : product?.colors || [],
    quantity: product?.quantity,
    time: product?.time,
    date: product?.date
});


            const selectedCategory = categoryList.find(cat => cat.name === product?.category);
            setSubcategories(selectedCategory ? selectedCategory.subcategories : []);

            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const updateProduct = async () => {
        setLoading(true);
        try {
            await setDoc(doc(fireDB, 'products', id), product);
            toast.success("Product Updated successfully");
            getAllProductFunction();
            setLoading(false);
            navigate('/admin-dashboard');
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getSingleProductFunction();
    }, []);

    return (
        <div>
            <div className='flex justify-center items-center h-screen'>
                <div className="login_Form bg-slate-200 px-8 py-6 border border-slate-200 rounded-xl shadow-md">

                    <div className="mb-5">
                        <h2 className='text-center text-2xl font-bold text-slate-700'>
                            Update Product
                        </h2>
                    </div>

                    <div className="mb-3">
                        <input
                            type="text"
                            name="title"
                            value={product.title}
                            onChange={(e) => setProduct({ ...product, title: e.target.value })}
                            placeholder='Product Title'
                            className='bg-slate-50 border text-zinc-700 border-zinc-300 px-2 py-2 w-96 rounded-md outline-none placeholder-slate-400'
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            type="number"
                            name="price"
                            value={product.price}
                            onChange={(e) => setProduct({ ...product, price: e.target.value })}
                            placeholder='Product Price'
                            className='bg-slate-50 border text-zinc-700 border-zinc-300 px-2 py-2 w-96 rounded-md outline-none placeholder-slate-400'
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            type="text"
                            name="productImageUrl"
                            value={product.productImageUrl}
                            onChange={(e) => setProduct({ ...product, productImageUrl: e.target.value })}
                            placeholder='Product Image Url'
                            className='bg-slate-50 border text-zinc-700 border-zinc-300 px-2 py-2 w-96 rounded-md outline-none placeholder-slate-400'
                        />
                    </div>

                    
                    <div className="mb-3">
                        <input
                            type="text"
                            name="sideImageUrl"
                            value={product.sideImageUrl}
                            onChange={(e) => setProduct({ ...product, sideImageUrl: e.target.value })}
                            placeholder='side Image Url'
                            className='bg-slate-50 border text-zinc-700 border-zinc-300 px-2 py-2 w-96 rounded-md outline-none placeholder-slate-400'
                        />
                    </div>

                    
                    <div className="mb-3">
                        <input
                            type="text"
                            name="backImageUrl"
                            value={product.backImageUrl}
                            onChange={(e) => setProduct({ ...product, backImageUrl: e.target.value })}
                            placeholder='back Image Url'
                            className='bg-slate-50 border text-zinc-700 border-zinc-300 px-2 py-2 w-96 rounded-md outline-none placeholder-slate-400'
                        />
                    </div>

                    <div className="mb-3">
                        <select
                            value={product.category}
                            onChange={(e) => {
                                const selectedCategory = e.target.value;
                                setProduct({ ...product, category: selectedCategory, subcategory: "" });
                                const subcat = categoryList.find(cat => cat.name === selectedCategory)?.subcategories || [];
                                setSubcategories(subcat);
                            }}
                            className='bg-slate-50 border text-zinc-700 border-zinc-300 px-2 py-2 w-96 rounded-md outline-none placeholder-slate-400'
                        >
                            <option disabled>Select Product Category</option>
                            {categoryList.map((value, index) => (
                                <option key={index} value={value.name}>{value.name}</option>
                            ))}
                        </select>
                    </div>

                    {subcategories.length > 0 && (
                        <div className="mb-3">
                            <select
                                value={product.subcategory}
                                onChange={(e) => setProduct({ ...product, subcategory: e.target.value })}
                                className='bg-slate-50 border text-zinc-700 border-zinc-300 px-2 py-2 w-96 rounded-md outline-none placeholder-slate-400'
                            >
                                <option disabled>Select Product Subcategory</option>
                                {subcategories.map((subcat, index) => (
                                    <option key={index} value={subcat}>{subcat}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    <div className="mb-3">
                        <textarea
                            value={product.description}
                            onChange={(e) => setProduct({ ...product, description: e.target.value })}
                            name="description"
                            placeholder="Product Description"
                            rows="5"
                            className='bg-slate-50 border text-zinc-700 border-zinc-300 px-2 py-2 w-96 rounded-md outline-none placeholder-slate-400'
                        />
                    </div>

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

                    <div className="mb-3">
                        <button
                            onClick={updateProduct}
                            type='button'
                            className='bg-slate-700 hover:bg-slate-800 w-full text-white text-center py-2 font-bold rounded-md'
                        >
                            Update Product
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateProductPage;

