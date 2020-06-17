import { Suspense } from 'react';
import * as React from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router';
import { useLocale } from '../locale-helpers';
import { Spinner } from '../ui/ui';
import URLS from '../../urls';
import Intro from '../demo-pages/intro/intro';
import speak from '../pages/contribution/speak/speak';
import listen from '../pages/contribution/listen/listen';

const Kiosk = React.lazy(() => import('../demo-pages/kiosk/kiosk'));

function DemoLayout() {
  const [_, toLocaleRoute] = useLocale();

  return (
    <div>
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route exact path={toLocaleRoute(URLS.DEMO)} component={Intro} />
          {[URLS.DEMO_DATASETS, URLS.DEMO_DASHBOARD, URLS.DEMO_CONTRIBUTE].map(
            route => (
              <Route exact path={toLocaleRoute(route)} component={Kiosk} />
            )
          )}
          {/* more routes to be added */}
          {[
            { route: URLS.DEMO_SPEAK, Component: speak },
            { route: URLS.DEMO_LISTEN, Component: listen },
          ].map(obj => (
            <Route
              exact
              path={toLocaleRoute(obj.route)}
              component={obj.Component}
            />
          ))}
          <Route render={() => <Redirect to={URLS.DEMO} />} />
        </Switch>
      </Suspense>
    </div>
  );
}

export default withRouter(DemoLayout);
