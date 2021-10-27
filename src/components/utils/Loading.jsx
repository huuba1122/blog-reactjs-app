import React from 'react';
import ReactLoading from 'react-loading';
import "./scss/_reactLoading.scss";
import { PropTypes } from 'prop-types';

Loading.propTypes = {
    data: PropTypes.object,
}

Loading.defaultProps = {
    data: {
        type: "spin",
        color: "blue",
        width: "64px",
        height: "64px"
    }
}

function Loading(props) {
    const {type, color, height, width} = props.data;
    return (
        <div className="reactLoading">
            <ReactLoading type={type} color={color} height={height} width={width}/>
        </div>
    );
}

export default Loading;