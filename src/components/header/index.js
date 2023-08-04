import React from 'react'
import { cn as bem } from "@bem-react/classname";

const Header= () => {
    const cn = bem("Header")
  return (
    <>
    <h1 className={cn('title')}>Welcome!</h1>
    <div>
        <p>Name</p>
        
    </div>
    </>
  )
}

export default Header