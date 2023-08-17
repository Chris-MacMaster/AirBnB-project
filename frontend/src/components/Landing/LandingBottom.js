import React from 'react';
import "./LandingBottom.css"

const LandingBottom = () => {

    return (
        <div className='landing-bottom'>
            
                <div className='landing-top'>
                    <p className='landing-p landing-p-top'>
                        About CareBnB
                    </p>
                    <div className='about-div'>
                        <div className='about about-spots'>
                            <h1 className='landing-h1'>
                                Spots
                            </h1>
                            <p className='landing-p landing-p-bottom'>
                                Create, manage, and display spots to showcase your listings
                            </p>
                        </div>

                        <div className='about about-bookings'>
                            <h1 className='landing-h1'>
                                Bookings and Reviews
                            </h1>
                            <p className='landing-p landing-p-bottom'>
                                Book other's spots, then post reviews about them. Reviews can be edited and deleted at any time
                            </p>
                        </div>

                        <div className='about about-reviews'>
                            <h1 className='landing-h1'>
                                Login and Guests
                            </h1>
                            <p className='landing-p landing-p-bottom landing-bottom-text'>
                                Sign up is free, but anyone can still browse spots
                            </p>
                        </div>


                    </div>
                </div>
            
        </div>
    );
};

export default LandingBottom;
