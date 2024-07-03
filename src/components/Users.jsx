import React, { useEffect, useState } from 'react'
import Button from './Button'

const Users = () => {
    const [users,setUsers]=useState([])
    const [search, setSearch] = useState('');

    useEffect(()=>{
        const storedUsers=JSON.parse(localStorage.getItem("users"))
        setUsers(storedUsers)
    },[])

    //filtered data
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase())
    );

    //tracking user search
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };
    console.log(filteredUsers)
  return (
        <div className='w-full flex flex-col items-center justify-center p-10 gap-10'>
        <div className='flex flex-col items-center'>
        <h2 className='font-bold text-3xl'>All Users</h2>
        <p>Listing all users</p>
        </div>
        <div className='flex gap-4'>
            <input type="text" placeholder='Search' className='w-[300px] p-1 px-3 text-black placeholder:text-black border border-black' onChange={handleSearchChange} value={search}/>
            <Button
            text="Search"
            className="w-24 bg-blue-600 text-white border-none rounded hover:text-gray-600"
            />
        </div>
        {
            filteredUsers.length>0?
            <table className='table-auto w-full'>
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
                </tr>
            </thead>
            <tbody>
                {
                    filteredUsers.length>0 && filteredUsers.map((user)=>(
                        <tr key={user.id} className='text-center p-5 space-y-5'>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{user.dob}</td>
                            <td>{user.city}</td>
                            <td>{user.province}</td>
                            <td>{user.country}</td>
                            <td>
                            <img src={user.profile} alt="Profile" className="w-20 h-20 rounded ml-20 mt-6" />
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>:
        <p>Users not found !!</p>
        }
    </div>
  )
}

export default Users