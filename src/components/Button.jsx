import React from 'react'

const Button = ({
    text="",
    className="",
    ...props
},ref) => {
  return (
    <div>
        <button className={`p-2 border border-gray-500 ${className}`} ref={ref} {...props}>{text}</button>
    </div>
  )
}

export default React.forwardRef(Button)