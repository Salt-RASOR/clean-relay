import React from 'react'

const TextArea = () => {
  return (
    <textarea
    className="bg-violet_light rounded-md w-full p-8 mt-20"
    name="details"
    id="details"
    rows={5}
    placeholder="Please, provide more information"></textarea>
  )
}

export default TextArea