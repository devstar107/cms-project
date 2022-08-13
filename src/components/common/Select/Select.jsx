import React, { useState } from 'react'
import clsx from 'clsx'
import './Select.scss'
import { InputLabel, MenuItem, FormControl, Select } from '@material-ui/core'
import { ExpandMore, ExpandLess } from '@material-ui/icons'

const MySelect = (props) => {
  const {
    label,
    value,
    name,
    data,
    key,
    handleChange,
    className,
    lightTheme,
    isToplabel
  } = props
  const [isOpen, setIsOpen] = useState(false)
  return (
    <FormControl
      className={clsx(
        'commonSelect',
        className && className,
        lightTheme && 'lightThemeSelect'
      )}
    >
      <InputLabel shrink>{label}</InputLabel>
      <div
        className={clsx(
          'selectWrapper',
          label && 'selectWrapper-label'
        )}
      >
        <Select
          label='Trims'
          value={value}
          name={name}
          onChange={handleChange}
          onOpen={() => setIsOpen(true)}
          onClose={() => setIsOpen(false)}
          disableUnderline={!!className}
          MenuProps={{
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left'
            },
            transformOrigin: {
              vertical: 'top',
              horizontal: 'left'
            },
            getContentAnchorEl: null
          }}
        >
          {data.map((item, index) => (
            <MenuItem key={item.id} value={item.value}>
              {item.title || item[key]}
            </MenuItem>
          ))}
        </Select>
        <div className='iconDropDown'>
          {isOpen ? <ExpandLess /> : <ExpandMore />}
        </div>
      </div>
    </FormControl>
  )
}

export default MySelect
