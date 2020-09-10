import React from 'react'
import { connect } from 'react-redux'
import { handleChangeFilterAction, handleRadioInput } from '../../redux/locationsDuck'
import './filter.css'


function FilterLocation({ radioInput, handleChangeFilterAction, handleRadioInput }) {
 
  function resetFilter(e) {
    e.preventDefault()
    document.getElementById('locationInput').value = ''
    handleChangeFilterAction(e.target.value, radioInput)
  }


  function onCheckChange(e) {
     handleRadioInput(e.target.value)
    handleChangeFilterAction(e, radioInput)
    document.getElementById('locationInput').value = ''

  }

  return (

    <form className="my-5">
      <div className="form-row justify-content-between align-items-center">
        <div className="col-12 col-md-10">
          <label className="sr-only" htmlFor="locationInput">Name</label>
          <input type="text"
            className="form-control mb-2"
            id="locationInput"
            placeholder={radioInput === "name" ? "Search by Location Name" : "Search by Location Type"}
            onChange={(e) => {
               handleChangeFilterAction(e.target.value, radioInput)
            }}
            aria-describedby="filter"
          />
        </div>
        <div className="col-auto">
          <button onClick={(e) => resetFilter(e)} className="btn filter__button mb-2">Reset</button>
        </div>
      </div>

      <div className="form-check form-check-inline">

        <input type="radio"
          id="radioCharacter"
          className="form-check-input"
          name="radioType"
          checked={radioInput === "name"}
          onChange={(e) => onCheckChange(e)}
          value="name"
        />
        <label className="form-check-label" htmlFor="radioCharacter"> Location </label>

      </div>
      <div className="form-check form-check-inline">

        <input type="radio"
          id="radioTypes"
          className="form-check-input"
          name="radioType"
          checked={radioInput === "type" ? true : false}
          onChange={(e) => onCheckChange(e) }
          value="type"
        />
        <label className="form-check-label" htmlFor="radioTypes"> Type </label>
      </div>
    </form>
  )
}

function mapStateToProps(store) {
   return {
    radioInput: store.locations.locationField
  }
}


export default connect(mapStateToProps, { handleChangeFilterAction, handleRadioInput })(FilterLocation)
