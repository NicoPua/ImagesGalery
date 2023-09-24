import validationPutUserData from "@/aux-functions/validations/validationPutUserData";
import Layout from "@/components/Layout";
import { Loading } from "@/components/Loading/loading";
import { getLoguedUserInfo, putUserProfile } from "@/utils/redux/actions";
import { useAppDispatch, useAppSelector } from "@/utils/redux/hooks";
import { Input } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import { FcApproval } from "react-icons/fc";
import { FcPicture } from "react-icons/fc";

const EditProfile = () => {
    const loguedUser : any = useAppSelector((state)=> state.storageReducer.loguedUser);
    const router = useRouter();
    const dispatch = useAppDispatch()

    const [success, setSuccess] = useState(false);
    const [sure, setSure] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: loguedUser.name,
        firstname: loguedUser.firstname,
        lastname: loguedUser.lastname,
        email: loguedUser.email,
        birthdate: loguedUser.birthdate,
        password: "",
        re_password: ""
    });

    const [errors, setErrors] = useState({
        name: "",
        firstname: "",
        lastname: "",
        email: "",
        birthdate: "",
        password: "",
        re_password: "",
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

    const handleSubmit = async () =>{
        if(errors.flag){
            alert("Ha ocurrido un error.")
        }else{
            setLoading(true);
            await dispatch(putUserProfile(loguedUser._id ,formData));
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
            <div className="w-full h-screen flex flex-col justify-center items-center mb-10">
                <p className="mb-5 mt-20 font-bold text-2xl" onClick={()=> console.log(loguedUser)}>Edit My Profile</p>
                <div className="flex flex-col w-3/4 bg-gray-300 p-5 shadow-2xl rounded-2xl">
                    <div className="w-full flex flex-col">
                        <div className="flex justify-around w-full">
                            <div className="flex flex-col items-center justify-center bg-gray-800 px-5 rounded-2xl">
                                <div className="flex justify-center items-center mb-5">
                                    <FcPicture />
                                    <label className="pl-5 text-md font-bold text-white dark:text-white">Profile Photo</label>
                                </div>
                                <Image className="rounded-2xl pointer-events-none select-none" width={150} height={1000} src={loguedUser.profilepic} alt="profilepic"/>
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
                        </div>  
                        <div className="flex justify-around mt-5">
                            <div className="w-1/3 flex flex-col">
                                <label onClick={()=> console.log(errors)} className="block text-md font-medium text-gray-900 dark:text-white">E-mail: {loguedUser.email}</label>
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


                                {errors.flag || errors.allEqual
                                ? <button disabled className="mt-10 h-10 text-sm font-bold w-full bg-gray-700 rounded transition-all ease-in-out">Guardar</button>
                                : <button onClick={() => setSure(true)} className="mt-10 h-10 text-sm font-bold w-full bg-gray-400 rounded hover:bg-green-400 transition-all ease-in-out">Guardar</button>
                                }
                            </div>   
                        </div>                     
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