import Layout from "@/components/Layout";
import { useAppSelector } from "@/utils/redux/hooks";
import { Input } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

const EditProfile = () => {
    const loguedUser : any = useAppSelector((state)=> state.storageReducer.loguedUser)
    console.log(loguedUser);
    
    return (
        <Layout title="Edit Profile | PicsArt Gallery" description="User can edit our profile.">
            <div className="w-full h-screen flex flex-col justify-center items-center bg-red-800">
                <p className="mb-5" onClick={()=> console.log(loguedUser)}>Edit My Profile:</p>
                <div className="flex flex-col w-1/2 h-1/2 bg-yellow-700 p-10">
                    <div className="w-full ">
                    <label className="block text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                            <div className="mb-5 flex flex-col h-fit">
                                <div className="flex items-center">
                                    <Image className="mr-2 h-full" width={20} height={20} src="/images/user.png" alt="User icon"/>
                                    <Input name='re_password' placeholder='Password' size='sm' />
                                </div>
                                {/* {errors.re_password? 
                                    <div className="pl-8">
                                        <p className="text-xs text-red-600">{errors.re_password}</p> 
                                    </div>
                                : <></>} */}
                            </div>
                        
                            <label className="block text-sm font-medium text-gray-900 dark:text-white">E-mail</label>
                            <div className="mb-5 flex flex-col h-fit">
                                <div className="flex items-center">
                                    <Image className="mr-2 h-full" width={20} height={20} src="/images/email.png" alt="User icon"/>
                                    <Input name='email' placeholder='E-mail' size='sm' />
                                </div>
                                {/* {errors.email? 
                                    <div className="pl-8">
                                        <p className="text-xs text-red-600">{errors.email}</p> 
                                    </div>
                                : <></>} */}
                            </div>

                            <label className="block text-sm font-medium text-gray-900 dark:text-white">Birthdate</label>
                            <div className="mb-3 flex items-center h-fit">
                                <Image className="mr-2 h-full" width={20} height={20} src="/images/birthday.png" alt="User icon"/>
                                <input
                                    type="date"
                                    name="birthdate"
                                    className="pl-2 h-8 text-sm form-input w-full rounded border-2 border-white bg-transparent focus:border-2 focus:border-blue-700"
                                />
                            </div>
                            {/* {errors.flag
                            ? <button disabled className="mt-10 h-10 text-sm font-bold w-full bg-gray-700 rounded transition-all ease-in-out">Registrarse</button>
                            : <button onClick={handlerSubmit} className="mt-10 h-10 text-sm font-bold w-full bg-gray-400 rounded hover:bg-green-400 transition-all ease-in-out">Registrarse</button>
                            } */}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default EditProfile;