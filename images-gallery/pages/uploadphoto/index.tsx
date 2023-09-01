import Image from 'next/image'
import Layout from '@/components/Layout'
import { Input } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useAppDispatch } from '@/utils/redux/hooks'
import { postPhotoOnCloudinary, postNewPhotoOnDB } from '@/utils/redux/actions'
import { Loading } from '@/components/Loading/loading'
import { useRouter } from 'next/router'

export default function UploadPhoto() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [sure, setSure] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imgPreview, setImgPreview] = useState("");

  const [state,setState] = useState({ 
    user: "",
    description: "",  
    location: "", 
    image: "",
    rating: 0, 
    likes: 0, 
    reviews: "muchas reviews"
  });

  const handleChange = (event: any) => {
    const value = event.target.value;
    const prop = event.target.name;

    setState({...state, [prop]: value});
    //AGREGAR VALIDATION.
  }

  const handleFileUpload = (event : any) => {
    const fileToUpload = event.target.files[0];
    if(fileToUpload){
      const imageUrl = URL.createObjectURL(fileToUpload);
      setState({...state, image: fileToUpload});
      setImgPreview(imageUrl)
    }else{
      setState({...state, image: ""});
      setImgPreview("");
    }
  }

  const handleSubmit = async (event : React.FormEvent<HTMLButtonElement>) =>{
    event.preventDefault();
    console.log(state)
    const formData = new FormData;
    formData.append('file', state.image);
    formData.append('upload_preset', "picsart_gallery")

    setLoading(true);
    //CARGANDO
    const response = await dispatch(postPhotoOnCloudinary(formData));
    setState({...state, image: response.secure_url})
    await dispatch(postNewPhotoOnDB(state));
    setSure(false);
    setLoading(false);
    console.log(state);
    //AGREGAR VALIDATIONS, si hay algo fuera de lugar, que se envie una alert.
    //router.push("/users/${idUser}")
  }

  return (
    <Layout title='Images' description='All Images'>
      <div className='mb-20 flex h-fit justify-center items-center gap-5'>
        <form onSubmit={(event) => {
          event.preventDefault()
          setSure(true)}
          }
          className='mt-20 w-5/6 flex bg-gray-500 p-10 shadow-2xl rounded border-black border-double border-8 bg-opacity-40'
        >
          <div className='flex flex-col w-1/2'>
            <label className="block text-md font-medium text-gray-900 dark:text-white">User ID</label>
            <Input className='my-3' value={state.user} name='user' onChange={handleChange} placeholder='UserID' size='md' />
            <label className="block text-md font-medium text-gray-900 dark:text-white">Description</label>
            <Input className='my-3' value={state.description} name='description' onChange={handleChange} placeholder='Description' size='md' />
            <label className="block text-md font-medium text-gray-900 dark:text-white">Location</label>
            <Input className='my-3' value={state.location} name='location' onChange={handleChange} placeholder='Location' size='md' />
            <div className='w-full mt-3'>
              <label className="block mb-2 text-md font-medium text-gray-900 dark:text-white">Upload file</label>
              <input onChange={handleFileUpload} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="file"/>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">SVG, PNG, JPG or JPEG.</p>
            </div>
            <div className='flex justify-center'>
              {(imgPreview === "")
              ? <button disabled className='w-fit p-3 mt-5 text-white font-bold bg-gray-400 rounded-xl transition-all ease-in-out border-2'>Upload Image</button>
              : <button className='w-fit p-3 mt-5 text-white font-bold hover:text-black bg-gray-800 hover:bg-green-400 rounded-xl transition-all ease-in-out border-2 '>Upload Image</button>
              }
            </div>
          </div> 
          {(imgPreview === "")
          ?  (<>
            <div className='ml-20 w-1/2 flex flex-col'>
              <label className="block mb-3 text-md font-medium text-gray-900 dark:text-white">Preview:</label>
              <div className='select-none h-full bg-gray-300 font-bold flex justify-center items-center border-4 border-black border-dashed'>
                Upload an image and see the Preview
              </div>
            </div>
          </>) : (<>
            <div className='ml-20'>
              <label className="block mb-3 text-md font-medium text-gray-900 dark:text-white">Preview:</label>
              <div className='w-full flex justify-center'>
                <div className='w-fit border-2 border-black'>
                  <Image src={imgPreview} width={600} height={600} alt='ImagePreview' />
                </div>
              </div>
            </div>
          </>)}

        </form>
      </div>
      {sure && (
        <>
          <div
            className="w-full h-full fixed top-0 left-0 bg-black/50 z-40 flex flex-col items-center justify-center"
          >
            <div className="bg-white w-[40rem] pl-10 pr-10 pt-5 rounded-md flex flex-col overflow-hidden shadow-2xl">
              <p>¿Estás segur@ de que deseas subir esta imagen?</p>
              <div className="p-4 flex flex-row gap-3 items-center justify-end">
                <button
                  value="si"
                  className="font-bold bg-gray-300 px-5 py-1 rounded hover:bg-gray-50 hover:text-black border-2 border-black"
                  onClick={handleSubmit}>
                  Sí
                </button>
                <button
                  value="no"
                  className="font-bold bg-gray-300 px-4 py-1 rounded hover:bg-gray-50 hover:text-black border-2 border-black"
                  onClick={() => setSure(false)}>
                  No
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      {loading && (
        <>
          <div className="w-full h-full fixed top-0 left-0 bg-black/50 z-40 flex flex-col items-center justify-center">
            <Loading />
          </div>
        </>
      )}
    </Layout>
  )
}
