import React from 'react'
import { connect } from 'react-redux';
import Pagination from './../pagination/Pagination';
import EpisodeCard from './../EpisodeCard/EpisodeCard';
import ModalEpi from './../modal/ModalEpi';
import {closeModal} from '../../redux/episodesDuck'
import FilterEpisode  from '../filter/FilterEpisode'


function EpisodesCardContainer({ fetching, showModal, episodes, episode, closeModal }) {
    return (
        <div className="mx-4  flex-grow-1">
            <ModalEpi
                show={showModal}
                episode={episode}
                onHide={closeModal}
            />
            <FilterEpisode />
            {
                fetching ? <h3> Loading ... </h3> :
                    <>
                        <div className="container-fluid">
                            <div className="row text-center">
                                {episodes.length === 0 ?
                                    <div className="col-12">
                                        <h3>
                                            No Data available
                                    </h3>
                                    </div>
                                    :
                                    episodes.map(ep => {
                                        return (
                                            <EpisodeCard {...ep} />
                                        )

                                    })}
                            </div></div>
                        {episodes.length > 0 && <Pagination />}
                    </>
            }
        </div>

    )
}

function mapStateToProps(store) {
    return {
        episodes: store.episodes.episodes,
        episode: store.episodes.currentEpisode,
        showModal: store.episodes.showModal,
        fetching: store.episodes.fetching,
    }
}

export default connect(mapStateToProps, {closeModal} )(EpisodesCardContainer)
