import React from 'react'
import { Modal } from 'react-bootstrap'
import './modalChar.css'

function ModalLoc({ show, location, onHide }) {

    const { name, type, dimension } = location
    const array = location.residents ? location.residents.slice(0, 5) : ''
    return (
        <Modal show={show}
            onHide={onHide}
            size="lg"
        >
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body >
                <Modal.Title 
                    className="text-center mb-4">{name}</Modal.Title>
                <p> <strong>Type: </strong> {type}</p>
                <p> <strong>Dimension: </strong>{dimension} </p>
                <p> <strong>Residents: </strong> </p>
                <div className='container-fluid'>
                    <div className="row">
                        {array ? array.map((item, index) => {
                            return (
                                <div className="col-12 col-sm-4 mb-2" key={index}>
                                    <div className="card mx-auto"  style={{"maxWidth": "200px"}} >
                                        <img src={item.image} class="card-img-top" alt={item.name} />
                                        <div class="card-body">
                                            <p className="card-text text-center"> {item.name}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                            : ''
                        }
                    </div>
                </div>
            </Modal.Body >
            <Modal.Footer>
                <button className="btn modal__button" onClick={onHide}>
                    Close
          </button>
            </Modal.Footer>
        </Modal >
    )
}

export default ModalLoc
