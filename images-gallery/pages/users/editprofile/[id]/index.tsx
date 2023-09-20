import validationPutUserData from "@/aux-functions/validations/validationPutUserData";
import Layout from "@/components/Layout";
import { useAppSelector } from "@/utils/redux/hooks";
import { Input } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react"


const EditProfile = () => {
    const loguedUser : any = useAppSelector((state)=> state.storageReducer.loguedUser)
    const [formData, setFormData] = useState({
        name: "",
        firstname: "",
        lastname: "",
        email: "",
        birthdate: "",
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
        flag: true
    });

    const handleChange = async (event : React.ChangeEvent<HTMLInputElement>) =>{
        const prop = event.target.name;
        const value = event.target.value;
        
        setFormData({...formData, [prop]: value});
        const errorObject : any = await validationPutUserData({...formData, [prop]: value}, loguedUser);
        setErrors(errorObject);
        
    }

    const handleSubmit = () =>{
        console.log(formData);        
    }
    
    return (
        <Layout title="Edit Profile | PicsArt Gallery" description="User can edit our profile.">
            <div className="w-full h-screen flex flex-col justify-center items-center">
                <p className="mb-5" onClick={()=> console.log(loguedUser)}>Edit My Profile</p>
                <div className="flex flex-col w-3/4 bg-yellow-700 p-5 shadow-2xl rounded-2xl">
                    <div className="w-full flex flex-col">
                        <div className="flex justify-around w-full">
                            <div className="flex flex-col items-center">
                                <label className="block mb-5 text-md font-bold text-gray-900 dark:text-white">Profile Photo</label>
                                <Image className="rounded-2xl" width={150} height={1000} src={loguedUser.profilepic} alt="profilepic"/>
                            </div>
                            <div className="mb-5 flex flex-col h-fit">
                            <label className="block text-md font-medium text-gray-900 dark:text-white">Username: {loguedUser.name}</label>
                                
                                <div className="mb-5 flex flex-col h-fit">
                                    <div className="flex items-center">
                                        <Image className="mr-2 h-full" width={20} height={20} src="/images/user.png" alt="Username icon"/>
                                        <Input onChange={handleChange} name='name' placeholder='Username' size='sm' />
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
                                        <Image className="mr-2 h-full" width={20} height={20} src="/images/name.png" alt="Firstname icon"/>
                                        <Input onChange={handleChange} name='firstname' placeholder='First name' size='sm' />
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
                                        <Image className="mr-2 h-full" width={20} height={20} src="/images/name.png" alt="Lastname icon"/>
                                        <Input onChange={handleChange} name='lastname' placeholder='Last name' size='sm' />
                                    </div>
                                    {errors.lastname? 
                                        <div className="pl-8">
                                            <p className="text-xs text-red-600">{errors.lastname}</p> 
                                        </div>
                                    : <></>}
                                </div>
                            </div>
                        </div>  
                        <div className="flex justify-around">
                            <div className="w-1/3 flex flex-col">
                                <label onClick={()=> console.log(errors)} className="block text-md font-medium text-gray-900 dark:text-white">E-mail: {loguedUser.email}</label>
                                <div className="mb-5 flex flex-col h-fit">
                                    <div className="flex items-center">
                                        <Image className="mr-2 h-full" width={20} height={20} src="/images/email.png" alt="email icon"/>
                                        <Input onChange={handleChange} name='email' placeholder='E-mail' size='sm' />
                                    </div>
                                    {errors.email? 
                                        <div className="pl-8">
                                            <p className="text-xs text-red-600">{errors.email}</p> 
                                        </div>
                                    : <></>}
                                </div>

                                <label className="block text-md font-medium text-gray-900 dark:text-white">Birthdate: {loguedUser.birthdate}</label>
                                <div className="mb-3 flex items-center h-fit">
                                    <Image className="mr-2 h-full" width={20} height={20} src="/images/birthday.png" alt="User icon"/>
                                    <input
                                        onChange={handleChange}
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
                                        <Image className="mr-2 h-full" width={20} height={20} src="/images/password.png" alt="Password icon"/>
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
                                        <Image className="mr-2 h-full" width={20} height={20} src="/images/password.png" alt="Password icon"/>
                                        <Input onChange={handleChange} name='re_password' placeholder='Confirm password' size='sm' />
                                    </div>
                                    {errors.re_password? 
                                        <div className="pl-8">
                                            <p className="text-xs text-red-600">{errors.re_password}</p> 
                                        </div>
                                    : <></>}
                                </div>


                                {errors.flag
                                ? <button disabled className="mt-10 h-10 text-sm font-bold w-full bg-gray-700 rounded transition-all ease-in-out">Guardar</button>
                                : <button onClick={handleSubmit} className="mt-10 h-10 text-sm font-bold w-full bg-gray-400 rounded hover:bg-green-400 transition-all ease-in-out">Guardar</button>
                                }
                            </div>   
                        </div>                     
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default EditProfile;