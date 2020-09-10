import React from 'react'
import Card from '../Card/Card';
import { connect } from 'react-redux'
import Pagination from './../pagination/Pagination';
import ModalGen from './../modal/ModalGen';
 import { closeModal, getLocationAction } from '../../redux/locationsDuck'
import FilterLocation from './../filter/FilterLocation';

function LocationCardContainer({ locations, closeModal, location, showModal, getLocationAction,  fetching }) {
    return (
        <div className="mx-4  flex-grow-1">
            <ModalGen
                type="location"
                show={showModal}
                location={location}
                onHide={closeModal}
            />
            <FilterLocation />

            {
                fetching ? <h3> Loading ... </h3> :
                    <>
                        <div className="container-fluid">
                            <div className="row text-center">
                                {locations.length === 0 ?
                                    <div className="col-12">
                                        <h3>
                                            No Data available
                                        </h3>
                                    </div>
                                    :
                                    locations.map(location =>
                                         <Card 
                                        id={location.id} 
                                        name={location.name} 
                                        data={location.type} 
                                        action={getLocationAction} 
                                        />
                                    )
                                }
                            </div></div>
                        {locations.length > 0 && <Pagination />}
                    </>
            }
        </div>


    )
}

function mapStateToProps(store) {
    return {
        locations: store.locations.locations,
        location: store.locations.currentLocation,
        showModal: store.locations.showModal,
        fetching: store.locations.fetching,
    }
}

export default connect(mapStateToProps, { closeModal, getLocationAction })(LocationCardContainer)
