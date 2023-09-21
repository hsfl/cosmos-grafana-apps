import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
// import { HomePage } from '../../pages/Home';
// import { PageWithTabs } from '../../pages/WithTabs';
// import { WithDrilldown } from '../../pages/WithDrilldown';
import { prefixRoute } from '../../utils/utils.routing';
import { ROUTES } from '../../constants';
// import { HelloWorldPluginPage } from '../../pages/HelloWorld';
import { FDDPage } from '../../pages/FDD';
import { ADCSPage } from '../../pages/Subsystems/ADCS';
import { EPSPage } from '../../pages/Subsystems/EPS';
import { FlightDynamicsPage } from '../../pages/Subsystems/FlightDynamics';
import { FSWPage } from '../../pages/Subsystems/FSW';
import { GSPage } from '../../pages/Subsystems/GS';
import { OBCSPage } from '../../pages/Subsystems/OBCS';
import { PayloadsPage } from '../../pages/Subsystems/Payloads';
import { PropulsionPage } from '../../pages/Subsystems/Propulsion';
import { TCSPage } from '../../pages/Subsystems/TCS';
import { TelecomPage } from '../../pages/Subsystems/Telecom';

export const Routes = () => {
  return (
    <Switch>
      {/* <Route path={prefixRoute(`${ROUTES.WithTabs}`)} component={PageWithTabs} />
      <Route path={prefixRoute(`${ROUTES.WithDrilldown}`)} component={WithDrilldown} />
      <Route path={prefixRoute(`${ROUTES.Home}`)} component={HomePage} />
      <Route path={prefixRoute(`${ROUTES.HelloWorld}`)} component={HelloWorldPluginPage} /> */}
      <Route path={prefixRoute(`${ ROUTES.FDD }`)} component={FDDPage} />
      {/* subsystem pages */}
      <Route path={prefixRoute(`${ ROUTES.FlightDynamics }`)} component={FlightDynamicsPage} />
      <Route path={prefixRoute(`${ ROUTES.GS }`)} component={GSPage} />
      <Route path={prefixRoute(`${ ROUTES.FSW }`)} component={FSWPage} />
      <Route path={prefixRoute(`${ ROUTES.Payloads }`)} component={PayloadsPage} />
      <Route path={prefixRoute(`${ ROUTES.TCS }`)} component={TCSPage} />
      <Route path={prefixRoute(`${ ROUTES.ADCS }`)} component={ADCSPage} />
      <Route path={prefixRoute(`${ ROUTES.Telecom }`)} component={TelecomPage} />
      <Route path={prefixRoute(`${ ROUTES.EPS }`)} component={EPSPage} />
      <Route path={prefixRoute(`${ ROUTES.Propulsion }`)} component={PropulsionPage} />
      <Route path={prefixRoute(`${ ROUTES.OBCS }`)} component={OBCSPage} />
      <Redirect to={prefixRoute(ROUTES.FDD)} />
    </Switch>
  );
};
