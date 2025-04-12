import React from 'react'

function Errorpage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
    <h1 className="text-4xl font-bold text-yellow-600 mb-4">Something Went Wrong</h1>
    <p className="text-lg text-gray-700">
      An unexpected error occurred. Please try again later.
    </p>
  </div>
  )
}

export default Errorpage
