import { getUserData, cleanUserData } from "@/utils/redux/actions";
import { useAppDispatch, useAppSelector } from "@/utils/redux/hooks";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const useUserDetails = () => {
    const userData = useAppSelector((state)=> state.storageReducer.userDetails);
    
    const router = useRouter();
    const { id } : any = router.query;
    const dispatch = useAppDispatch();

    useEffect(()=>{
        dispatch(getUserData(id))
        return (()=>{
            dispatch(cleanUserData());
        })
    //eslint-disable-next-line
    },[id])

    return userData;
}