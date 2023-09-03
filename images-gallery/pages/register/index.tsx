import BackgroundRegister from "@/components/Home/BackgroundRegister";
import Layout from "@/components/Layout";
import Image from "next/image";
import { Input } from "@chakra-ui/react";
import React, { useState } from "react";
import Link from "next/link";
import validationNewUser, { FormRegister } from "@/aux-functions/validations/validationNewUser";

const Register = () => {
    const [birthdate, setBirthday] = useState("");

    const calculateBirthDate = () =>{
        const today = new Date;
        const currectYear : number = parseInt(today.toString().slice(11,15));
        if(birthdate){
            const userYear : number = parseInt(birthdate.toString().slice(0,5));
            const result : number = currectYear - userYear;
            return (result);
        }else return 0;
    }


    const [formData, setFormData] = useState({ 
        name: "", 
        firstname: "", 
        lastname: "", 
        password: "", 
        re_password: "",
        email: "", 
        birthdate: "", 
        age: calculateBirthDate().toString()
    })

    const [errors, setErrors] = useState({
        name: "", 
        firstname: "", 
        lastname: "", 
        password: "", 
        re_password: "",
        email: "", 
        birthdate: "", 
    })

    const handlerChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        const prop = event.target.name;
        const value = event.target.value;

        setFormData({...formData, [prop]: value });
        const validationErrors : FormRegister = validationNewUser({...formData, [prop] : value});
        setErrors(validationErrors);
    }

    return(
        <BackgroundRegister>
            <div className="w-full flex justify-around items-center">
                <div className="w-1/2 flex flex-col items-center text-white">
                    <Link href="/">
                        <p className="font-bold hover:underline hover:text-black transition-all ease-in-out">← Back to Home</p>
                    </Link>
                    <Image className="pointer-events-none" width={400} height={400} src="/images/logo.png" alt="PicsArt Logo"/>  
                    <div className="flex flex-col font-bold">
                        <p className="text-xl mb-5">¡Welcome to PicsArts Gallery!</p>
                        <p>● You can find or download multimedia content.</p>
                        <p>● Content free to use.</p>
                        <p>● Download videos: Coming soon...</p>    
                        <p>● Register Now!</p> 
                    </div>           
                </div>
                <div className="w-1/4 overflow-y-auto h-[80vh] bg-gray-300 flex flex-col items-center py-10 shadow-2xl rounded-2xl">
                    <p className="font-bold">Register</p>
                    <div className="flex text-xs mt-5">
                            <p className="text-gray-800 mr-2">Do you already have an account?</p>
                            <p className="font-bold hover:text-blue-500 transition-all ease-in-out">Log In</p>
                        </div>
                    <div className="w-full p-10">
                        <label className="block text-sm font-medium text-gray-900 dark:text-white">Username</label>
                        <div className="mb-5 flex flex-col h-fit">
                            <div className="flex items-center">
                                <Image className="mr-2 h-full" width={20} height={20} src="/images/user.png" alt="User icon"/>
                                <Input onChange={handlerChange} name='name' placeholder='Username' size='sm'/>
                            </div>
                            {errors.name?
                                <div className="pl-8">
                                    <p className="text-xs text-red-600">{errors.name}</p>
                                </div>
                            : <></>}
                        </div>


                        <label className="block text-sm font-medium text-gray-900 dark:text-white">First name</label>
                        <div className="mb-5 flex flex-col h-fit">
                            <div className="flex items-center">
                                <Image className="mr-2 h-full" width={20} height={20} src="/images/name.png" alt="User icon"/>
                                <Input onChange={handlerChange} name='firstname' placeholder='First name' size='sm' />
                            </div>
                            {errors.firstname? 
                                <div className="pl-8">
                                    <p className="text-xs text-red-600">{errors.firstname}</p> 
                                </div>
                            : <></>}
                        </div>
                        

                        <label className="block text-sm font-medium text-gray-900 dark:text-white">Last name</label>
                        <div className="mb-5 flex flex-col h-fit">
                            <div className="flex items-center">
                                <Image className="mr-2 h-full" width={20} height={20} src="/images/name.png" alt="User icon"/>
                                <Input onChange={handlerChange} name='lastname' placeholder='Last name' size='sm' />
                            </div>
                            {errors.lastname? 
                                <div className="pl-8">
                                    <p className="text-xs text-red-600">{errors.lastname}</p> 
                                </div>
                            : <></>}
                        </div>
                        
                        
                        <label className="block text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <div className="mb-5 flex flex-col h-fit">
                            <div className="flex items-center">
                                <Image className="mr-2 h-full" width={20} height={20} src="/images/password.png" alt="User icon"/>
                                <Input onChange={handlerChange} name='password' placeholder='Password' size='sm' />
                            </div>
                            {errors.password? 
                                <div className="pl-8">
                                    <p className="text-xs text-red-600">{errors.password}</p> 
                                </div>
                            : <></>}
                        </div>


                        <label className="block text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                        <div className="mb-5 flex flex-col h-fit">
                            <div className="flex items-center">
                                <Image className="mr-2 h-full" width={20} height={20} src="/images/password.png" alt="User icon"/>
                                <Input onChange={handlerChange} name='re_password' placeholder='Password' size='sm' />
                            </div>
                            {errors.re_password? 
                                <div className="pl-8">
                                    <p className="text-xs text-red-600">{errors.re_password}</p> 
                                </div>
                            : <></>}
                        </div>

                        
                        <label className="block text-sm font-medium text-gray-900 dark:text-white">E-mail</label>
                        <div className="mb-5 flex flex-col h-fit">
                            <div className="flex items-center">
                                <Image className="mr-2 h-full" width={20} height={20} src="/images/email.png" alt="User icon"/>
                                <Input onChange={handlerChange} name='email' placeholder='E-mail' size='sm' />
                            </div>
                            {errors.email? 
                                <div className="pl-8">
                                    <p className="text-xs text-red-600">{errors.email}</p> 
                                </div>
                            : <></>}
                        </div>

                        
                        <label className="block text-sm font-medium text-gray-900 dark:text-white">Birthdate</label>
                        <div className="mb-3 flex items-center h-fit">
                            <Image className="mr-2 h-full" width={20} height={20} src="/images/birthday.png" alt="User icon"/>
                            <input
                                onChange={(e) => {
                                    e.preventDefault();
                                    setBirthday(e.target.value)}}
                                type="date"
                                name="birthdate"
                                className="pl-2 h-8 text-sm form-input w-full rounded border-2 border-white bg-transparent focus:border-2 focus:border-blue-700"
                            />
                        </div>
                        <button onClick={()=> console.log(formData)} className="mt-10 h-10 text-sm font-bold w-full bg-gray-400 rounded hover:bg-green-400 transition-all ease-in-out">Registrarse</button>
                    </div>
                </div>
            </div>
        </BackgroundRegister>
    )
}

export default Register;