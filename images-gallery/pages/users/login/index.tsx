import BackgroundRegister from "@/components/Home/BackgroundRegister"
import Image from "next/image";
import { Input } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import React, { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { Spinner } from '@chakra-ui/react'
import validationLoginForm from "@/aux-functions/validations/validationLoginForm";
import { useRouter } from "next/router";

const Login = () => {
    const {data} = useSession() 
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData , setFormData] = useState({
        username: "",
        password: "",
        loginError: "",
    })

    const [errors, setErrors] = useState({
        username: "",
        password: "",
        flag: true
    })

    const handlerChange = (event : React.ChangeEvent<HTMLInputElement>) =>{
        const prop = event.target.name;
        const value = event.target.value;

        setFormData({...formData, [prop] : value});
        setErrors(validationLoginForm({...formData, [prop] : value}))
    }

    const handleGoogleSignIn = async () =>{
        await signIn("google", {
            redirect: true,        //Modificar para que redireccione a la última URL en la que estuvo el usuario.
            callbackUrl: "/",
        });
    }

    const handlerSubmit = async (event : React.FormEvent<HTMLFormElement>) =>{
        setLoading(true);
        event.preventDefault();
        const result : any = await signIn("credentials", {
          username: formData.username,
          password: formData.password,
          redirect: false,          //Modificar para que redireccione a la última URL en la que estuvo el usuario.
          callbackUrl: "/",
        });
        console.log(result);
        
        if (result['error']) {
            setFormData({
              ...formData,
              loginError: result!.error,
            });
        } else {
            console.log(result);
            console.log("Acceso consedido")    
            router.push('/');
        }
        setLoading(false);
    }

    return (
        <BackgroundRegister>
            <div className="w-full flex justify-around items-center">
                <div className="w-1/4 border-2 bg-gradient-to-t from-red-400 to-gray-400 flex flex-col justify-center items-center pb-10 pt-5 rounded-2xl shadow-2xl">
                    <Image width={200} height={200} src="/images/logo.png" alt="Picsart logo"/>
                    <h1 className="font-bold">Login</h1>
                    <form onSubmit={handlerSubmit}>
                        <div className="mt-3">
                            <label className="block text-sm font-medium text-gray-900 dark:text-white">Username</label>
                            <Input onChange={handlerChange} name='username' placeholder='Username' size='sm'/>
                            {errors.username? <p className="font-semibold text-sm text-red-700">{errors.username}</p> : <></>}
                        </div>
                        <div className="mt-5">
                            <label className="block text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <Input onChange={handlerChange} name='password' placeholder='Password' size='sm'/>
                            {errors.password? <p className="font-semibold text-sm text-red-700">{errors.password}</p> : <></>}
                        </div>
                        {errors.flag? 
                            <button disabled className="text-sm w-full mt-5 p-2 rounded-xl border-2 bg-gray-600 shadow-2xl">Iniciar Sesión</button>
                        : (loading)?<>
                            <button disabled className="w-full mt-5 p-3 rounded-xl border-2 bg-white shadow-2xl">
                                <Spinner color='black.500' size='sm'/>
                            </button>
                        </>: <button className="text-sm font-semibold w-full mt-5 p-2 rounded-xl bg-gray-400 border-2 hover:bg-yellow-200 transition-all ease-in-out shadow-2xl">Iniciar Sesión</button>
                        }
                        
                    </form>
                    <div className="flex flex-col items-center mt-10 w-full">
                        <div className="flex mb-5">
                            <h1 className="text-gray-800 text-sm">¿Aún no tienes cuenta?&nbsp;</h1>
                            <Link className="font-semibold text-sm hover:text-white transition-all ease-in-out" href="/register">Registrate</Link>
                        </div>
                        <div className="flex flex-col items-center w-10/12 border-gray-400 p-2 h-16 border-t-2">
                            <h1 className="text-gray-800 text-sm font-semibold mb-2">O iniciar sesión con:</h1>
                            <div className="flex justify-center w-full h-full">
                                <FcGoogle onClick={handleGoogleSignIn} className="w-1/6 h-3/4 cursor-pointer hover:scale-125 transition-all ease-in-out"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>    
        </BackgroundRegister>
    )
};

export default Login;