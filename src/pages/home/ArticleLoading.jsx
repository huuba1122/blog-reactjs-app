import React from 'react';
import './scss/_loading.scss';

function ArticleLoading() {
    return (
        <div className="article-loading">
            <div className="article-loading__wrapper">
                <div className="loading image"></div>
                <div className="user">
                    <div className="loading avatar"></div>
                    <div className="loading info"></div>
                </div>
                <div className="post">
                    <div className="loading title"></div>
                    <div className="loading text"></div>
                </div>
            </div>
            <div className="article-loading__shimmer">
                <div className="shimmer"></div>
            </div>          
        </div>
    );
}

export default ArticleLoading;