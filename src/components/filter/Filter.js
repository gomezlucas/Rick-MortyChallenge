import React from 'react'
import { connect } from 'react-redux'
import { handleChangeFilterAction, handleRadioInput } from '../../redux/charactersDuck'
import './filter.css'


function Filter({ radioInput, handleChangeFilterAction, handleRadioInput }) {
 
  function resetFilter(e) {
    e.preventDefault()
    document.getElementById('inlineFormInput').value = ''
    handleChangeFilterAction(e.target.value, radioInput)
  }


  function onCheckChange(e) {
    handleRadioInput(e.target.value)
    handleChangeFilterAction(e, radioInput)
    document.getElementById('inlineFormInput').value = ''

  }

  return (

    <form className="my-5">
      <div className="form-row justify-content-between align-items-center">
        <div className="col-12 col-md-10">
          <label className="sr-only" htmlFor="inlineFormInput">Name</label>
          <input type="text"
            className="form-control mb-2"
            id="inlineFormInput"
            placeholder={radioInput === "name" ? "Search by Character Name" : "Search by Character Type"}
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
          onChange={(e) =>
            onCheckChange(e)}
          value="name"
        />
        <label className="form-check-label" htmlFor="radioCharacter"> Character </label>

      </div>
      <div className="form-check form-check-inline">

        <input type="radio"
          id="radioType"
          className="form-check-input"
          name="radioType"
          checked={radioInput === "type" ? true : false}
          onChange={(e) => onCheckChange(e)}
          value="type"
        />
        <label className="form-check-label" htmlFor="radioType"> Type </label>
      </div>
    </form>
  )
}

function mapStateToProps(store) {
  return {
    radioInput: store.characters.characterField
  }
}


export default connect(mapStateToProps, { handleChangeFilterAction, handleRadioInput })(Filter)
