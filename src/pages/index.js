import React from 'react'
import { useRouter } from 'next/router'

const index = () => {
  const router = useRouter()
  return (
    <>
      <button onClick={() => router.push('/admin/auth/')}>Admin</button>
      <button onClick={() => router.push('/user/auth/')}>Employee</button>
    </>
  )
}

export default index