/* eslint-disable react/prop-types */
import { useState, useEffect, useMemo } from 'react';
import Select from 'react-select';


export const Dropdown = ({ options, defaultValue }) => {

  const [selectedOption, setSelectedOption] = useState(defaultValue);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    console.log(`Option selected:`, selectedOption);
  }

  return (
    <div className='text-lg text-black'>
      <Select
        value={selectedOption}
        onChange={handleChange}
        options={options}
      />
    </div>
  )
}