import React from 'react'
import { connect } from 'react-redux'
import { handleChangeFilterAction } from '../../redux/episodesDuck'
import './filter.css'


function Filter({ handleChangeFilterAction }) {
 
  function resetFilter(e) {
    e.preventDefault()
    document.getElementById('inlineFormInputEpi').value = ''
    handleChangeFilterAction(e.target.value)
  }

  return (

    <form className="my-5">
      <div className="form-row justify-content-between align-items-center">
        <div className="col-12 col-md-10">
          <label className="sr-only" htmlFor="inlineFormInput">Name</label>
          <input type="text"
            className="form-control mb-2"
            id="inlineFormInputEpi"
            placeholder={"Search by Episode Name"}
            onChange={(e) => {
              handleChangeFilterAction(e.target.value)
            }}
            aria-describedby="filter"
          />
        </div>
        <div className="col-auto">
          <button onClick={(e) => resetFilter(e)} className="btn filter__button mb-2">Reset</button>
        </div>
      </div>

    </form>
  )
}

 

export default connect(null, { handleChangeFilterAction })(Filter)