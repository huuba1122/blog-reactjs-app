import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import './scss/_content.scss';
import ReactHtmlParser from "react-html-parser";


Content.propTypes = {
    post: PropTypes.object
    
};

function Content(props) {
    return (
        <div className="contentPost-Wrapper">
            <div className="contentPost-Wrapper__header">
                <Header data={props.post} />
            </div>
            <div className="contentPost-Wrapper__body">
            {ReactHtmlParser(props.post.content)}
            </div>
        </div>
    );
}

export default Content;