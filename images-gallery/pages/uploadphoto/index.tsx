import { FcApproval } from "react-icons/fc";
import Image from 'next/image'
import Layout from '@/components/Layout'
import { Input } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/utils/redux/hooks'
import { postPhotoOnCloudinary, postNewPhotoOnDB } from '@/utils/redux/actions'
import { Loading } from '@/components/Loading/loading'
import { useRouter } from 'next/router'
import validationNewPhoto from '@/aux-functions/validations/validationNewPhoto'

export default function UploadPhoto() {
  const loguedUser : any = useAppSelector((state) => state.storageReducer.loguedUser)
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [success, setSuccess] = useState(false);
  const [sure, setSure] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imgPreview, setImgPreview] = useState("");

  const [check, setCheck] = useState(false);

  const [state,setState] : any = useState({ 
    user: loguedUser? loguedUser._id : "",
    description: "",  
    location: "", 
    image: "",
    file: null,
    rating: 0, 
    likes: 0, 
    reviews: "muchas reviews"
  });

  const [errors, setErrors] = useState({
    description: "",  
    location: "",
    flag: true
  })

  const handleChange = (event: any) => {
    const value = event.target.value;
    const prop = event.target.name;

    setState({...state, [prop]: value});
    setErrors(validationNewPhoto({...state, [prop]: value}))
  }

  const handleFileUpload = (event : any) => {
    const fileToUpload = event.target.files[0];
    if(fileToUpload){
      const imageUrl = URL.createObjectURL(fileToUpload);
      setState({...state, file: fileToUpload});
      setImgPreview(imageUrl)
    }else{
      setState({...state, file: null});
      setImgPreview("");
    }
  }

  const handleSubmit = async (event : React.FormEvent<HTMLButtonElement>) =>{
    event.preventDefault();
    if(!errors.flag){
      const formData = new FormData;
      formData.append('file', state.file);
      formData.append('upload_preset', "picsart_gallery")
  
      setLoading(true);
      const response = await dispatch(postPhotoOnCloudinary(formData));
      setState({...state, image: response.secure_url})
      await dispatch(postNewPhotoOnDB(state));

      //FIN DE CARGA
      setSure(false);
      setLoading(false);
      setSuccess(true);
      //
    }
  }

  const handlerCheck = () => {  
    if(check){
      setCheck(false)
    }else{
      setCheck(true)
    }
  }

  return (
    <Layout title='Images' description='All Images'>
      <div className='mb-20 flex h-fit justify-center items-center gap-5'>
        <form onSubmit={(event) => {
          event.preventDefault()
          setSure(true)}
          }
          className='mt-20 mb-20 w-5/6 flex bg-gray-500 p-10 shadow-2xl rounded border-black border-double border-8 bg-opacity-40'
        >
          <div className='flex flex-col w-1/2'>
            <label className="block text-md font-medium text-gray-900 dark:text-white">Description</label>
            <Input className='my-2' value={state.description} name='description' onChange={handleChange} placeholder='Description' size='md' />
            {errors.description? <p className='text-red-600 mb-5'>{errors.description}</p> : <></>}
            <label className="block text-md font-medium text-gray-900 dark:text-white">Location</label>
            <Input className='my-2' value={state.location} name='location' onChange={handleChange} placeholder='Location' size='md' />
            {errors.location? <p className='text-red-600 mb-5'>{errors.location}</p> : <></>}
            <div className='w-full mt-3'>
              <label className="block mb-2 text-md font-medium text-gray-900 dark:text-white">Upload file</label>
              <input onChange={handleFileUpload} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="file"/>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">SVG, PNG, JPG or JPEG.</p>
            </div>

            <div className="mt-10 flex items-center">
              <input type="checkbox" onChange={handlerCheck}></input>
              <label className="ml-2 ">PicsArt Gallery tiene mi consentimiento para compartir esta imagen de manera pública.</label>
            </div>
            <div className='flex justify-center'>
              {(imgPreview === "") || (errors.flag === true) || (!check)
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
      {success && (
        <>
          <div
            className="w-full h-full fixed top-0 left-0 bg-black/50 z-40 flex flex-col items-center justify-center"
          >
            <div className="bg-white w-[40rem] pl-10 pr-10 pt-5 rounded-md flex flex-col overflow-hidden shadow-2xl">
              <div className="flex items-center justify-center h-8">
                <FcApproval className="h-10"/>
                <p className="font-semibold text-xl">&nbsp; Success Upload!</p>&nbsp;Now you can find the image on your profile.
              </div>
              <div className="p-4 flex flex-row gap-3 items-center justify-end">
                <button
                  value="si"
                  className="font-bold bg-gray-300 px-5 py-1 rounded hover:bg-gray-50 hover:text-black border-2 border-black"
                  onClick={() => router.push('/')}>
                  Ir al Home
                </button>
                <button
                  value="no"
                  className="font-bold bg-gray-300 px-4 py-1 rounded hover:bg-gray-50 hover:text-black border-2 border-black"
                  onClick={() => setSuccess(false)}>
                  Volver
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </Layout>
  )
}
