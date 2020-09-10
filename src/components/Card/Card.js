import React from 'react'
import { connect } from 'react-redux';
import './card.css'

function Card(props) {
    const { id, name, data, image, action } = props

    const showData = () => {
        if (image) {
            return (
                <>
                    <img src={image} className="card-img-top" alt={name} />
                    <div className="card-body">
                        <p className="card-text"> {name}</p>
                    </div>
                </>
            )
        } else {
            return (<div className="card-body">
                <p className="card-text"> {name}</p>
                <p className="font-weight-normal"> {data}</p>
            </div>)
        }
    }

    return (
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 cardContainer" key={id}>
            <button className="mb-4" onClick={() => action(id)}  >
                <div className="card" >
                    {showData()}
                </div>
            </button>
        </div>
    )
}



export default connect()(Card)
