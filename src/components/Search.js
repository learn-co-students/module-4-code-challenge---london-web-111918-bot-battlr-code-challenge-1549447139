import React, { Component } from 'react'

const Search = props => {

   return (
     <form>
       <input placeholder="Search bot names" onChange={(event) => props.onChange(event)} />
     </form>
   )
}

export default Search