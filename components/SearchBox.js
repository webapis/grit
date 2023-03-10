import * as React from 'react';
import Paper from '@mui/material/Paper';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { useState, useEffect } from 'react';
function removeDuplicates(arr) {
  return arr.filter((item, 
      index) => arr.indexOf(item) === index);
}
export default function SearchBox({ gender }) {
  const [value, setValue] = useState('')

  useEffect(() => {
    const slug = location.href.split('/')
    const value = location.href.includes('search') ? decodeURI(location.pathname.split('/').slice(3,4)[0]) : ''
    console.log('value',location.pathname.split('/').slice(3,4)[0]) 
    setValue(value)
  }, [])
  function searchInputChanged(e) {

    setValue(e.target.value)
  }
  function searchHandler() {
    const href = location.href.replaceAll('?', '')
    const trimmedValue =removeDuplicates(value.toLowerCase().split(' ')).join(' ').trim()
    debugger
    if (href.includes('search')) {
      location.replace(encodeURI(`/${gender}/search/${trimmedValue}/sayfa/1`))
    } else {
      location.replace(encodeURI(`/${gender}/search/${trimmedValue}/sayfa/1`))
    }
  }
  return <Paper
    elevation={1}
    component="form"
    sx={{ p: '4px 4px', display: 'flex', alignItems: 'center', width: { xs: '100%', md: '80%' }, marginTop: 2 }}
  >

    <TextField
    fullWidth
      value={value}
      sx={{ ml: 1, flex: 10 }}
      placeholder={"Ürün ara"}
      type="search"
      inputProps={{ 'aria-label': 'search google maps' }} onChange={(e) => {
        searchInputChanged(e)
      }} onKeyDown={(e) => {
        if (e.key === 'Enter' && value!=='') {
          e.preventDefault()

          debugger
          searchHandler()
        } else {
          searchInputChanged(e)
        }
      }}
    />

    <Button disabled={value===''} type="button" sx={{ p: '10px' }} aria-label="search" onClick={searchHandler} >
      Ara
    </Button>
  </Paper>
}
