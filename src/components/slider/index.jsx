/* eslint-disable react/prop-types */
import { useState } from 'react'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './slider.css'

export const MarkedSlider = ({question, setAnswer}) => {
  const marks = {
    1: '全く思わない',
    2: '思わない',
    3: '思う',
    4: '強く思う',
  };
  function handleOnChange(value) {
    if (question) {
      setAnswer({id: question.id, category: question.category, value: value})
    }
  }
  return (
    <>
      <div>
        <Slider
          min={1}
          max={4}
          marks={marks}
          dots
          step={null}
          value={question.value}
          onChange={handleOnChange}
        />
      </div>
    </>
  )
}