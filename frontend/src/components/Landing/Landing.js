import React from 'react';
import "./Landing.css"

const Landing = ({ show }) => {
  
    return (
        <div className='landing'>
            {show &&
            <div className='landing-top'>
                <p className='landing-p landing-p-top'>
                    Join registered users who trust CareBnB
                </p>
                <p className='landing-p landing-p-bottom'>
                    CareBnB is the choice for all your fake booking needs. 
                </p>
            </div>
          }
        </div>
    );
};

export default Landing;
