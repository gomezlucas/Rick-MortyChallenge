import React from 'react'
import { Modal } from 'react-bootstrap'
import './modal.css'

function ModalGen(props) {

    const { onHide, show } = props

    const showModalInfo = (type) => {
        if (type === "episode") {
            const { name, air_date } = props.episode
            const nroEpisode = props.episode.episode
            const array = props.episode.characters ? props.episode.characters.slice(0, 5) : ''
            return (
                <>
                    <Modal.Title className="text-center mb-4">{name}</Modal.Title>
                    <p> <strong>Relase Date: </strong> {air_date}</p>
                    <p> <strong>Episode: </strong>{nroEpisode} </p>
                    <p> <strong>Characters: </strong> </p>
                    <div className='container-fluid'>
                        <div className="row">
                            {showArray(array)}
                        </div>
                    </div>
                </>
            )
        } else if (type === "location") {
            const { name, type, dimension } = props.location
            const array = props.location.residents ? props.location.residents.slice(0, 5) : ''
            return (
                <>
                    <Modal.Title
                        className="text-center mb-4">{name}</Modal.Title>
                    <p> <strong>Type: </strong> {type}</p>
                    <p> <strong>Dimension: </strong>{dimension} </p>
                    <p> <strong>Residents: </strong> </p>
                    <div className='container-fluid'>
                        <div className="row">
                            {showArray(array)}
                        </div>
                    </div>
                </>
            )
        } else {
            const { name, image, type, gender, species } = props.character
            return (
                <>
                    <div className="w-100 text-center">
                        <img className="img-fluid" src={image} alt={name} />
                    </div>
                    <Modal.Title className="text-center">{name}</Modal.Title>
                    <p className="mt-3"> <strong>Type:</strong> {type ? type : "No info"}</p>
                    <p> <strong>Gender:</strong> {gender}</p>
                    <p> <strong>Species:</strong> {species}</p>
                </>
            )
        }
    }

    const showArray = (array) => {
        return array ? array.map((item, index) =>
            <div className="col-12 col-sm-4 mb-2" key={index}>
                <div className="card mx-auto" style={{ "maxWidth": "200px" }} >
                    <img src={item.image} class="card-img-top" alt={item.name} />
                    <div class="card-body">
                        <p className="card-text text-center"> {item.name}</p>
                    </div>
                </div>
            </div>
        ) : ''

    }


    return (
        <Modal show={show}
            onHide={onHide}
            size="lg"
        >
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body >
                {showModalInfo(props.type)}
            </Modal.Body >
            <Modal.Footer>
                <button className="btn modal__button" onClick={onHide}>
                    Close
          </button>
            </Modal.Footer>
        </Modal >
    )
}

export default ModalGen
