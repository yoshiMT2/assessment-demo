/* eslint-disable react/prop-types */
import Select from 'react-select';
import { dropboxStyles } from './style';


export default function Dropdown ({ options, selectedOption, setSelectedOption }){

  const handleChange = (value) => {
    setSelectedOption(value);
  }

  return (
    <div className='text-lg text-black'>
      <Select
        styles={dropboxStyles}
        value={selectedOption}
        onChange={handleChange}
        options={options}
        placeholder="要選択"
        isSearchable={false}
      />
    </div>
  )
}