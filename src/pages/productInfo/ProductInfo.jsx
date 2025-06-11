// ... existing imports
import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/myContext";
import { useParams } from "react-router";
import { fireDB } from "../../firebase/Firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Loader from "../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";
import BuyNowModal from "../../components/buyNowModal/BuyNowModal";
import { Dialog } from "@headlessui/react";

const ProductInfo = () => {
  const { loading, setLoading } = useContext(myContext);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  const { id } = useParams();
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const getProductData = async () => {
      setLoading(true);
      try {
        const productTemp = await getDoc(doc(fireDB, "products", id));
        const data = { ...productTemp.data(), id: productTemp.id };
        setProduct(data);
        setSelectedImage(data.productImageUrl);
        setSelectedColor(data.colors?.[0] || "");
        setSelectedSize(data.sizes?.[0] || "");
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    getProductData();
  }, [id, setLoading]);

  const addCart = () => {
    if (cartItems.some((cartItem) => cartItem.id === product.id)) {
      toast.error("Product is already in the cart");
    } else {
      dispatch(addToCart({ ...product, quantity, selectedColor, selectedSize }));
      toast.success("Added to cart");
    }
  };

  const buyNow = async () => {
    if (!name || !address || !pincode || !phoneNumber || !email) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      const order = {
        productId: product.id,
        title: product.title,
        price: product.price,
        quantity,
        name,
        address,
        pincode,
        phoneNumber,
        email,
        selectedColor,
        selectedSize,
        orderDate: new Date().toISOString(),
      };

      await setDoc(doc(fireDB, "orders", `${product.id}_${Date.now()}`), order);
      toast.success("Order placed successfully");

      const options = {
        key: "rzp_test_JTSHS6xRWbqqde",
        amount: product.price * quantity * 100,
        currency: "INR",
        name: "OnlineShopping",
        description: "Product Purchase",
        handler: function (response) {
          toast.success("Payment Successful");
          console.log("Payment ID:", response.razorpay_payment_id);
        },
        prefill: {
          name,
          email,
          contact: phoneNumber,
        },
        theme: { color: "#3399cc" },
      };

      const pay = new window.Razorpay(options);
      pay.open();
    } catch (error) {
      console.error(error);
      toast.error("Failed to place order");
    }
    setLoading(false);
  };

  return (
    <Layout>
      <section className="py-6 lg:py-16 font-poppins dark:bg-slate-50 min-h-140">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          product && (
            <div className="max-w-6xl px-4 mx-auto">
              <div className="flex flex-wrap -mx-4">
                <div className="w-full md:w-1/2 px-4 mb-8">
                  <div
                    className="border rounded overflow-hidden cursor-zoom-in"
                    onClick={() => setIsZoomOpen(true)}
                  >
                    <img
                      src={selectedImage}
                      alt="Product"
                      className="w-full h-[400px] object-contain hover:scale-105 transition"
                    />
                  </div>
                  <div className="flex gap-3 mt-4">
                    {[product.productImageUrl, product.sideImageUrl, product.backImageUrl].map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        className={`w-20 h-20 object-cover border-2 rounded-md cursor-pointer ${
                          selectedImage === img ? "border-blue-500" : "border-gray-300"
                        }`}
                        onClick={() => setSelectedImage(img)}
                      />
                    ))}
                  </div>
                </div>

                <div className="w-full md:w-1/2 px-4">
                  <h2 className="text-2xl font-semibold mb-2">{product.title}</h2>
                  <p className="text-xl font-bold text-gray-900">₹ {product.price}</p>

                  {product.colors && (
                    <div className="mt-4">
                      <label className="block text-sm font-semibold mb-1">Color:</label>
                      <div className="flex gap-2">
                        {product.colors.map((color) => (
                          <button
                            key={color}
                            onClick={() => setSelectedColor(color)}
                            className={`px-3 py-1 border rounded ${
                              selectedColor === color ? "bg-blue-600 text-white" : "bg-white border-gray-300"
                            }`}
                          >
                            {color}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {product.sizes && (
                    <div className="mt-4">
                      <label className="block text-sm font-semibold mb-1">Size:</label>
                      <div className="flex gap-2">
                        {product.sizes.map((size) => (
                          <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`px-3 py-1 border rounded ${
                              selectedSize === size ? "bg-green-600 text-white" : "bg-white border-gray-300"
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-4 flex items-center">
                    <button
                      onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                      className="px-3 py-1 bg-gray-200 rounded"
                    >
                      -
                    </button>
                    <span className="px-4 text-lg">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-1 bg-gray-200 rounded"
                    >
                      +
                    </button>
                  </div>

                  <div className="mb-6 mt-5">
                    <h2 className="mb-2 text-lg font-bold text-gray-950">Description :</h2>
                    <p>{product?.description}</p>
                  </div>

                  <div className="mt-6 flex gap-4">
                    <button
                      onClick={addCart}
                      className="px-6 py-3 bg-orange-400 text-white font-bold rounded-lg w-full"
                    >
                      Add to Cart
                    </button>
                    <BuyNowModal
                      name={name}
                      address={address}
                      pincode={pincode}
                      phoneNumber={phoneNumber}
                      email={email}
                      setName={setName}
                      setAddress={setAddress}
                      setPincode={setPincode}
                      setPhoneNumber={setPhoneNumber}
                      setEmail={setEmail}
                      buyNow={buyNow}
                    />
                  </div>

                  <div className="mt-6 border-t pt-4 text-sm text-gray-700">
                    <p>🚚 Free Shipping</p>
                    <p>🔄 15 Days Return</p>
                    <p>🔐 Secure Payment</p>
                  </div>
                </div>
              </div>

              <Dialog open={isZoomOpen} onClose={() => setIsZoomOpen(false)} className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
                <Dialog.Panel className="max-w-3xl mx-auto">
                  <img src={selectedImage} alt="Zoomed" className="rounded-lg" />
                </Dialog.Panel>
              </Dialog>
            </div>
          )
        )}
      </section>
    </Layout>
  );
};

export default ProductInfo;
