import React, { useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {AiOutlineArrowUp } from "react-icons/ai";
import './scss/_goTop.scss';

GoTop.propTypes = {
    scrollUp: PropTypes.func
};

function GoTop(props) {

    const [isShow, setIsShow] = useState(false);

    const toggleShowButton = () => {
        if(window.pageYOffset > 500){
            setIsShow(true);
        } else {
            setIsShow(false);
        }

    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    useEffect(() => {
        window.addEventListener('scroll', toggleShowButton);

        return () => {
            window.removeEventListener('scroll', toggleShowButton);
        }
    }, []);

    return (
        <div className="goTop">
          {isShow && 
            <button className="goTop-button" onClick={scrollToTop}>
                <i>
                    <AiOutlineArrowUp />
                </i>
            </button>
          }     
        </div>
    );
}

export default GoTop;