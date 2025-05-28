import React from "react";
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { TbLogout2 } from "react-icons/tb";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";
import { TiShoppingCart } from "react-icons/ti";
import { BsFillBoxSeamFill } from "react-icons/bs";
import { FaRegCircleUser } from "react-icons/fa6";

const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("users"));
    setUser(user);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const logout = () => {
    localStorage.removeItem("users");
    setUser(null);
    navigate("/login");
  };

  const cartItems = useSelector((state) => state.cart);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/allproduct?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <nav className="bg-white shadow-md p-4 fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex items-center justify-between">
        {/* Left Section */}
        <div className="flex gap-2">
          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-700" onClick={() => setMenuOpen(true)}>
            ☰
          </button>

          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-900">
            OnlineShopping
          </Link>
        </div>

        {/* Navigation Menu for Laptops */}
        <ul className="hidden md:flex space-x-6 text-gray-700 font-semibold">
          <li className="cursor-pointer hover:text-rose-900"><Link to="/">Home</Link></li>
          <li className="cursor-pointer hover:text-rose-900"><Link to="/about">About</Link></li>
          <li className="cursor-pointer hover:text-rose-900"><Link to="/contact">Contact</Link></li>
          <li className="cursor-pointer hover:text-rose-900"><Link to="/allproduct">All Products</Link></li>
        </ul>

        {/* Search Bar (Inline for Desktop only) */}
        <form onSubmit={handleSearch} className="hidden lg:flex items-center border rounded-lg px-4 py-2 w-1/3">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search for Products, Brands and More..."
            className="outline-none w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          <Link to="/cart" className="relative">
            <TiShoppingCart className="text-gray-700 cursor-pointer hover:text-slate-600" size={30} />
            {cartItems?.length > 0 && (
              <span className="absolute -top-2 -right-1 bg-orange-500 text-white text-[10px] p-1 rounded-full font-bold">
                {cartItems.length}
              </span>
            )}
          </Link>

          {/* Profile Section */}
          <div className="relative">
            {user ? (
              <div className="flex items-center gap-2 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                <span className="hidden lg:inline">{user?.name}</span>
                <FaRegCircleUser className="text-gray-700 hover:text-slate-600" size={21} />
              </div>
            ) : (
              <Link to="/login" className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-800">
                Login
              </Link>
            )}

            {isOpen && user && (
              <div className="absolute right-0 mt-2 w-60 bg-cyan-900 shadow-lg rounded-lg py-2 z-50">
                <h1 className="pl-5 pt-5 pb-2 text-white">
                  Hello! <span className="font-bold text-md">{user?.name}</span>
                </h1>
                <hr />
                {user?.role === "user" && (
                  <Link to="/user-dashboard" className="block px-4 py-2 hover:bg-cyan-700 text-white flex items-center gap-2">
                    <BsFillBoxSeamFill /> My Orders
                  </Link>
                )}
                {user?.role === "admin" && (
                  <Link to="/admin-dashboard" className="block px-4 py-2 hover:bg-cyan-700 text-white">
                    Admin Dashboard
                  </Link>
                )}
                <span onClick={logout} className="block px-4 py-2 hover:bg-cyan-700 cursor-pointer flex items-center gap-2 text-white">
                  <TbLogout2 /> Logout
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Search Bar - Below Navbar for Tablet & Mobile */}
      <div className="lg:hidden px-4 mt-3">
        <form onSubmit={handleSearch} className="flex items-center border rounded-lg px-4 py-2 w-full sm:w-2/3 mx-auto">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search for Products, Brands and More..."
            className="outline-none w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
      </div>

      {/* Mobile Sidebar Menu */}
      <div
        className={`md:hidden fixed top-0 left-0 w-64 h-full bg-white shadow-lg transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="p-4 flex justify-between items-center">
          <h2 className="text-lg font-bold text-blue-900">EliteMart</h2>
          <button onClick={() => setMenuOpen(false)}>
            <IoMdClose size={24} className="text-gray-700" />
          </button>
        </div>

        <ul className="flex flex-col space-y-4 px-4 text-gray-700 font-semibold">
          <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link to="/about" onClick={() => setMenuOpen(false)}>About</Link></li>
          <li><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>
          <li><Link to="/allproduct" onClick={() => setMenuOpen(false)}>All Products</Link></li>
        </ul>
      </div>

      {menuOpen && <div className="md:hidden fixed inset-0 bg-black opacity-50 z-40" onClick={() => setMenuOpen(false)}></div>}
    </nav>
  );
};

export default NavigationBar;
