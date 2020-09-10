import React from 'react'
import { connect } from 'react-redux';
import Pagination from './../pagination/Pagination';
import Card from '../Card/Card';
import ModalGen from './../modal/ModalGen';
import { closeModal, getEpisodeAction } from '../../redux/episodesDuck'
import FilterEpisode from '../filter/FilterEpisode'


function EpisodesCardContainer({ fetching, showModal, episodes, episode, closeModal, getEpisodeAction }) {
    return (
        <div className="mx-4  flex-grow-1">
            <ModalGen
                type="episode"
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
                                    episodes.map(episode =>
                                        <Card 
                                        id={episode.id} 
                                        name={episode.name} 
                                        data={episode.episode} 
                                        action={getEpisodeAction} 
                                        />
                                    )}
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

export default connect(mapStateToProps, { closeModal, getEpisodeAction })(EpisodesCardContainer)
