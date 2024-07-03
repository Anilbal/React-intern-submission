import React, { useId } from 'react'

const Select = ({
        label,
        className="",
        options,
        ...props
},ref) => {
    const id=useId()
  return (
    <div className='w-full flex flex-col gap-1'>
        {label && <label htmlFor={id}>{label}</label>}
        <select id={id} ref={ref} className={`border border-gray-500 text-black placeholder:text-black px-2 py-1 ${className}`} {...props}>
            {options?.map((option)=>(
                <option key={option} value={option}
                >{option}</option>
            ))}
        </select>
    </div>
  )
}

export default React.forwardRef(Select)