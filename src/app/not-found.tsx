import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='bg-gray-900 w-full h-screen text-white flex flex-col justify-center items-center'>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/" className='bg-green-600 p-2 rounded-md mt-3'>Return Home</Link>
    </div>
  )
}