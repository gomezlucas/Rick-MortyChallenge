import React, { useState } from 'react'
import { connect } from 'react-redux'
import { handleChangeFilterAction } from '../../redux/episodesDuck'
import './filter.css'


function Filter({  handleChangeFilterAction }) {
 
  function resetFilter(e) {
    e.preventDefault()
    document.getElementById('inlineFormInputEpi').value = ''
    handleChangeFilterAction(e.target.value)
  }

  return (

    <form className="my-5">
      <div class="form-row justify-content-between align-items-center">
        <div class="col-12 col-md-10">
          <label class="sr-only" for="inlineFormInput">Name</label>
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

function mapStateToProps(store) {
  return {
  }
}


export default connect(mapStateToProps, { handleChangeFilterAction })(Filter)