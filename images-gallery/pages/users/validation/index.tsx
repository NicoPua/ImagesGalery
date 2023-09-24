import BackgroundRegister from "@/components/Home/BackgroundRegister";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Validation = () => {
    const router = useRouter();
    const validator = router.query.c;
    const email = router.query.m;    

    const [state, setState] = useState({
        validator: "",
        email: "",
        validate: false,
    });

    const handlevalidate = async (obj : any) => {
        try {
          const resp = await axios.put("/api/users/validationuser", obj);
          if(resp.data.success){ //resp.data.msg para toast
            setState({
              ...state,
              validate: true
            })
          }
        } catch (error) {
            console.log(error);
        }
      };

    useEffect(() => {
        if(validator ||  email){
            const fetchData = async () =>{
                if(validator || !state.validate){
                    await handlevalidate({ validator: validator, email: email })
                }
            }
            fetchData();
        }
        return () => {} 
        //eslint-disable-next-line
    }, [validator, email,state.validate])

    return(
        <BackgroundRegister>
            <div className="w-full flex justify-around items-center">
                <div className="w-1/2 bg-gray-400 flex flex-col justify-center items-center p-10 rounded-2xl shadow-2xl">                   
                    <Image width={200} height={200} src="/images/logo.png" alt="PicsArt logo"/>
                    {state.validate
                    ?<>
                        <h1 className="font-bold">¡Validación exitosa!</h1>
                        <h1 className="mt-5">Ahora puede iniciar sesión haciendo&nbsp;
                            <Link href='/users/login' className="hover:underline font-semibold hover:text-blue-600">
                                Click Aquí
                            </Link>
                        </h1>
                    </>:<>
                        <h1 className="font-bold">
                            Espere mientras validamos su correo...
                        </h1>
                    </>}
                </div>
            </div>
        </BackgroundRegister>
    )
}

export default Validation;