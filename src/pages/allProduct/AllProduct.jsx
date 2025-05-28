
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import ReactPaginate from "react-paginate";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/myContext";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import Loader from "../../components/loader/Loader";
import { ChevronDown, ChevronUp, Filter } from "lucide-react";

const AllProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const context = useContext(myContext);
  const { loading, getAllProduct } = context;
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [filteredProducts, setFilteredProducts] = useState(getAllProduct);

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 20;

  // Filter States
  const [priceSort, setPriceSort] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [expandedCategories, setExpandedCategories] = useState([]);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Get search query from URL
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("search");

  // Extract unique categories and order them
  const uniqueCategories = [...new Set(getAllProduct.map((product) => product.category))];

  // Remove duplicates for "Fashion"
  const filteredCategories = uniqueCategories.filter(
    (cat) => cat !== "Fashion"
  );

  // Final ordered categories list
  const categories = ["All Categories", "Fashion", ...filteredCategories];

  const subCategoriesMap = {
    Fashion: ["Men's Wear", "Women's Wear", "Kid's Wear"],
    Electronics: ["Laptops", "Cameras", "Audio"],
    Mobiles: ["Smartphones", "Feature Phones"],
    Shoes: ["Men's Shoes", "Women's Shoes"],
    Appliances: ["Kitchen", "Laundry"],
    'Home & Furniture': ["Living Room", "Bedroom"],
    Books: ['Fiction', 'Non-fiction', 'Academic']
  };

  useEffect(() => {
    let filtered = getAllProduct;

    // Search Filter
    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category Filter
    if (selectedCategory && selectedCategory !== "All Categories") {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }

    // Subcategory Filter
    if (selectedSubCategory) {
      filtered = filtered.filter((product) => product.subCategory === selectedSubCategory);
    }

    // Price Sorting
    if (priceSort === "lowToHigh") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (priceSort === "highToLow") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, selectedSubCategory, priceSort, getAllProduct]);

  // Pagination Logic
  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentItems = filteredProducts.slice(offset, offset + itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const toggleCategory = (category) => {
    if (expandedCategories.includes(category)) {
      setExpandedCategories(expandedCategories.filter((cat) => cat !== category));
    } else {
      setExpandedCategories([...expandedCategories, category]);
    }
  };

  return (
    <Layout>
      <div className="min-h-180 mt-10">
        {/* Loading */}
        <div className="flex justify-center relative top-20">
          {loading && <Loader />}
        </div>

        <div className="py-8 mt-15 flex">
          {/* Sidebar Filters - Desktop */}
          <aside className="w-1/4 p-4 border-r hidden lg:block">
            <h2 className="text-xl font-semibold mb-4">Filters</h2>

            {/* Price Sort Dropdown */}
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

            {/* Category Filter */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Category</h3>
              <ul className="space-y-2">
                {categories.map((category, idx) => (
                  <li key={idx} className="cursor-pointer">
                    <div
                      className={`flex justify-between items-center p-2 rounded ${selectedCategory === category ? "bg-blue-100" : "hover:bg-gray-200"
                        }`}
                      onClick={() => {
                        if (category === "All Categories") {
                          setSelectedCategory("");
                          setSelectedSubCategory("");
                        } else {
                          setSelectedCategory(category);
                          setSelectedSubCategory("");
                          toggleCategory(category);
                        }
                      }}
                    >
                      <span>{category}</span>
                      {subCategoriesMap[category] && (
                        expandedCategories.includes(category) ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                      )}
                    </div>
                    {/* Subcategories */}
                    {expandedCategories.includes(category) && subCategoriesMap[category] && (
                      <ul className="ml-4 mt-2 space-y-1">
                        {subCategoriesMap[category].map((subCat, subIdx) => (
                          <li
                            key={subIdx}
                            className={`cursor-pointer p-1 rounded ${selectedSubCategory === subCat ? "bg-blue-200" : "hover:bg-gray-100"
                              }`}
                            onClick={() => setSelectedSubCategory(subCat)}
                          >
                            {subCat}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="w-full lg:w-3/4">
            <section className="text-gray-600 body-font">
              <div className="container lg:px-0 mx-auto">
                {/* Mobile Filter Button */}
                <div className="flex justify-end lg:hidden mb-4 px-4">
                  <button
                    className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg"
                    onClick={() => setMobileFilterOpen(true)}
                  >
                    <Filter className="mr-2" /> Filter
                  </button>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4">
                  {currentItems.map((item, index) => {
                    const { id, title, price, productImageUrl } = item;
                    return (
                      <div key={index} className="p-2">
                        <div
                          className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer hover:shadow-lg transition-transform transform hover:scale-105"
                          onClick={() => navigate(`/productinfo/${id}`)}
                        >
                          <img
                            className="lg:h-60 h-40 w-full pt-2 object-contain"
                            src={productImageUrl}
                            alt="product"
                          />
                          <div className="p-4">
                            <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                              OnlineShopping
                            </h2>
                            <h1 className="title-font md:text-sm lg:text-lg font-medium text-gray-900 mb-3">
                              {title.length > 50 ? title.substring(0, 50) + "..." : title}
                            </h1>
                            <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                              ₹{price}
                            </h1>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Pagination Component */}
                <div className="flex justify-center mt-8">
                  <ReactPaginate
                    previousLabel={"< PREVIOUS"}
                    nextLabel={"NEXT >"}
                    breakLabel={"..."}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={"flex space-x-3 items-center"}
                    pageClassName={"px-4 py-2 rounded-full cursor-pointer hover:bg-gray-300"}
                    activeClassName={"bg-blue-500 text-white font-bold"}
                    previousClassName={"text-blue-500 cursor-pointer"}
                    nextClassName={"text-blue-500 cursor-pointer"}
                  />
                </div>
              </div>

              {/* Mobile Filter Modal */}
              {mobileFilterOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
                  <div className="w-3/4 bg-white h-full p-4 overflow-y-auto">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-semibold">Filters</h2>
                      <button onClick={() => setMobileFilterOpen(false)}>X</button>
                    </div>

                    {/* Filters in Mobile */}
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

                    {/* Category Filter */}
                    <div className="mb-6">
                      <h3 className="font-medium mb-2">Category</h3>
                      <ul className="space-y-2">
                        {categories.map((category, idx) => (
                          <li key={idx} className="cursor-pointer">
                            <div
                              className={`flex justify-between items-center p-2 rounded ${selectedCategory === category ? "bg-blue-100" : "hover:bg-gray-200"
                                }`}
                              onClick={() => {
                                if (category === "All Categories") {
                                  setSelectedCategory("");
                                  setSelectedSubCategory("");
                                } else {
                                  setSelectedCategory(category);
                                  setSelectedSubCategory("");
                                  toggleCategory(category);
                                }
                              }}
                            >
                              <span>{category}</span>
                              {subCategoriesMap[category] && (
                                expandedCategories.includes(category) ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                              )}
                            </div>
                            {expandedCategories.includes(category) && subCategoriesMap[category] && (
                              <ul className="ml-4 mt-2 space-y-1">
                                {subCategoriesMap[category].map((subCat, subIdx) => (
                                  <li
                                    key={subIdx}
                                    className={`cursor-pointer p-1 rounded ${selectedSubCategory === subCat ? "bg-blue-200" : "hover:bg-gray-100"
                                      }`}
                                    onClick={() => setSelectedSubCategory(subCat)}
                                  >
                                    {subCat}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Apply Button */}
                    <button
                      className="w-full bg-blue-500 text-white py-2 rounded-lg"
                      onClick={() => setMobileFilterOpen(false)}
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AllProduct;