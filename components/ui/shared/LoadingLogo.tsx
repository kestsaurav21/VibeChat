import Image  from 'next/image';
import React from 'react'


type Props = {
    size?: number;
}

const LoadingLogo = ( { size = 200 }: Props) => {
  return (
    <div className='h-full w-full flex justify-center items-center'>
        <Image src="/logo.svg" alt='logo'
        width={size} height={size} 
        className='animate-pulse'/>
    </div>
  )
}

export default LoadingLogo