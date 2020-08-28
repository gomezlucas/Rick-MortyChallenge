import React, { useState } from 'react'
import './navbar.css'
import { FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import {updateRadiosAction} from  '../../redux/generalDuck'

function Navbar({radio, updateRadiosAction}) {
  const [sidebar, setSidebar] = useState(false)


  const showSidebar = () => {
    console.log(sidebar)
    setSidebar(!sidebar)
  }

  return (
    <>
      <div className="navbar">
        <Link to="#" className="menu-bars">
          <FaBars onClick={showSidebar} />
        </Link>
        <nav className={sidebar ? 'nav-menu active position-relative' : 'nav-menu position-relative'}>
              <div className="position-absolute image-navbar">
                <img className="img-fluid" src="./RickLogo1.png" alt="" />
              </div>
          <ul className='nav-menu-items mt-5'>
                        
             <li>
              <div class="form-check">
                <input type="radio"
                  id="navbar__characters"
                  class="form-check-input"
                  name="radioType"
                  value="characters"
                  checked={radio === "characters" ? true : false}
                  onChange={()=> updateRadiosAction("characters")}
                 />
                <label class="form-check-label  mb-3" for="navbar__characters"> Characters </label>
              </div>

            </li>
            <li>
            <div class="form-check">
                <input type="radio"
                  id="navbar__episodes"
                  class="form-check-input"
                  name="radioType"
                  checked={radio === "episodes" ? true : false}
                  onChange={()=> updateRadiosAction("episodes")}
                  value="episodes"
                />
                <label class="form-check-label  mb-3" for="navbar__episodes"> Episodes </label>
              </div>
              </li>
            <li>
            <div class="form-check">
                <input type="radio"
                  id="navbar__locations"
                  class="form-check-input"
                  name="radioType"
                  checked={radio === "locations" ? true : false}
                  onChange={()=> updateRadiosAction("locations")}
                  value="locations"
                />
                <label class="form-check-label  mb-3" for="navbar__locations"> Locations </label>
              </div>
              </li>
          </ul>
        </nav>
      </div>
    </>
  )
}

function mapStateToProps(store){
  return({
    radio: store.general.radio
  })
}


export default connect(mapStateToProps, {updateRadiosAction})(Navbar) 