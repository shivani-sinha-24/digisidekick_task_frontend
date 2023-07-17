import React from 'react'
import './Search.css'

const Search = ({searchInputText,setSearchInputText}) => {
  return (
    <div className="search my-5 d-flex justify-content-center">
    <form className='row search-form'>
        <input name="searchusertext"  type="search" value={searchInputText} onChange={e=>setSearchInputText(e.target.value)} className="form-control  " placeholder='&#128269; Search...' autoFocus={true}/>
        {/* <button className="btn btn-primary" >Search</button>       */}
    </form>
    </div>
  )
}

export default Search
