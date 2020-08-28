import React from 'react'
import { connect } from 'react-redux';
import { getEpisodeAction } from '../../redux/episodesDuck'
import './episodeCard.css'

function EpisodeCard({ id, name, episode, getEpisodeAction }) {
    return (
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 episodeCard" key={id}>
            <button className="mb-4"  onClick={()=> getEpisodeAction(id)}  >
                <div className="card" >
                    <div class="card-body">
                        <p className="card-text"> {name}</p>
                        <p className="font-weight-normal"> {episode}</p>
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

export default connect(mapStateToProps,{getEpisodeAction})(EpisodeCard)
