import Image from "next/image";

export const Logo = () => {
    return (
        <Image
        width="400"
        height="400"
        sizes="100vw"
        alt="logo"
        src="/logo.svg"
        />
            
        
    )
}