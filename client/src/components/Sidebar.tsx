import React from 'react'

const Sidebar = () => {
  return (
    <div className='w-full h-screen bg-sidebar-gradient text-white mx-auto pl-6 pt-10 hidden md:block'>
      <div className='flex gap-3 items-center'>
        <div className='w-10 h-10 rounded-full bg-white'></div>
        <div>
          <div className='font-semibold'>Yellow Owl</div>
          <div>Admin</div>
        </div>

      </div>
    </div>
  )
}

export default Sidebar