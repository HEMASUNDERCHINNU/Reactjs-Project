
import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Company Info */}
        <div>
          <h2 className="text-2xl font-semibold">EliteMart</h2>
          <p className="text-gray-400 mt-2">
            Your one-stop shop for the best products at unbeatable prices.
          </p>
        </div>
        
        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-medium">Quick Links</h3>
          <ul className="mt-2 text-gray-400 space-y-2">
            <li><a href="/about" className="hover:text-white">About Us</a></li>
            <li><a href="/contact" className="hover:text-white">Contact Us</a></li>
            <li><a href="/allproduct" className="hover:text-white">Shop</a></li>
            <li><a className="hover:text-white">FAQs</a></li>
          </ul>
        </div>
        
        {/* Social Media */}
        <div>
          <h3 className="text-xl font-medium">Follow Us</h3>
          <div className="flex justify-center md:justify-start space-x-4 mt-2">
            <a href="#" className="text-gray-400 hover:text-white text-2xl"><FaFacebook /></a>
            <a href="#" className="text-gray-400 hover:text-white text-2xl"><FaTwitter /></a>
            <a href="#" className="text-gray-400 hover:text-white text-2xl"><FaInstagram /></a>
            <a href="#" className="text-gray-400 hover:text-white text-2xl"><FaLinkedin /></a>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} EliteMart. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;