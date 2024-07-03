import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./index";
const Pagination = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [editUserId, setEditUserId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const usersPerPage = 5;

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users"));
    setUsers(storedUsers);
  }, []);

  //pagination
  const lastPage = page * usersPerPage;
  const currentPage = lastPage - usersPerPage;
  const currentUsers = users?.slice(currentPage, lastPage);
  const totalPages = Math.ceil(users.length / usersPerPage);

  //changing pages
  const handlePage = (selectedPage) => {
    setPage(selectedPage);
  };

  //editing user
  const handleEdit = (userId) => {
    const userToEdit = users.find((user) => user.id === userId);
    setEditUserId(userId);
    setEditFormData(userToEdit);
  };

  //tracking input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value,
    });
  };
  //updating user changes in localstorage
  const handleUpdatedSave = () => {
    const updatedUsers = users.map((user) =>
      user.id === editUserId ? { ...editFormData } : user
    );
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setEditUserId(null);
  };

  //deleting user
  const handleDelete=(userId)=>{
        const updatedUsers=users.filter(user=>user.id!==userId)
        setUsers(updatedUsers)
        localStorage.setItem("users",JSON.stringify(updatedUsers))
  }
  return (
    <div className="p-10">
      <Link to="/">
        <h4 className="ml-7 border border-gray-500 w-36 text-center hover:text-gray-500 cursor-pointer">
          {" "}
          Go back to form
        </h4>
      </Link>
      <div className="w-full flex flex-col items-center justify-center py-10 gap-10">
        <div className="flex flex-col items-center">
          <h2 className="font-bold text-3xl">Users</h2>
          <p>Listed only five users a page</p>
        </div>
        {currentUsers.length > 0 ? (
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>DOB</th>
                <th>City</th>
                <th>Province</th>
                <th>Country</th>
                <th>Profile Picture</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user, i) => (
                <tr key={user.id} className="text-center p-5 space-y-5">
                  <td>
                    {editUserId === user.id ? (
                      <input
                        type="text"
                        name="name"
                        value={editFormData.name}
                        onChange={handleInputChange}
                        className="w-20 px-3"
                      />
                    ) : (
                      user.name
                    )}
                  </td>
                  <td>
                    {editUserId === user.id ? (
                      <input
                        type="text"
                        name="email"
                        value={editFormData.email}
                        onChange={handleInputChange}
                      />
                    ) : (
                      user.email
                    )}
                  </td>
                  <td>
                    {editUserId === user.id ? (
                      <input
                        type="text"
                        name="phone"
                        value={editFormData.phone}
                        onChange={handleInputChange}
                        className="w-32 px-3"
                      />
                    ) : (
                      user.phone
                    )}
                  </td>
                  <td>
                    {editUserId === user.id ? (
                      <input
                        type="date"
                        name="dob"
                        value={editFormData.dob}
                        onChange={handleInputChange}
                      />
                    ) : (
                      user.dob
                    )}
                  </td>
                  <td>
                    {editUserId === user.id ? (
                      <input
                        type="text"
                        name="city"
                        value={editFormData.city}
                        onChange={handleInputChange}
                        className="w-28 px-3"
                      />
                    ) : (
                      user.city
                    )}
                  </td>
                  <td>
                    {editUserId === user.id ? (
                      <input
                        type="text"
                        name="province"
                        value={editFormData.province}
                        onChange={handleInputChange}
                        className="w-10 px-3"
                      />
                    ) : (
                      user.province
                    )}
                  </td>
                  <td>
                    {editUserId === user.id ? (
                      <input
                        type="text"
                        name="country"
                        value={editFormData.country}
                        onChange={handleInputChange}
                        className="w-28 px-3"
                      />
                    ) : (
                      user.country
                    )}
                  </td>
                  <td>
                    <img
                      src={user.profile}
                      alt="Profile"
                      className="w-20 h-20 rounded flex items-center justify-center ml-5 mt-3"
                    />
                  </td>
                  <td className="flex items-center justify-center gap-4">
                    {editUserId === user.id ? (
                      <Button
                        text="Save"
                        className="bg-blue-600 w-16 text-white border-none rounded-md capitalize"
                        onClick={handleUpdatedSave}
                      />
                    ) : (
                      <Button
                        text="Edit"
                        className="bg-green-600 w-16 text-white border-none rounded-md capitalize"
                        onClick={() => handleEdit(user.id)}
                      />
                    )}
                    <Button
                      text="delete"
                      className="bg-red-500 w-16 text-white border-none rounded-md capitalize"
                      onClick={()=>handleDelete(user.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No users yet</p>
        )}
        {users.length > 0 && (
          <div className="flex gap-5 text-2xl cursor-pointer">
            <span>⬅️</span>
            {Array.from({ length: totalPages }, (_, i) => (
              <span
                key={i}
                onClick={() => handlePage(i + 1)}
                className={
                  page === i + 1
                    ? "bg-blue-600 text-white w-10 text-center"
                    : "w-10 text-center"
                }
              >
                {i + 1}
              </span>
            ))}
            <span>➡️</span>
          </div>
        )}
      </div>
      <Link className="text-center" to="/profile">
        <Button
          text="Profiles"
          className="bg-green-600 w-28 text-2xl text-white text-center border-none rounded-md capitalize"
        />
      </Link>
    </div>
  );
};

export default Pagination;
