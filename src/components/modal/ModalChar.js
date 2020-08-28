import React from 'react'
import { Modal } from 'react-bootstrap'
import './modalChar.css'

function ModalChar({ show, character, onHide }) {
  const { name, image, type, gender, species } = character
  return (
    <Modal show={show}
      onHide={onHide}
    >
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body >
        <div className="w-100 text-center">
          <img className="img-fluid" src={image} alt={name} />
        </div>
        <Modal.Title className="text-center">{name}</Modal.Title>
        <p className="mt-3"> <strong>Type:</strong> {type ? type : "No info"}</p>
        <p> <strong>Gender:</strong> {gender}</p>
        <p> <strong>Species:</strong> {species}</p>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn modal__button" onClick={onHide}>
          Close
          </button>

      </Modal.Footer>
    </Modal>
  )
}

export default ModalChar
