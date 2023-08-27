import Layout from "@/components/Layout";
import { useUserDetails } from "@/hooks/useUserDetails";

const UserInformationById = () =>{
    const userData = useUserDetails();

    return (
        <Layout title="User | PicsArt" description="Informacion about a user by id">
            <h1 className="mt-16" onClick={()=> console.log(userData)}>adasffdaa</h1>
        </Layout>
    )
}
export default UserInformationById;