import { Spinner } from '@chakra-ui/react'

export const Loading = () => {
    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <Spinner color='red.500' size='xl'/>
        </div>
    )
}