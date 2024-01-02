function Error() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-500 p-2">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h1 className="text-4xl font-bold mb-4 text-blue-500">Oops!</h1>
          <p className="text-lg text-gray-700">
            Something went wrong. 
          </p>
        </div>
      </div>
    );
}

export default Error
