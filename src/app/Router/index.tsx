import React, {
  // FunctionComponent,
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {
  Switch,
  Route,
  BrowserRouter,
  // RouteComponentProps,
} from 'react-router-dom';
import { history } from 'app/history';
import { autheRouter, notAutheRouter, RouterConfigType } from './routerConfig';
import { NotFoundPage } from 'app/components/NotFoundPage';

// type Props = { component: FunctionComponent } & RouteComponentProps;

const AppRouter = () => {
  const isAuthe = false;
  !isAuthe && history.push('/login');
  const [routers, setRouters] = useState<RouterConfigType[]>();
  const getConfig = async () =>
    setRouters(isAuthe ? autheRouter : notAutheRouter);

  useEffect(() => {
    getConfig();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const RenderComponent = (Component, props) => {
    return <Component {...props} />;
  };

  const RenderRouter = useCallback(() => {
    const ui = routers?.map((r, index) => {
      const { path, Component, fullLayout } = r;
      return (
        <Route
          exact
          path={path}
          render={props =>
            fullLayout
              ? RenderComponent(Component, props)
              : RenderComponent(Component, props)
          }
          key={index}
        ></Route>
      );
    });
    ui?.push(<Route path="*" component={NotFoundPage} key="not-found" />);
    // ui?.push(<Redirect to="/" />);
    return ui;
  }, [routers]);
  return (
    <BrowserRouter>
      <Switch>{RenderRouter()}</Switch>
    </BrowserRouter>
  );
};

export default memo(AppRouter);
