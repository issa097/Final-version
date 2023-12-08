import React, { useState, useEffect } from "react";
import axios from "axios";
import Statics from "./Statics";

function UserTable() {
  const [users, setUsers] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/users")
      .then((response) => {
        console.log("API Response:", response.data);
        setUsers(response.data || []);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setUsers([]);
      });
  }, []);

  const handleDelete = (e, userId) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8000/deleteuser/${userId}`)
      .then(() => {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      })
      .catch((error) => console.error("Error deleting user:", error));
  };

  const handleEdit = (e, userId) => {
    e.preventDefault();
    setIsEditModalOpen(true);
    setSelectedUserId(userId);
  };

  return (
    <>
      <Statics />
      <div className="overflow-hidden rounded-lg border border-[#C08261] shadow-md m-5 ml-96 mt-30">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-[#C08261]">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Name
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                State
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Role
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Delete
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Edit
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {users.map((user, index) => (
              <tr
                key={user.user_id}
                className={`hover:bg-gray-50 ${
                  index % 2 !== 0 ? "bg-white" : "bg-[#F7F1EE]"
                }`}
              >
                <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                  <div className="relative h-10 w-10">
                    <img
                      className="h-full w-full rounded-full object-cover object-center"
                      src={user.user_img}
                      alt=""
                    />
                       <span
      className={`absolute right-0 bottom-0 h-2 w-2 rounded-full bg-${
        user.active ? "green" : "red"
      }-400 ring ring-white`}
    ></span>
                    {/* <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white"></span> */}
                  </div>
                  <div className="text-sm">
                    <div className="font-medium text-gray-700">
                      {user.username}
                    </div>
                    <div className="text-gray-400">{user.email}</div>
                  </div>
                </th>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full ${
                      user.active ? "bg-green-50" : "bg-red-50"
                    } px-2 py-1 text-xs font-semibold text-${
                      user.active ? "green" : "red"
                    }-600`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        user.active ? "bg-green-600" : "bg-red-600"
                      }`}
                    ></span>
                    {user.active ? "Active" : "Inactive"}
                  </span>
                </td>

                <td className="px-6 py-4">{user.role}</td>
                {/* <td className="px-6 py-4"></td> */}
                <td className="px-6 py-4 ">
                  <div className="flex justify-start gap-4">
                    <button
                      className="text-black "
                      onClick={(e) => handleDelete(e, user.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-start gap-4">
                    <button
                      className="text-black"
                      onClick={(e) => handleEdit(e, user.id)}
                    >
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default UserTable;
