import Layout from "@/components/Layout";
import { useUserDetails } from "@/hooks/useUserDetails";

const UserInformationById = () =>{
    const userData = useUserDetails();
    return (
        <Layout title="User | PicsArt" description="Informacion about a user by id">
            <h1>adasffdaa</h1>
        </Layout>
    )
}
export default UserInformationById;