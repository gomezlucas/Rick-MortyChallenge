import React from 'react'
import CharacterCard from '../CharacterCard/CharacterCard';
import { connect } from 'react-redux'
import Pagination from './../pagination/Pagination';
import Filter from '../filter/Filter'
import ModalChar from './../modal/ModalChar';
import { closeModal } from '../../redux/charactersDuck'

function CardContainer({ characters, closeModal, character, showModal, fetching }) {

    return (
        <div className="mx-4 ">
            <ModalChar
                show={showModal}
                character={character}
                onHide={closeModal}
            />
            <Filter />
            {
                fetching ? <h3> Loading ... </h3> :
                    <>
                        <div className="container-fluid">
                            <div className="row text-center">
                                {characters.length === 0 ?
                                    <div className="col-12">
                                        <h3>
                                            No Data available
                                        </h3>
                                    </div>
                                    :
                                    characters.map((char, index) => {
                                        return (
                                            < CharacterCard key={index}  {...char} />
                                        )

                                    })}
                            </div></div>
                        {characters.length > 0 && <Pagination />}
                    </>
            }
        </div>


    )
}

function mapStateToProps(store) {
    return {
        characters: store.characters.characters,
        character: store.characters.currentCharracter,
        showModal: store.characters.showModal,
        fetching: store.characters.fetching,
    }
}

export default connect(mapStateToProps, { closeModal })(CardContainer)
