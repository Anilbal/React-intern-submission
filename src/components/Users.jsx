import React, { useEffect, useState } from 'react'

const Users = () => {
    const [users,setUsers]=useState([])
    useEffect(()=>{
        const storedUsers=JSON.parse(localStorage.getItem("users"))
        setUsers(storedUsers)
    },[])
  return (
        <div className='w-full flex flex-col items-center justify-center p-10 gap-10'>
        <div className='flex flex-col items-center'>
        <h2 className='font-bold text-3xl'>All Users</h2>
        <p>Listing all users</p>
        </div>
        {
            users.length>0?
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
                    users.length>0 && users.map((user)=>(
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
        <p>No users yet!!</p>
        }
    </div>
  )
}

export default Users