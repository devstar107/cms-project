import React from 'react'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import './CheckBox.scss'

export default function MyCheckBox ({ checkBoxList, checkedValues }) {
  const [state, setState] = React.useState({})

  const handleChange = (event) => {
    const updateValues = {
      ...state,
      [event.target.name]: event.target.checked
    }
    setState(updateValues)
    const filterOnlyTrue = Object.keys(updateValues).filter(
      (key) => updateValues[key] === true && key
    )

    checkedValues(filterOnlyTrue)
  }

  return (
    <FormGroup row className='checkbox-wrapper'>
      {checkBoxList &&
                Array.isArray(checkBoxList) &&
                checkBoxList.length > 0 &&
                checkBoxList.map(({ label, value }) => {
                  return (
                    <FormControlLabel
                      className='label'
                      control={
                        <Checkbox
                          checked={state ? state[value] : false}
                          className='label'
                          onChange={handleChange}
                          name={value}
                          color='primary'
                        />
                            }
                      label={label}
                    />
                  )
                })}
    </FormGroup>
  )
}
