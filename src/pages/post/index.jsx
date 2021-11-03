import React, { Suspense, lazy } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import NotFound from "../../components/NotFound";
import GoTop from "../../components/utils/GoTop";
// import AddPost from './AddPost';
// import Detail from './Detail';
const AddPost = lazy(() => import("./AddPost"));
const Detail = lazy(() => import("./Detail"));

function Index() {
  const match = useRouteMatch();
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path={`${match.url}/create`}>
            <AddPost />
          </Route>
          <Route path={`${match.url}/:slug/:postId`}>
            <Detail />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Suspense>

      <GoTop />
    </div>
  );
}

export default Index;
