import Image from "next/image"

export const Loading = () => {
    return (
        <div>
            <Image src="/images/logo.png" width={200} height={200} alt="Loading"/>
        </div>
    )
}