import React from 'react'
import Acordar from '../components/acordar'
import Boton from '../components/boton'
import { DataTable } from '../components/tabla'

function Page() {
  return (
    <div className=' container mx-auto py-5'>
      <DataTable />

      <div className=' py-5'>
        <Boton />
      </div>
      <Acordar/>
    </div>
  )
}

export default Page