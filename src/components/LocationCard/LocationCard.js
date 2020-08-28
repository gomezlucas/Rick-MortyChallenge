import React from 'react'
import { connect } from 'react-redux';
import { getLocationAction } from '../../redux/locationsDuck'
import './locationCard.css'

function LocationCard({ id, name, type,  getLocationAction }) {
    return (
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 locationCard" key={id}>
            <button className="mb-4"  onClick={()=> getLocationAction(id)}  >
                <div className="card" >
                    <div class="card-body">
                        <p className="card-text"> {name}</p>
                        <p className="font-weight-normal"> {type}</p>
                    </div>
                </div>
            </button>
        </div>
    )
}

function mapStateToProps(store) {
    return {

    }
}

export default connect(mapStateToProps,{getLocationAction})(LocationCard) 