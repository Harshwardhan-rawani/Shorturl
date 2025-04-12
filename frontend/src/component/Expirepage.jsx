import React from 'react'

function Expirepage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Link Expired</h1>
      <p className="text-lg text-gray-700">
        This short link has expired. Please generate a new one or contact support.
      </p>
    </div>
  )
}

export default Expirepage
