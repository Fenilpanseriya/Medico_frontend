import React from 'react'
import { useParams } from 'react-router'
import AuthFormat from './AuthFormat';

const Signup = () => {
  const params=useParams();
  console.log(params.role)
  return (
    <AuthFormat role={params.role}/>
  )
}

export default Signup