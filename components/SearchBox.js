import * as React from 'react';
import Paper from '@mui/material/Paper';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { useState, useEffect } from 'react';

export default function SearchBox({ gender }) {
  const [value, setValue] = useState('')

  useEffect(() => {
    const slug = location.href.split('/')
    const value = location.href.includes('search') ? decodeURI(slug[slug.length - 1]) : ''
    setValue(value)
  }, [])
  function searchInputChanged(e) {

    setValue(e.target.value)
  }
  function searchHandler() {
    const href = location.href.replaceAll('?', '')
    if (href.includes('search')) {
      location.replace(encodeURI(`/${gender}/search/${value}`))
    } else {
      location.replace(encodeURI(`/${gender}/search/${value}`))
    }
  }
  return <Paper
    elevation={1}
    component="form"
    sx={{ p: '4px 4px', display: 'flex', alignItems: 'center', width: { xs: '100%', md: '80%' }, marginTop: 2 }}
  >

    <TextField
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
