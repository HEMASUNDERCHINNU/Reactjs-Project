import React from "react";
import { useContext, useEffect, useState } from "react";
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

const ProductInfo = () => {
    const { loading, setLoading } = useContext(myContext);
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const { id } = useParams();
    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    // Buy Now Modal State
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
                setProduct({ ...productTemp.data(), id: productTemp.id });
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
            dispatch(addToCart({ ...product, quantity }));
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
                orderDate: new Date().toISOString(),
            };

            await setDoc(doc(fireDB, "orders", `${product.id}_${Date.now()}`), order);
            toast.success("Order placed successfully");

            // Payment Integration
            var options = {
                key: "rzp_test_JTSHS6xRWbqqde",
                amount: product.price * quantity * 100,
                currency: "INR",
                name: "EliteMart",
                description: "Product Purchase",
                handler: function (response) {
                    const paymentId = response.razorpay_payment_id;
                    toast.success("Payment Successful");
                    console.log("Payment ID:", paymentId);
                },
                prefill: {
                    name: name,
                    email: email,
                    contact: phoneNumber,
                },
                theme: {
                    color: "#3399cc",
                },
            };
            var pay = new window.Razorpay(options);
            pay.open();
        } catch (error) {
            console.error(error);
            toast.error("Failed to place order");
        }
        setLoading(false);
    };

    return (
        <Layout>
            <section className="py-5 lg:py-16 font-poppins dark:bg-slate-50 min-h-140">
                {loading ? (
                    <div className="flex justify-center items-center">
                        <Loader />
                    </div>
                ) : (
                    product && (
                        <div className="max-w-6xl px-4 mx-auto">
                            <div className="flex flex-wrap -mx-4">
                                <div className="w-full md:w-1/2 px-4 mb-8 ">
                                    <img className="h-160 w-full pt-2 object-contain" src={product.productImageUrl} alt={product.title} />
                                </div>

                                <div className="w-full md:w-1/2 px-4">
                                    <h2 className="text-2xl font-semibold mb-2">{product.title}</h2>
                                    <p className="text-xl font-bold text-gray-900">₹ {product.price}</p>

                                    <div className="mt-4 flex items-center">
                                        <button onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)} className="px-3 py-1 bg-gray-200 rounded">-</button>
                                        <span className="px-4 text-lg">{quantity}</span>
                                        <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-1 bg-gray-200 rounded">+</button>
                                    </div>

                                    <div className="mb-6 mt-5">
                                        <h2 className="mb-2 text-lg font-bold text-gray-950">Description :</h2>
                                        <p>{product?.description}</p>
                                    </div>

                                    <div className="mt-6 flex gap-4">
                                        <button onClick={addCart} className="px-6 py-3 bg-orange-400 text-white font-bold rounded-lg w-full">Add to Cart</button>
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

                                    <div className="mt-6 border-t pt-4">
                                        <p>🚚 Free Shipping</p>
                                        <p>🔄 15 Days Return</p>
                                        <p>🔐 Secure Payment</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                )}
            </section>
        </Layout>
    );
};

export default ProductInfo;
