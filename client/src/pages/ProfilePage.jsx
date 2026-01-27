import React, { use, useContext, useState } from 'react'
import assets from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'

const ProfilePage = () => {
  const {authUser, updateProfile} = useContext(AuthContext)
  const [selectedimg, setselectedimg]= useState(null)
  const navigate= useNavigate();
  const [name, setName]= useState(authUser.FullName)
  const [bio, setbio]= useState(authUser.bio)

  const handleSubmit = async(e)=>{
    e.preventDefault();
    if(!selectedimg){
      await updateProfile({FullName: name, bio});
      navigate('/');
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(selectedimg);
    reader.onload= async ()=>{
      const base64img= reader.result;
      await updateProfile({profilePic: base64img, FullName: name, bio})
    }
  }
  return (
    <div className='min-h-screen bg-cover bg-no-repeat flex items-center justify-center'>
      <div className='w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-5 p-10 flex-1'>
          <h3>Profile Details</h3>
          <label htmlFor="avatar" className='flex items-center gap-3 cursor-pointer'>
          <input onChange={(e)=>setselectedimg(e.target.files[0])} type="file" id='avatar' accept='.png, .jpg, .jpeg' hidden />
          <img src={selectedimg ? URL.createObjectURL(selectedimg) : assets.avatar_icon} className={`w-12 h-12 ${selectedimg && 'rounded-full'}`} alt="" />
          Upload Profile Picture 
          </label>
          <input type="text" required placeholder='Your Name' onChange={(e)=>setName(e.target.value)} value={name}
          className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500' />
          <textarea placeholder='Write profile bio' required onChange={(e)=> setbio(e.target.value)} value={bio}
          className='p-2 border border-gray-500 rounded-md foucus:outline-none focus:ring-2 focus:ring-violet-500' rows={4}></textarea>
          <button type='Submit' className='bg-gradient-to-r from-purple-400 to-violet-600 text-white p-2 rounded-full text-lg cursor-pointer'>Save</button>
        </form>
        <img src={assets.logo_icon} className={`'max-w-44 aspect-square rounded-full mx-10 max-sm:mt-10' ${selectedimg && 'rounded-full'}`} alt="" />
      </div>
      
    </div>
  )
}

export default ProfilePage
