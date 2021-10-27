import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <div className="footer">
            <div className="footer-container">
                <p>
                    <Link to="/">DEV Community </Link>
                    – A constructive and inclusive social network for software developers. With you every step of your journey.
                </p>

                <div className="footer-description">
                    <p>
                    Built on Forem — the open source software that powers DEV and other inclusive communities.
                    </p>
                    <p>
                    Made with love and Ruby on Rails. DEV Community © 2016 - 2021.
                    </p>
                </div>
            </div>
            
        </div>
    );
}

export default Footer;