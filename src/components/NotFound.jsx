import React from 'react';
import { Link } from 'react-router-dom';


function NotFound() {
    return (
        <div>
            <h1>404</h1>
            <h4>Page not found!!!</h4>
            <Link to="/">Home page</Link>
        </div>
    );
}

export default NotFound;