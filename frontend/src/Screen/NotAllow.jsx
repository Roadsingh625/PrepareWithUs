import React from 'react'

export default function NotAllow() {
  return (
    <div style={{display:"flex",justifyContent:"center",height:"90vh",alignItems:"center"}}>
        <h2 style={{display:"flex",justifyContent:"center",flexDirection:"column"}}>
            To Access This Page You Need To Login!
            <a href="/login" className='btn btn-primary mt-2'>Go To Login</a>
        </h2>

    </div>
  )
}
