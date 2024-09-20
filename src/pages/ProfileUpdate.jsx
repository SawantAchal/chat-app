import React, { useContext, useEffect, useState } from 'react';
import assets from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../config/firbase';
import upload from '../lib/upload';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const ProfileUpdate = () => {
  const [image, setImage] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    bio: '',
    avatar: '',
  });
  const [uid, setUid] = useState('');
  const navigate = useNavigate();
  const { setUserData } = useContext(AppContext);

  const onChangeProfileData = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const { name, bio, avatar } = profileData;

      if (!avatar && !image) {
        toast.error("Please upload a profile picture");
        return;
      }

      const docRef = doc(db, 'users', uid);

      // If there is a new image to upload
      if (image) {
        const imgUrl = await upload(image);
        await updateDoc(docRef, {
          avatar: imgUrl,
          bio,
          name,
        });
      } else {
        // If no new image, only update bio and name
        await updateDoc(docRef, {
          bio,
          name,
        });
      }

      const snap = await getDoc(docRef);
      setUserData(snap.data());
      toast.success("Profile updated successfully!");
      navigate('/chat');
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile: " + error.message);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUid(user.uid);
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setProfileData({
            name: data.name || '',
            bio: data.bio || '',
            avatar: data.avatar || '',
          });
        }
      } else {
        navigate('/');
      }
    });
  }, [navigate]);

  return (
    <>
      <div className='min-h-[100vh] bg-no-repeat bg-cover flex items-center justify-center' style={{ backgroundImage: `url(/background.png)` }}>
        <div className='bg-white flex items-center justify-between min-w-[700px] rounded-xl'>
          <form className='flex flex-col gap-5 p-10' onSubmit={handleProfileUpdate}>
            <h3 className='font-medium'>Profile Details</h3>
            <label className='flex items-center gap-3 text-gray-500 cursor-pointer'>
              <input onChange={(e) => setImage(e.target.files[0])} type='file' id='avatar' accept='.png, .jpeg , .jpg' hidden />
              <img src={image ? URL.createObjectURL(image) : profileData.avatar || assets.avatar_icon} alt='' className='w-12 rounded-full' />
              Upload profile image
            </label>
            <input type='text' onChange={onChangeProfileData} name='name' value={profileData.name} placeholder='Your name' required className='p-3 min-w-[300px] border border-solid border-[#c9c9c9] outline-blue-400' />
            <textarea onChange={onChangeProfileData} name='bio' value={profileData.bio} placeholder='Write profile bio' required className='p-3 min-w-[300px] border border-solid border-[#c9c9c9] outline-blue-400' />
            <button type='submit' className='bg-blue-500 text-white p-2 text-sm rounded'>Save</button>
          </form>
          <img src={image ? URL.createObjectURL(image) : profileData.avatar || assets.logo_icon} alt='' className='max-w-[160px] rounded-full' />
        </div>
      </div>
    </>
  );
};

export default ProfileUpdate;
