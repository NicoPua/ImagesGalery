import { useAppDispatch } from "@/utils/redux/hooks";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const useUserDetails = () => {
    const router = useRouter();
    const { id } = router.query;
    const dispatch = useAppDispatch();

    useEffect(()=>{
        
    },[])
}