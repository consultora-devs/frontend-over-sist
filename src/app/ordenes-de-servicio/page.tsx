import React from 'react'
import Formulario from './Formulario';
import {FileUpload} from '../components/FileUpload'
function Page() {
  return (
    <div className='bg-gray-900 w-full'>
        <Formulario/>
        <FileUpload/>
    </div>
  )
}

export default Page