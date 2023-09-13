import Layout from "@/components/Layout";
import { Loading } from "@/components/Loading/loading";
import { useUserDetails } from "@/hooks/useUserDetails";
import UserInformationFromAPI from "@/components/Users/UserInformationFromAPI";
import UserInformationFromDB from "@/components/Users/UserInformationFromDB";

type UserData = any;

const UserInformationById = () =>{
    const userData : UserData = useUserDetails();

    return (
        <Layout title="User | PicsArt" description="Informacion about a user by id">
            {('_id' in userData)
            ?   <UserInformationFromDB userData={userData} />
            : ('id' in userData)
            ?   <UserInformationFromAPI userData={userData}/>          
            
            :   <Loading />
            }
        </Layout>
    )
}
export default UserInformationById;

interface UserDataInterface{
    //FromAPI
    id: string,
    updated_at: string, 
    username: string, 
    name: string, 
    bio: string, 
    location: string, 
    link: string, 
    profile_image: any,
    total_likes: number, 
    total_photos: number, 
    social: any, 
    photos: any, 
    downloads?: number

    //From DB
    _id: string,
    firstname: string,
    lastname: string,
    age: number,
    birthdate: string,
    profilepic: string,
    email: string,
    deleted: boolean,
    active: boolean
}
