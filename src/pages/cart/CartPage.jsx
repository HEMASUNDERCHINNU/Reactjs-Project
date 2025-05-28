import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/layout/Layout";
import { Trash } from 'lucide-react'
import { decrementQuantity, deleteFromCart, incrementQuantity, clearCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { IoArrowBackCircle } from "react-icons/io5";
import { Link, Navigate } from "react-router-dom";
import BuyNowModal from "../../components/buyNowModal/BuyNowModal";
import { collection, addDoc } from "firebase/firestore";
import { fireDB } from "../../firebase/Firebase";


const CartPage = () => {
    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const deleteCart = (item) => {
        dispatch(deleteFromCart(item));
        toast.success("Item removed from cart")
    }

    const handleIncrement = (id) => {
        dispatch(incrementQuantity(id));
    };

    const handleDecrement = (id) => {
        // Check if quantity is greater than 1 before decrementing
        const item = cartItems.find((item) => item.id === id);
        if (item.quantity > 1) {
            dispatch(decrementQuantity(id));
        }
    };


    // const cartQuantity = cartItems.length;

    const cartItemTotal = cartItems.map(item => item.quantity).reduce((prevValue, currValue) => prevValue + currValue, 0);

    const cartTotal = cartItems.map(item => item.price * item.quantity).reduce((prevValue, currValue) => prevValue + currValue, 0);


    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems])

    // user
    const user = JSON.parse(localStorage.getItem('users'))

    // Buy Now Function
    const [name, setName] = useState("")
    const [address, setAddress] = useState("");
    const [pincode, setPincode] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")

    const buyNow = async () => {
        // validation 
        if (name === "" || address == "" || pincode == "" || phoneNumber == "") {
            return toast.error("All Fields are required")
        }

        const addressInfo = {
            name,
            address,
            pincode,
            phoneNumber,
            date: new Date().toLocaleString(
                "en-US",
                {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                }
            )
        }
        console.log(addressInfo)

        var options = {
            key: "rzp_test_JTSHS6xRWbqqde",
            amount: parseInt(cartTotal * 100),
            currency: "INR",
            order_receipt: 'order_rcptid_' + name,
            name: "EliteMart",
            description: "for testing purpose",
            handler: function (response) {

                // console.log(response)
                // toast.success('Payment Successful')

                const paymentId = response.razorpay_payment_id
                // store in firebase 
                const orderInfo = {
                    cartItems,
                    addressInfo,
                    email: user.email,
                    userid: user.uid,
                    status: "confirmed",
                    date: new Date().toLocaleString(
                        "en-US",
                        {
                            month: "short",
                            day: "2-digit",
                            year: "numeric",
                        }
                    ),

                    paymentId
                }

                try {
                    const orderRef = collection(fireDB, 'order');
                    addDoc(orderRef, orderInfo);

                    // Clear the cart after order completion
                    dispatch(clearCart());

                    setAddress({
                        name: "",
                        address: "",
                        pincode: "",
                        mobileNumber: "",
                    })
                    toast.success("Order Placed Successfull")
                } catch (error) {
                    console.log(error)
                }
            },

            theme: {
                color: "#3399cc"
            }
        };
        var pay = new window.Razorpay(options);
        pay.open();
        console.log(pay)
    }



    return (
        <Layout>
            <div className="container mx-auto px-4 max-w-7xl px-2 lg:px-0 mt-20">
                <div className="mx-auto max-w-2xl py-8 lg:max-w-7xl">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Shopping Cart
                    </h1>
                    <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
                        <section aria-labelledby="cart-heading" className="rounded-lg bg-white lg:col-span-8">

                            <ul role="list" className="divide-y divide-gray-200">
                                {cartItems.length > 0 ?

                                    <>
                                        {cartItems.map((item, index) => {
                                            const { id, title, price, productImageUrl, quantity, category } = item
                                            return (
                                                <div key={index} className="">
                                                    <li className="flex py-6 sm:py-6 ">
                                                        <div className="flex-shrink-0">
                                                            <img
                                                                src={productImageUrl}
                                                                alt="img"
                                                                className="sm:h-38 sm:w-38 h-24 w-24 rounded-md object-contain object-center"
                                                            />
                                                        </div>

                                                        <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                                                            <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                                                                <div>
                                                                    <div className="flex justify-between">
                                                                        <h3 className="text-sm">
                                                                            <div className="font-semibold text-black">
                                                                                {title}
                                                                            </div>
                                                                        </h3>
                                                                    </div>
                                                                    <div className="mt-1 flex text-sm">
                                                                        <p className="text-sm text-gray-500">{category}</p>
                                                                    </div>
                                                                    <div className="mt-1 flex items-end">
                                                                        <p className="text-sm font-medium text-gray-900">
                                                                            ₹{price}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <div className="mb-2 flex">
                                                        <div className="min-w-24 flex">
                                                            <button onClick={() => handleDecrement(id)} type="button" className="h-7 w-7" >
                                                                -
                                                            </button>
                                                            <input
                                                                type="text"
                                                                className="mx-1 h-7 w-9 rounded-md border text-center"
                                                                value={quantity}
                                                            />
                                                            <button onClick={() => handleIncrement(id)} type="button" className="flex h-7 w-7 items-center justify-center">
                                                                +
                                                            </button>
                                                        </div>
                                                        <div className="ml-6 flex text-sm">
                                                            <button onClick={() => deleteCart(item)} type="button" className="flex items-center space-x-1 px-2 py-1 pl-0">
                                                                <Trash size={12} className="text-red-500" />
                                                                <span className="text-xs font-medium text-red-500">Remove</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </>
                                    :

                                    <div className="flex flex-col items-center justify-center text-center py-10">
                                        <img src="https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90" alt="" className="w-65 h-50 " />
                                        <h1 className="text-lg">Your cart is empty!</h1>
                                        <p className="text-xs">Explore our wide selection and find something you like</p>
                                    </div>
                                }
                            </ul>
                        </section>
                        
                        {/* Order summary */}
                        {cartItems.length > 0 && (
                            <section
                                aria-labelledby="summary-heading"
                                className="mt-16 rounded-md bg-white lg:col-span-4 lg:mt-0 lg:p-0"
                            >
                                <h2
                                    id="summary-heading"
                                    className=" border-b border-gray-200 px-4 py-3 text-lg font-medium text-gray-900 sm:p-4"
                                >
                                    Price Details
                                </h2>
                                <div>
                                    <dl className="space-y-1 px-2 py-4">
                                        <div className="flex items-center justify-between">
                                            <dt className="text-sm text-gray-800">Price ({cartItemTotal} item)</dt>
                                            <dd className="text-sm font-medium text-gray-900">₹ {cartTotal}</dd>
                                        </div>
                                        <div className="flex items-center justify-between py-4">
                                            <dt className="flex text-sm text-gray-800">
                                                <span>Delivery Charges</span>
                                            </dt>
                                            <dd className="text-sm font-medium text-green-700">Free</dd>
                                        </div>
                                        <div className="flex items-center justify-between border-y border-dashed py-4">
                                            <dt className="text-base font-medium text-gray-900">Total Amount</dt>
                                            <dd className="text-base font-medium text-gray-900">₹ {cartTotal}</dd>
                                        </div>
                                    </dl>
                                    <div className="px-2 pb-4 font-medium text-green-700">
                                        <div className="flex gap-4 mb-6">
                                            {user ? (
                                                <BuyNowModal
                                                    name={name}
                                                    address={address}
                                                    pincode={pincode}
                                                    phoneNumber={phoneNumber}
                                                    setName={setName}
                                                    setAddress={setAddress}
                                                    setPincode={setPincode}
                                                    setPhoneNumber={setPhoneNumber}
                                                    buyNow={buyNow}
                                                />
                                            ) : (
                                                <Navigate to={'/login'} />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </section>
                        )}

                    </div>
                </div>
                <Link to={'/'}>
                    <button className="bg-blue-900 text-white font-bold rounded-2xl p-2 mb-15 pl-2 pr-5 flex items-center space-x-2 text-xs">
                        <IoArrowBackCircle className="w-7 h-7" />
                        <span>CONTINUE SHOPPING</span>
                    </button>
                </Link>

            </div>
        </Layout>
    );
}

export default CartPage;

