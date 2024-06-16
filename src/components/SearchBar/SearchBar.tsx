import React from 'react'

import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { TextField } from '@mui/material';

import { searchBarProps } from '../../utils/types';

import "./SearchBar.css"


const SearchBar:React.FC<searchBarProps> = ({handleChange}) => {
  return (
    <div>
      <TextField
      className='search-bar'
          label="Search"
          sx={{ m: 1, width: '25' }}
          size='small'
          placeholder='Search Customer'
          InputProps={{
            startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
          }}
          onChange={(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleChange(e)}
          
        />
    </div>
  )
}

export default SearchBar