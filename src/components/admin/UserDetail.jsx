import React from "react";
import { useContext, useEffect } from "react";
import myContext from "../../context/myContext";

const UserDetail = () => {
    const { getAllUser, getAllUserFunction } = useContext(myContext);

    useEffect(() => {
        getAllUserFunction();
    }, []);

    return (
        <div>
            <h1 className="text-xl text-blue-800 font-bold mt-5 mb-5">All Users</h1>
            <div className="w-full overflow-x-auto mb-10">
                <table className="w-full text-left border border-collapse sm:border-separate border-slate-200 text-blue-800">
                    <thead>
                        <tr>
                            <th className="h-12 px-6 border-zinc-300 bg-slate-200 font-bold">S.No.</th>
                            <th className="h-12 px-6 border-zinc-300 bg-slate-200 font-bold">Name</th>
                            <th className="h-12 px-6 border-zinc-300 bg-slate-200 font-bold">Email</th>
                            <th className="h-12 px-6 border-zinc-300 bg-slate-200 font-bold">Uid</th>
                            <th className="h-12 px-6 border-zinc-300 bg-slate-200 font-bold">Role</th>
                            <th className="h-12 px-6 border-zinc-300 bg-slate-200 font-bold">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getAllUser.length > 0 ? (
                            getAllUser.map((user, index) => (
                                <tr key={user.id} className="text-slate-600">
                                    <td className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">{index + 1}</td>
                                    <td className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">{user.name || "N/A"}</td>
                                    <td className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">{user.email || "N/A"}</td>
                                    <td className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">{user.uid || "N/A"}</td>
                                    <td className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">{user.role || "User"}</td>
                                    <td className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">{user.date || "N/A"}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center py-4">No users found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserDetail;
