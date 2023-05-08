import React from 'react';

function InputField (props) {
    const className = `px-3 py-2 rounded-md bg-indigo-50 border border-slate-300 focus:bg-transparent placeholder-slate-400 focus:border-indigo-400 focus:border-1 focus:outline-none st ${props.className || ''}`
    return (
        <div className='flex flex-col'>
            <label className='block mb-1 text-sm font-semibold text-gray-700' htmlFor='email'>
                {props.label}
            </label>
            <input {...props} className={className}/>
        </div>
    );
}

export default InputField;