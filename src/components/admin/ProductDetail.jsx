import React from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import Loader from "../loader/Loader";
import { deleteDoc, doc } from "firebase/firestore";
import { fireDB } from "../../firebase/Firebase";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import { TbEdit } from "react-icons/tb";

const ProductDetail = () => {
    const context = useContext(myContext);
    const { loading, setLoading, getAllProduct, getAllProductFunction } = context;
    // console.log(getAllProduct)

    // navigate 
    const navigate = useNavigate();

    // Delete product 
    const deleteProduct = async (id) => {
        setLoading(true)
        try {
            await deleteDoc(doc(fireDB, 'products', id))
            toast.success('Product Deleted successfully')
            getAllProductFunction(); 
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
    return (
        <div>
            <div className="py-5 flex justify-between items-center">
                {/* text  */}
                <h1 className=" text-xl text-blue-900 font-bold">All Product</h1>
                {/* Add Product Button  */}
                <Link to={'/addproduct'}>
                    <button className="px-5 py-2 bg-blue-300 border border-slate-100 rounded-lg font-bold">Add Product</button>
                </Link>
            </div>

            {/* Loading  */}
            <div className="flex justify-center relative top-20">
                {loading && <Loader />}
            </div>

            {/* table  */}
            <div className="w-full overflow-x-auto mb-5">

                <table className="w-full text-left border border-collapse sm:border-separate border-slate-300" >

                    <tbody>
                        <tr>
                            <th scope="col" className="h-12 px-6 border-zinc-300 bg-slate-200 font-bold">S.No.</th>
                            <th scope="col" className="h-12 px-6 border-zinc-300 bg-slate-200 font-bold">Image</th>
                            <th scope="col" className="h-12 px-6 border-zinc-300 bg-slate-200 font-bold">Title</th>
                            <th scope="col" className="h-12 px-6 border-zinc-300 bg-slate-200 font-bold">Price</th>
                            <th scope="col" className="h-12 px-6 border-zinc-300 bg-slate-200 font-bold">Category</th>
                            <th scope="col" className="h-12 px-6 border-zinc-300 bg-slate-200 font-bold"> Date</th>
                            <th scope="col" className="h-12 px-6 border-zinc-300 bg-slate-200 font-bold">Action</th>
                            <th scope="col"className="h-12 px-6 border-zinc-300 bg-slate-200 font-bold">Action</th>
                        </tr>
                        {getAllProduct.map((item, index) => {
                            const { id, title, price, category, date, productImageUrl } = item
                            return (
                                <tr key={index} className="text-pink-300">
                                    <td className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">
                                        {index + 1}.
                                    </td>
                                    <td className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">
                                        <div className="flex justify-center">
                                            <img className="w-20 " src={productImageUrl} alt="" />
                                        </div>
                                    </td>
                                    <td className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">
                                        {title}
                                    </td>
                                    <td className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">
                                        ₹{price}
                                    </td>
                                    <td className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">
                                        {category}
                                    </td>
                                    <td className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">
                                        {date}
                                    </td>
                                    <td onClick={()=> navigate(`/updateproduct/${id}`)} className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 cursor-pointer">
                                    <TbEdit />
                                    </td>
                                    <td onClick={()=> deleteProduct(id)} className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 cursor-pointer">
                                    <MdDelete />
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ProductDetail;