import Lottie from 'lottie-react'
import animation404 from '../assets/Animation404.json'

function Error() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-500 p-2">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-4xl font-bold mb-4 text-blue-500">Oops!</h1>
        <Lottie animationData={animation404} />
        <p className="text-lg text-gray-700">
          Something went wrong. <br />
          We can't find the url you're looking for
        </p>
      </div>
    </div>
  );
}


export default Error;
