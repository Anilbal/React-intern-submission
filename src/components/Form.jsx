import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {Input, Select} from './index'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';

const Form = () => {
    const {register,handleSubmit,formState:{errors},setValue}=useForm()
    const [countries,setCountries]=useState([])
    let navigate=useNavigate()
    const [profileImage, setProfileImage] = useState(null);
    useEffect(()=>{
        axios.get("https://restcountries.com/v3.1/all")
        .then(data=>{
            const countryNames = data.data.map(country => country.name.common);
                setCountries(countryNames);

                //default value to "Nepal"
                if (countryNames.includes("Nepal")) {
                    setValue("country", "Nepal");
                }
        })
        .catch((error)=>console.log(error.message))
    },[setValue])

    //file handling
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // console.log(file)
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setProfileImage(reader.result)
            };
        }
    };
    //submiting form
    const handleClick=async(data)=>{
        try {
            //checking if image is png or not
            const file = data.profile[0];
            if (file.type!== 'image/png') {
                alert('Please upload a PNG file.');
                return;
            }
    
            //adding ids to each user
            const newUser={id:uuidv4(),...data,profile:profileImage}
            //get user from localstorage first ,if users get user else get empty array 
            const existedUser=JSON.parse(localStorage.getItem("users")) || [];
    
            //adding new user
            const updatedUser=[...existedUser,newUser]
    
            //after adding new user saving to into localstorage
            localStorage.setItem("users",JSON.stringify(updatedUser))

            navigate("/users")  
        } catch (error) {
            console.error("Error form submission:", error.message)
        }
    }
  return (
    <div className='w-full flex items-center justify-center py-10'>
        <form onSubmit={handleSubmit(handleClick)} className=' border border-black flex items-center justify-center flex-col gap-10 w-[600px] p-6 rounded-lg'>
            <h2 className='font-bold underline text-xl'>User Form</h2>
            <div className='flex flex-col gap-2'>
                <Input 
                label="Name: "
                placeholder='Enter your name'
                type='text'
                {...register("name",{
                    required:"Name is required"
                })}
                />
                {errors.name && <p className="text-red-600">{errors.name?.message}</p>}

                <Input 
                label="Email: "
                placeholder='Enter your Email'
                type='text'
                {...register("email",{
                    required:"Email is required",
                    pattern:{
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: "Please enter a valid email address"
                    }
                })}
                />
                {errors.email && <p className="text-red-600">{errors.email?.message}</p>}

                <Input 
                label="Phone Number: "
                type='number'
                {...register("phone",{
                    required:"Phone number is required",
                    pattern:{
                        value: /^[0-9]*$/,
                         message: "Phone number must be only numbers"
                    },
                    minLength:{
                        value:7,
                        message:"Number should be at least 7"
                    }
                })}
                />
                {errors.phone && <p className="text-red-600">{errors.phone?.message}</p>}
                <Input 
                label="DOB: "
                type='date'
                {...register("dob",{
                    required:"Dob is required"
                })}

                />
                <Input 
                label="City: "
                placeholder='Enter your city'
                type='text'
                {...register("city")}
                />
                <Input 
                label="District: "
                placeholder='Your district'
                type='text'
                {...register("district")}
                />
                <Select
                label="Province: "
                options={[1,2,3,4,5,6,7]}
                {...register("province")}
                />
                <Select
                label="Countries: "
                options={countries}
                defaultValue={'Nepal'}
                {...register("country")}
                />
                <label htmlFor="profile">Profile Image</label>
                <input type="file" 
                id="profile" 
                className="border-none text-black placeholder:text-black px-2 py-1 "  
                {...register("profile", {
                    required: "Profile Image is required"
                })}
                onChange={handleFileChange} 
                />
                {errors.profile && <p className="text-red-600">{errors.profile?.message}</p>}
                <Input
                type='submit'
                className=' mt-4 bg-blue-800 text-white border-none rounded-lg hover:text-gray-500 cursor-pointer'
                />
            </div>
        </form> 
    </div>
  )
}

export default Form;