import React from 'react'
import { connect } from 'react-redux';
import {getCharacterAction} from '../../redux/charactersDuck'
import './characterCard.css'

function CharacterCard({ image, name, id, getCharacterAction}) {
    return (
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 characterCard" key={id}>
            <button className="mb-4" onClick={()=> getCharacterAction(id)} >
                <div className="card" >
                    <img src={image} className="card-img-top" alt={name} />
                    <div className="card-body">
                        <p className="card-text"> {name}</p>
                    </div>
                </div>
            </button>
        </div>
    )
}

function mapStateToProps(store){
    return{
    }
}

export default connect(mapStateToProps,{getCharacterAction})( CharacterCard)
