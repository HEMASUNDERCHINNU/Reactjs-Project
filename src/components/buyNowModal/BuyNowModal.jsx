import React from "react";
import {
    Button,
    Dialog,
    DialogBody,
} from "@material-tailwind/react";
import { useState } from "react";

const BuyNowModal = ({ name, address, pincode, phoneNumber,email, setName, setAddress, setPincode, setPhoneNumber,setEmail, buyNow }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);
    return (
        <>
            <Button
                type="button"
                onClick={handleOpen}
                className="w-full px-4 py-3 text-center text-white bg-orange-600 rounded-xl"
            >
                Buy now
            </Button>
            <Dialog open={open} handler={handleOpen} className=" bg-slate-100">
                <DialogBody className="p-5">
                    <h1 className="font-bold text-2xl pl-1 p-5 ">Shipping Address</h1>
                    <div className="mb-3">
                        <label className="font-medium">Name*</label>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value ) }
                        placeholder='Enter your name'
                        className='bg-gray-100 border border-gray-300 px-2 py-2 w-full rounded-md  placeholder-slate-400'
                        />
                    </div>
                    <div className="mb-3">
                    <label className="font-medium">Address*</label>
                        <input
                            type="text"
                            name="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder='Enter your address'
                        className='bg-gray-100 border border-gray-300 px-2 py-2 w-full rounded-md  placeholder-slate-400'
                        />
                    </div>

                    <div className="mb-3">
                    <label className="font-medium">Pincode*</label>
                        <input
                            type="number"
                            name="pincode"
                            value={pincode}
                            onChange={(e) => setPincode(e.target.value)}
                            placeholder='Enter your pincode'
                            className='bg-gray-100 border border-gray-300 px-2 py-2 w-full rounded-md  placeholder-slate-400'

                        />
                    </div>

                    <div className="mb-3">
                    <label className="font-medium">Phone Number*</label>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder='Enter your phoneNumber'
                            className='bg-gray-100 border border-gray-300 px-2 py-2 w-full rounded-md placeholder-slate-400'

                        />
                    </div>
                    <div className="mb-3">
                    <label className="font-medium">Email Address*</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value ) }
                        placeholder='Enter your name'
                        className='bg-gray-100 border border-gray-300 px-2 py-2 w-full rounded-md placeholder-slate-400 mb-3'

                        />
                    </div>

                    <div className="">
                        <Button
                            type="button"
                            onClick={() => {
                                handleOpen();
                                buyNow();
                            }}
                            className="w-full px-4 py-3 text-center text-gray-100 bg-slate-800 hover:bg-stone-800 rounded-lg mb-5"
                            >
                            Buy now
                        </Button>
                    </div>

                </DialogBody>
            </Dialog>
        </>
    );
}

export default BuyNowModal;




