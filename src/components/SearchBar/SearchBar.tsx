import React from 'react'
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import OutlinedInput from '@mui/material/OutlinedInput';
import { TextField } from '@mui/material';
import "./SearchBar.css"

interface searchBarProps{
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const SearchBar:React.FC<searchBarProps> = ({handleChange}) => {
  return (
    <div>
      <TextField
          label="Search"
          sx={{ m: 1, width: '25' }}
          InputProps={{
            startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
          }}
          onChange={(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleChange(e)}
          
        />
    </div>
  )
}

export default SearchBar