import React from 'react'
import LocationCard from './../LocationCard/LocationCard';
import { connect } from 'react-redux'
import Pagination from './../pagination/Pagination';
 import ModalLoc from './../modal/ModalLoc';
import { closeModal } from '../../redux/locationsDuck'
import FilterLocation from './../filter/FilterLocation';

function LocationCardContainer({ locations, closeModal,  location, showModal, fetching }) {
     return (
        <div className="mx-4 ">
             <ModalLoc
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
                                    locations.map(location => {
                                        return (
                                            < LocationCard  {...location} />
                                        )

                                    })}
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

export default connect(mapStateToProps, { closeModal })(LocationCardContainer)
