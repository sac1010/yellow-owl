

const Navbar = () => {
  return (
    <div className='w-full h-[76px] bg-nav-gradient flex items-center gap-3 px-8 text-white font-semibold text-xl'>
      <img src="/bars.svg" className="h-6 w-6 md:hidden" alt="" />
      <div>
        Students
      </div>
    </div>
  )
}

export default Navbar