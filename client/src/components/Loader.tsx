

const Loader = () => {
  return (
    <div className="flex fixed w-full flex-col justify-center items-center h-screen">
        <div className="w-full h-screen absolute top-0 bg-black opacity-25"> </div>
      <div className="w-16 h-16 bg-white animate-spin"></div>
      <div className="mt-2 text-sm">
        inital loading may take upto 50-60 seconds
      </div>
    </div>
  );
};

export default Loader;
