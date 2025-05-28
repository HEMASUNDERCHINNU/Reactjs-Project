import React from "react";
import { useNavigate, useParams } from "react-router";
import Layout from "../../components/layout/Layout";
import { useContext, useEffect, useState } from "react";
import myContext from "../../context/myContext";
import Loader from "../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";

const CategoryPage = () => {
    const { categoryname } = useParams();
    const context = useContext(myContext);
    const { getAllProduct, loading } = context;
    const navigate = useNavigate();
    
    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(0);
    const productsPerPage = 16;

    const [priceSort, setPriceSort] = useState("");
    const [selectedSubCategory, setSelectedSubCategory] = useState("");
    const [expandedCategories, setExpandedCategories] = useState([]);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {
        console.log("All Products:", getAllProduct);
        console.log("Category from URL:", categoryname);
    }, [getAllProduct, categoryname]);

    const filterProduct = getAllProduct && Array.isArray(getAllProduct)
        ? getAllProduct.filter((obj) => obj.category?.toLowerCase() === categoryname.toLowerCase())
        : [];

    let filtered = filterProduct;

    if (selectedSubCategory) {
        filtered = filtered.filter((product) => product.subCategory === selectedSubCategory);
    }

    if (priceSort === "lowToHigh") {
        filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (priceSort === "highToLow") {
        filtered = [...filtered].sort((a, b) => b.price - a.price);
    }

    const pageCount = Math.ceil(filtered.length / productsPerPage);
    const offset = currentPage * productsPerPage;
    const currentProducts = filtered.slice(offset, offset + productsPerPage);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
        window.scrollTo({ top: 0, behavior: "smooth" }); 
    };

    const subCategoriesMap = {
        Fashion: ["Men's Wear", "Women's Wear", "Kid's Wear"],
        Electronics: ["Laptops", "Cameras", "Audio"],
        Mobiles: ["Smartphones", "Feature Phones"],
        Shoes: ["Men's Shoes", "Women's Shoes"],
        Appliances: ["Kitchen", "Laundry"],
        'Home & Furniture': ["Living Room", "Bedroom"],
        Books: ["Fiction", "Non-fiction", "Academic"]
    };

    const toggleCategory = (category) => {
        if (expandedCategories.includes(category)) {
            setExpandedCategories(expandedCategories.filter((cat) => cat !== category));
        } else {
            setExpandedCategories([...expandedCategories, category]);
        }
    };

    return (
        <Layout>
            <div className="mt-35 flex min-h-140">
                {/* Sidebar Filters */}
                <aside className="w-1/4 p-4 border-r hidden lg:block">
                    <h2 className="text-xl font-semibold mb-4">Filters</h2>

                    {/* Price Sort */}
                    <div className="mb-6">
                        <h3 className="font-medium mb-2">Sort by Price</h3>
                        <select
                            className="w-full border p-2 rounded hover:border-blue-500"
                            value={priceSort}
                            onChange={(e) => setPriceSort(e.target.value)}
                        >
                            <option value="">Select</option>
                            <option value="lowToHigh">Low to High</option>
                            <option value="highToLow">High to Low</option>
                        </select>
                    </div>

                    {/* Subcategory Filter */}
                    <div className="mb-6">
                        <h3 className="font-medium mb-2 capitalize">{categoryname} Subcategories</h3>
                        {subCategoriesMap[categoryname] ? (
                            <ul className="space-y-2">
                                {subCategoriesMap[categoryname].map((subCat, idx) => (
                                    <li
                                        key={idx}
                                        className={`cursor-pointer p-2 rounded ${
                                            selectedSubCategory === subCat ? "bg-blue-200" : "hover:bg-gray-200"
                                        }`}
                                        onClick={() => setSelectedSubCategory(subCat)}
                                    >
                                        {subCat}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No subcategories available.</p>
                        )}
                    </div>
                </aside>

                {/* Product Grid */}
                <div className="w-full lg:w-3/4">
                    {loading ? (
                        <div className="flex justify-center">
                            <Loader />
                        </div>
                    ) : (
                        <section className="text-gray-600 body-font">
                            <div className="container mx-auto">
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                    {currentProducts.length > 0 ? (
                                        currentProducts.map((item, index) => {
                                            const { id, title, price, productImageUrl } = item;
                                            return (
                                                <div key={index} className="p-4 w-full">
                                                    <div className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                                                        <img
                                                            onClick={() => navigate(`/productinfo/${id}`)}
                                                            className="lg:h-60 h-40 w-full pt-2 object-contain hover:opacity-90"
                                                            src={productImageUrl}
                                                            alt={title}
                                                        />
                                                        <div className="p-6">
                                                            <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                                                                OnlineShopping
                                                            </h2>
                                                            <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                                                                {title.substring(0, 50)}
                                                            </h1>
                                                            <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                                                                ₹{new Intl.NumberFormat("en-IN").format(price || 0)}
                                                            </h1>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <div className="text-center mt-10">
                                            <img
                                                className="mx-auto w-24 h-24 mb-4"
                                                src="https://cdn-icons-png.flaticon.com/128/2748/2748614.png"
                                                alt="No products found"
                                            />
                                            <h1 className="text-black text-xl">No products found in "{categoryname}"</h1>
                                        </div>
                                    )}
                                </div>

                                {/* Pagination */}
                                {filtered.length > productsPerPage && (
                                    <div className="flex justify-center mt-8 mb-5">
                                        <ReactPaginate
                                            previousLabel={"< PREVIOUS"}
                                            nextLabel={"NEXT >"}
                                            breakLabel={"..."}
                                            pageCount={pageCount}
                                            marginPagesDisplayed={2}
                                            pageRangeDisplayed={5}
                                            onPageChange={handlePageClick}
                                            containerClassName={"flex space-x-3 items-center"}
                                            pageClassName={"px-4 py-2 rounded-full cursor-pointer hover:bg-blue-100"}
                                            activeClassName={"bg-blue-500 text-white font-bold"}
                                            previousClassName={"text-blue-500 cursor-pointer hover:underline"}
                                            nextClassName={"text-blue-500 cursor-pointer hover:underline"}
                                        />
                                    </div>
                                )}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default CategoryPage;
