import React from 'react';
import { Switch, Route, useRouteMatch} from 'react-router-dom';
import NotFound from '../../components/NotFound';
import GoTop from '../../components/utils/GoTop';
import AddPost from './AddPost';
import Detail from './Detail';

function Index() {
    const match = useRouteMatch();
    return (
        <div>
            <Switch>
                <Route path={`${match.url}/create`}>
                    <AddPost />
                </Route>
                <Route path={`${match.url}/:slug/:postId`} >
                    <Detail />
                </Route>
                <Route>
                    <NotFound />
                </Route>
            </Switch>

            <GoTop />
        </div>
    );
}

export default Index;