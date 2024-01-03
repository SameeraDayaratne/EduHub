/* eslint-disable react/prop-types */
import { useState } from "react";

export default function Input({
    id,
    name,
    type,
    placeholder,
    isValidated,
    // error,
}) {
    const [value, setValue] = useState("");
    function handleChange(event) {
        setValue(event.target.value);
    }

    function inputClass() {
        const defaultClass = [
            "font-semibold",
            "rounded-md",
            "caret-accent-blue-500",
            "focus:outline-none",
            "focus:border-accent-blue-500",
            "w-full",
            "py-3",
            "pl-8",
        ];
        return isValidated
            ? [
                  ...defaultClass,
                  "pr-16",
                  "border-2",
                  "border-primary-red-500",
              ].join(" ")
            : [...defaultClass, "pr-6" ,"place-self-center",].join(" ");
    }

    // const errorIcon = isShow => {
    //     if (isShow) {
    //         return (
    //             <img
    //                 className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-4"
    //                 src={iconError}
    //                 alt=""
    //             />
    //         );
    //     }
    //     return;
    // };

    return (
        <div className="w-full last-of-type:col-span-full ">
            <div className="w-full ">
                {id == 'dob' && <input
                    type={type}
                    id={id}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className={inputClass()}         
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => (e.target.type = "text")}
                    
                />}
                {id != 'dob' && <input
                    type={type}
                    id={id}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className={inputClass()}              
                    
                />}
                {/* {errorIcon(isValidated)} */}
            </div>
            {/* <p className="text-right text-primary-red-500 italic font-semibold text-xs">
                {isValidated ? error : ""}{" "}
            </p> */}
        </div>
    );
}