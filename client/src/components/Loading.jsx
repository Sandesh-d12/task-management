import React from 'react'

function Loading() {
  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-200">
    <div className="h-full bg-blue-500 animate-pulse" style={{ width: "100%" }}></div>
  </div>
  )
}

export default Loading
