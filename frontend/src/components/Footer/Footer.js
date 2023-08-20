import React from 'react';
import { Link } from 'react-router-dom'
import "./Footer.css"

const Footer = ({ show }) => {
    const devs = [
        ['Christopher MacMaster',
            'https://www.linkedin.com/in/christopher-macmaster-9b05b3113/',
            'https://github.com/Chris-MacMaster'],

    ]
    return (
        <div className='footer'>
            {show &&
                <div className='footer-container'>
                    <h3 className='footer-title'>About Me</h3>
                    <div className='about-creators'>
                        {devs.map((d, i) => (
                            <div className='footer-person'
                                key={`footerperson${i}`}>
                                <p className='dev-name'
                                    key={`footerpersonname${i}`}>{devs[i][0]}</p>

                                <div className='footer-links-div'>
                                    <Link className='footer-link' to={{ pathname: `${d[1]}` }}
                                        target='_blank'>
                                        <img src={process.env.PUBLIC_URL + "/linked-icon.png"}
                                            id='linked-icon'
                                            alt='linkedinlogo'
                                            className='linkedin-icon'
                                            key={`linkedin${i}`}></img>
                                    </Link>
                                    <Link className='footer-link' to={{ pathname: `${d[2]}` }}
                                        target='_blank'>
                                        <img src={process.env.PUBLIC_URL + "/orange-git-icon.png"}
                                            id='git-icon'
                                            alt='githubicon'
                                            className='github-icon'
                                            key={`github${i}`}></img>
                                    </Link>
                                </div>


                            </div>

                        ))}
                    </div>
                </div>
            }
        </div>
    );
};

export default Footer;
