import React from 'react'
import { connect } from 'react-redux'
import ReactPaginate from 'react-paginate';
import './pagination.css'
import { handlePageClickAction } from '../../redux/charactersDuck'
import { handleEpisodePageClickAction } from '../../redux/episodesDuck'
import { handleLocPageClickAction } from '../../redux/locationsDuck'


function Pagination({
  pagesChar,
  nextPageChar,
  pagesEpi,
  nextPageEpi,
  pagesLoc,
  nextPageLoc,
  handleLocPageClickAction,
  handlePageClickAction,
  handleEpisodePageClickAction,
  general }) {

  let pageCount, nextPage, pageClickFunction

  switch (general) {
    case 'characters':
      pageCount = pagesChar
      nextPage = nextPageChar
      pageClickFunction = handlePageClickAction

      break
    case 'episodes':
      pageCount = pagesEpi
      nextPage = nextPageEpi
      pageClickFunction = handleEpisodePageClickAction
      break
    case 'locations':
     pageCount = pagesLoc
      nextPage = nextPageLoc
      pageClickFunction = handleLocPageClickAction
      break
  }

  let currentPage = nextPage - 1

  return (
    <div className="d-flex justify-content-center mb-4">
      <ReactPaginate
        previousLabel={"prev"}
        nextLabel={"next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pageCount}
        onPageChange={(e) => pageClickFunction(e)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        pageClassName={"page"}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
        forcePage={currentPage}
      />
    </div>
  )
}
function mapStateToProps(store) {
  return {
    pagesChar: store.characters.totalPages,
    nextPageChar: store.characters.nextPage,
    pagesEpi: store.episodes.totalPages,
    nextPageEpi: store.episodes.nextPage,
    pagesLoc: store.locations.totalPages,
    nextPageLoc: store.locations.nextPage,
    general: store.general.radio

  }
}

export default connect(mapStateToProps, { handlePageClickAction, handleEpisodePageClickAction, handleLocPageClickAction })(Pagination)
