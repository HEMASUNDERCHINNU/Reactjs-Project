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
        category: "",
        subcategory: "",
        description: "",
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", { month: "short", day: "2-digit", year: "numeric" })
    });

    const [subcategories, setSubcategories] = useState([]);

    const getSingleProductFunction = async () => {
        setLoading(true);
        try {
            const productTemp = await getDoc(doc(fireDB, "products", id));
            const product = productTemp.data();
            setProduct({
                title: product?.title,
                price: product?.price,
                productImageUrl: product?.productImageUrl,
                category: product?.category,
                subcategory: product?.subcategory || "",
                description: product?.description,
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

