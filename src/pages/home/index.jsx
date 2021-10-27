import React from 'react';
import HomeLeftBar from './HomeLeftBar';
import HomeRightBar from './HomeRightBar';
import HomeContent from './HomeContent';
import GoTop from '../../components/utils/GoTop';

import './scss/_main.scss';


function homeComponents({tags}) {
    return (
        <div className="home-container">
            <HomeLeftBar tags={tags} />
            <HomeContent />
            <HomeRightBar tags={tags} />
            <GoTop />
        </div>
    );
}

export default homeComponents;