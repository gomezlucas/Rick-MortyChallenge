import React from 'react'
import { connect } from 'react-redux'
import Pagination from '../pagination/Pagination';
import Filter from '../filter/Filter'
import { closeModal, getCharacterAction } from '../../redux/charactersDuck'
import Card from '../Card/Card';
import ModalGen from './../modal/ModalGen';

function CardContainer({ characters, closeModal, character, showModal, getCharacterAction, fetching }) {

    const showCards = () => {
        if (fetching) {
            return <h3> Loading ... </h3>
        } else {
            return (
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
                                characters.map((character) =>
                                    <Card
                                        id={character.id}
                                        name={character.name}
                                        action={getCharacterAction}
                                        image={character.image}
                                    />
                                )
                            }
                        </div></div>
                    {characters.length > 0 && <Pagination />}
                </>
            )
        }
    }


    return (
        <div className="mx-4  flex-grow-1">
            <ModalGen
                type="character"
                show={showModal}
                character={character}
                onHide={closeModal}
            />
            <Filter />
            {showCards()}
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

export default connect(mapStateToProps, { closeModal, getCharacterAction })(CardContainer)
