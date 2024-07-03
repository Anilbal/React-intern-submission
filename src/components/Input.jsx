import React, { useId } from "react";

const Input = ({
  label,
  type = "text",
  className = "",
  placeholder = "",
  ...props

},ref) => {
  const id = useId();
  return (
    <div className="w-full flex flex-col gap-1 text-[16px]">
      {label && <label htmlFor={id}>{label}</label>}
      <input type={type} id={id} className={`border border-gray-500 text-black placeholder:text-black px-2 py-1 ${className}`} placeholder={placeholder} {...props} ref={ref}/>
    </div>
  );
};

export default React.forwardRef(Input);
