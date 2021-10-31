import React from 'react';
import HomeLeftBar from './HomeLeftBar';
import HomeRightBar from './HomeRightBar';
import HomeContent from './HomeContent';
import GoTop from '../../components/utils/GoTop';

import './scss/_main.scss';


function homeComponents() {
    return (
        <div className="home-container">
            <HomeLeftBar />
            <HomeContent />
            <HomeRightBar />
            <GoTop />
        </div>
    );
}

export default homeComponents;