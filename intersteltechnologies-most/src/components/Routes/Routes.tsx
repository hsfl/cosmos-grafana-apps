import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { HomePage } from '../../pages/Home';
import { PageWithTabs } from '../../pages/WithTabs';
import { WithDrilldown } from '../../pages/WithDrilldown';
import { prefixRoute } from '../../utils/utils.routing';
import { ROUTES } from '../../constants';
import { HelloWorldPluginPage } from '../../pages/HelloWorld';
import { FDDPage } from '../../pages/FDD';

export const Routes = () => {
  return (
    <Switch>
      <Route path={prefixRoute(`${ROUTES.WithTabs}`)} component={PageWithTabs} />
      <Route path={prefixRoute(`${ROUTES.WithDrilldown}`)} component={WithDrilldown} />
      <Route path={prefixRoute(`${ROUTES.Home}`)} component={HomePage} />
      <Route path={prefixRoute(`${ROUTES.HelloWorld}`)} component={HelloWorldPluginPage} />
      <Route path={prefixRoute(`${ROUTES.FDD}`)} component={FDDPage} />
      <Redirect to={prefixRoute(ROUTES.Home)} />
    </Switch>
  );
};
