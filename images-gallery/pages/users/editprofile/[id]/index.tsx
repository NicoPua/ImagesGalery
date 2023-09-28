import validationPutUserData from "@/aux-functions/validations/validationPutUserData";
import Layout from "@/components/Layout";
import { Loading } from "@/components/Loading/loading";
import { getLoguedUserInfo, postPhotoOnCloudinary, putUserProfile } from "@/utils/redux/actions";
import { useAppDispatch, useAppSelector } from "@/utils/redux/hooks";
import { Input } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import { FcApproval,FcPicture } from "react-icons/fc";
import { ImGoogle2 } from "react-icons/im";

const EditProfile = () => {
    const { data } = useSession();
    const user : any = data?.user;  //INFO DE LA SESSION (GOOGLE)
    const loguedUser : any = useAppSelector((state)=> state.storageReducer.loguedUser);
    
    const router = useRouter();
    const dispatch = useAppDispatch()

    const [success, setSuccess] = useState(false);
    const [sure, setSure] = useState(false);
    const [loading, setLoading] = useState(false);
    const [previewPhoto, setPreviewPhoto] = useState(false);
    const [imgPreview,setImgPreview] = useState("")

    const [formData, setFormData] = useState({
        name: loguedUser.name,
        firstname: loguedUser.firstname,
        lastname: loguedUser.lastname,
        email: loguedUser.email,
        birthdate: loguedUser.birthdate,
        profilepic: "",
        file: null,
        instagram: "",
        twitter: "",
        portfolio: "",
        password: "",
        re_password: ""
    });

    const [errors, setErrors] = useState({
        name: "",
        firstname: "",
        lastname: "",
        email: "",
        birthdate: "",
        instagram: "",
        twitter: "",
        portfolio: "",
        password: "",
        re_password: "",
        image: true,
        flag: true,
        allEqual: true
    });

    const handleChange = async (event : React.ChangeEvent<HTMLInputElement>) =>{
        const prop = event.target.name;
        const value = event.target.value;

        setFormData({...formData, [prop]: value});
        const errorObject : any = await validationPutUserData({...formData, [prop]: value}, loguedUser);
        setErrors(errorObject);
    }

    const useGoogleImage = () => {
        setPreviewPhoto(true);
        setImgPreview(user.image);
        if(loguedUser.profilepic !== user.image){
            setFormData({...formData, profilepic: user.image, file: null});
            setErrors({...errors, image: false});
        }else{
            setErrors({...errors, image: true});
        }
    }

    const handleFileUpload = (event : any) => {      
        const fileToUpload = event.target.files[0];
        if(fileToUpload){
            setPreviewPhoto(true);
            const imageUrl = URL.createObjectURL(fileToUpload);
            setFormData({...formData, file: fileToUpload});
            setErrors({...errors, image: false});
            setImgPreview(imageUrl);
        }else{
            setPreviewPhoto(false);
            setFormData({...formData, file: null});
            setErrors({...errors, image: true});        
            setImgPreview("");
        }
      }

    const handleSubmit = async () =>{
        if(errors.flag){
            alert("Ha ocurrido un error.")
        }else{
            setLoading(true);

            if(formData.file && imgPreview){
                const formImage : any = new FormData;
                formImage.append('file', formData.file);
                formImage.append('upload_preset', "picsart_gallery")
            
                const response = await dispatch(postPhotoOnCloudinary(formImage));

                if(response.secure_url){
                    setFormData({...formData, profilepic: response.secure_url});
                    const newFormData = {...formData, profilepic: response.secure_url}
                    await dispatch(putUserProfile(loguedUser._id , newFormData));
                } 
            } 
            else{
                await dispatch(putUserProfile(loguedUser._id ,formData));
            }
            setSure(false);
            setLoading(false);
            setSuccess(true);
            setErrors({...errors, allEqual: true})
        }
    }
   
    useEffect(()=>{       
        if(loguedUser){
            dispatch(getLoguedUserInfo(loguedUser))
        }
    //eslint-disable-next-line
    },[loguedUser])

    return (
        <Layout title="Edit Profile | PicsArt Gallery" description="User can edit our profile.">
            <div className="w-full h-screen flex flex-col justify-center items-center mb-20">
                <p className="mb-5 mt-20 font-bold text-2xl" onClick={()=> console.log(formData)}>Edit My Profile</p>
                <div className="flex flex-col w-3/4 bg-gray-300 p-5 shadow-2xl rounded-2xl">
                    <div className="w-full flex flex-col">
                        <div className="flex justify-around w-full">
                            <div className="flex flex-col items-center justify-center bg-gray-800 px-5 rounded-2xl">
                                <div className="flex justify-center items-center mb-5">
                                    <FcPicture />
                                    <label className="pl-5 text-md font-bold text-white dark:text-white"  onClick={()=> console.log(errors)}>Profile Photo</label>
                                </div>
                                {previewPhoto
                                ?   <Image className="rounded-2xl pointer-events-none select-none" src={imgPreview} width={150} height={1000} alt='ImagePreview' />
                                :   <Image className="rounded-2xl pointer-events-none select-none" width={150} height={1000} src={loguedUser.profilepic} alt="profilepic"/>
                                }                              
                                <div 
                                    className="flex items-center bg-gray-500 mt-3 text-white px-3 rounded-xl transition-all ease-in-out hover:scale-105"
                                    onClick={useGoogleImage} 
                                >
                                    <ImGoogle2 />
                                    <button className="pl-3">Use Google Image</button>
                                </div>
                                <div className='w-full my-3'>
                                    <input onChange={handleFileUpload} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="file"/>
                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">SVG, PNG, JPG or JPEG.</p>
                                </div>
                            </div>
                            <div className="mb-5 flex flex-col h-fit">
                                <label className="block text-md font-medium text-gray-900 dark:text-white">Username: {loguedUser.name}</label>           
                                <div className="mb-5 flex flex-col h-fit">
                                    <div className="flex items-center">
                                        <Image className="mr-2 h-full pointer-events-none select-none" width={20} height={20} src="/images/user.png" alt="Username icon"/>
                                        <Input onChange={handleChange} value={formData.name} name='name' placeholder='Username' size='sm' />
                                    </div>
                                    {errors.name? 
                                        <div className="pl-8">
                                            <p className="text-xs text-red-600">{errors.name}</p> 
                                        </div>
                                    : <></>}
                                </div>

                                <label className="block text-md font-medium text-gray-900 dark:text-white">First name: {loguedUser.firstname}</label>
                                <div className="mb-5 flex flex-col h-fit">
                                    <div className="flex items-center">
                                        <Image className="mr-2 h-full pointer-events-none select-none" width={20} height={20} src="/images/name.png" alt="Firstname icon"/>
                                        <Input onChange={handleChange} value={formData.firstname} name='firstname' placeholder='First name' size='sm' />
                                    </div>
                                    {errors.firstname? 
                                        <div className="pl-8">
                                            <p className="text-xs text-red-600">{errors.firstname}</p> 
                                        </div>
                                    : <></>}
                                </div>

                                <label className="block text-md font-medium text-gray-900 dark:text-white">Last name: {loguedUser.lastname}</label>
                                <div className="mb-5 flex flex-col h-fit">
                                    <div className="flex items-center">
                                        <Image className="mr-2 h-full pointer-events-none select-none" width={20} height={20} src="/images/name.png" alt="Lastname icon"/>
                                        <Input onChange={handleChange} value={formData.lastname} name='lastname' placeholder='Last name' size='sm' />
                                    </div>
                                    {errors.lastname? 
                                        <div className="pl-8">
                                            <p className="text-xs text-red-600">{errors.lastname}</p> 
                                        </div>
                                    : <></>}
                                </div>
                            </div>
                            <div>
                                <label className="block text-md font-medium text-gray-900 dark:text-white">Portfolio: </label>           
                                <div className="mb-5 flex flex-col h-fit">
                                    <div className="flex items-center">
                                        <Image className="mr-2 h-full pointer-events-none select-none" width={20} height={20} src="/images/portfolio.png" alt="Portfolio icon"/>
                                        <Input name='portfolio' value={formData.portfolio} onChange={handleChange} placeholder='Website' size='sm' />
                                    </div>
                                    {errors.portfolio? 
                                        <div className="pl-8">
                                            <p className="text-xs text-red-600">{errors.portfolio}</p> 
                                        </div>
                                    : <></>}
                                </div>

                                <label className="block text-md font-medium text-gray-900 dark:text-white">Instagram: </label>           
                                <div className="mb-5 flex flex-col h-fit">
                                    <div className="flex items-center">
                                        <Image className="mr-2 h-full pointer-events-none select-none" width={20} height={20} src="/images/instagram.png" alt="Instagram icon"/>
                                        <Input name='instagram' value={formData.instagram} onChange={handleChange} placeholder='Instagram' size='sm' />
                                    </div>
                                    {errors.instagram? 
                                        <div className="pl-8">
                                            <p className="text-xs text-red-600">{errors.instagram}</p> 
                                        </div>
                                    : <></>}
                                </div>

                                <label className="block text-md font-medium text-gray-900 dark:text-white">Twitter: </label>           
                                <div className="mb-5 flex flex-col h-fit">
                                    <div className="flex items-center">
                                        <Image className="mr-2 h-full pointer-events-none select-none" width={20} height={20} src="/images/twitter.png" alt="Twitter icon"/>
                                        <Input name='twitter' value={formData.twitter} onChange={handleChange} placeholder='Twitter' size='sm' />
                                    </div>
                                    {errors.twitter? 
                                        <div className="pl-8">
                                            <p className="text-xs text-red-600">{errors.twitter}</p> 
                                        </div>
                                    : <></>}
                                </div>
                            </div>
                        </div>  
                        <div className="flex justify-around mt-5">
                            <div className="w-1/3 flex flex-col">
                                <label className="block text-md font-medium text-gray-900 dark:text-white">E-mail: {loguedUser.email}</label>
                                <div className="mb-5 flex flex-col h-fit">
                                    <div className="flex items-center">
                                        <Image className="mr-2 pointer-events-none select-none" width={20} height={20} src="/images/email.png" alt="email icon"/>
                                        <Input onChange={handleChange} value={formData.email} name='email' placeholder='E-mail' size='sm' />
                                    </div>
                                    {errors.email? 
                                        <div className="pl-8">
                                            <p className="text-xs text-red-600">{errors.email}</p> 
                                        </div>
                                    : <></>}
                                </div>

                                <label className="block text-md font-medium text-gray-900 dark:text-white">Birthdate: {loguedUser.birthdate? loguedUser.birthdate.slice(0,10) : ""}</label>
                                <div className="mb-3 flex items-center h-fit">
                                    <Image className="mr-2 pointer-events-none select-none" width={20} height={20} src="/images/birthday.png" alt="User icon"/>
                                    <input
                                        onChange={handleChange}
                                        value={formData.birthdate? formData.birthdate.slice(0,10) : ""}
                                        type="date"
                                        name="birthdate"
                                        className="pl-2 h-8 text-sm form-input w-full rounded border-2 border-white bg-transparent focus:border-2 focus:border-blue-700"
                                    />
                                </div>
                                {errors.birthdate? 
                                    <div className="pl-8">
                                        <p className="text-xs text-red-600">{errors.birthdate}</p> 
                                    </div>
                                : <></>}
                            </div>
                            <div className="w-1/3 flex flex-col">
                                <label className="block text-md font-medium text-gray-900 dark:text-white">Password</label>
                                <div className="mb-5 flex flex-col h-fit">
                                    <div className="flex items-center">
                                        <Image className="mr-2 pointer-events-none select-none" width={20} height={20} src="/images/password.png" alt="Password icon"/>
                                        <Input onChange={handleChange} name='password' placeholder='Password' size='sm' />
                                    </div>
                                    {errors.password? 
                                        <div className="pl-8">
                                            <p className="text-xs text-red-600">{errors.password}</p> 
                                        </div>
                                    : <></>}
                                </div>

                                <label className="block text-md font-medium text-gray-900 dark:text-white">Confirm Password</label>
                                <div className="mb-5 flex flex-col h-fit">
                                    <div className="flex items-center">
                                        <Image className="mr-2 pointer-events-none select-none" width={20} height={20} src="/images/password.png" alt="Password icon"/>
                                        <Input onChange={handleChange} name='re_password' placeholder='Confirm password' size='sm' />
                                    </div>
                                    {errors.re_password? 
                                        <div className="pl-8">
                                            <p className="text-xs text-red-600">{errors.re_password}</p> 
                                        </div>
                                    : <></>}
                                </div>
                            </div>   
                        </div>                     
                    </div>
                    <div className="w-full flex justify-center">
                        {(errors.flag || errors.allEqual) && errors.image
                        ? <button disabled className="w-1/2 mt-10 h-10 text-sm font-bold bg-gray-700 rounded transition-all ease-in-out">Datos sin actualizar</button>
                        : <button onClick={() => setSure(true)} className="w-1/2 mt-10 h-10 text-sm font-bold bg-gray-400 rounded hover:bg-green-400 transition-all ease-in-out">Guardar Datos</button>
                        }
                    </div>
                </div>
            </div>
            {sure && (
                <>
                <div
                    className="w-full h-full fixed top-0 left-0 bg-black/50 z-40 flex flex-col items-center justify-center"
                >
                    <div className="bg-white w-[40rem] pl-10 pr-10 pt-5 rounded-md flex flex-col overflow-hidden shadow-2xl">
                    <p className="font-semibold">¿Estás segur@ de actualizar estos datos?</p> 
                    <div className="p-4 flex flex-row gap-3 items-center justify-end">
                        <button
                        value="si"
                        className="font-bold bg-gray-300 px-5 py-1 rounded hover:bg-green-300 hover:text-black border-2 border-black"
                        onClick={handleSubmit}>
                        Sí
                        </button>
                        <button
                        value="no"
                        className="font-bold bg-gray-300 px-4 py-1 rounded hover:bg-red-300 hover:text-black border-2 border-black"
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
                    <div className="bg-white w-[40rem] pl-10 pr-10 pt-5 rounded-md flex flex-col items-center overflow-hidden shadow-2xl">
                        <div className="flex items-center justify-center h-8">
                            <FcApproval className="h-10"/>
                            <p className="font-semibold text-xl">&nbsp; Successful Update!</p>
                        </div>
                        <div className="p-4 flex flex-row gap-3 items-center justify-end">
                            <button
                            value="si"
                            className="font-bold bg-gray-300 px-5 py-1 rounded hover:bg-gray-200 hover:text-black border-2 border-black"
                            onClick={() => router.push('/')}>
                            Ir al Home
                            </button>
                            <button
                            value="no"
                            className="font-bold bg-gray-300 px-4 py-1 rounded hover:bg-yellow-200 hover:text-black border-2 border-black"
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

export default EditProfile;