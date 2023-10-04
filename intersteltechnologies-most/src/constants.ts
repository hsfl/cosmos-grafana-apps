import pluginJson from './plugin.json';

export const PLUGIN_BASE_URL = `/a/${ pluginJson.id }`;

export enum ROUTES {
  // Home = 'home',
  // WithTabs = 'page-with-tabs',
  // WithDrilldown = 'page-with-drilldown',
  // HelloWorld = 'hello-world',
  // FDD = 'flight-directors-display',
  FDD = 'home',
  FlightDynamics = 'flight-dynamics',
  GS = 'gs',
  FSW = 'fsw',
  Payloads = 'payloads',
  TCS = 'tcs',
  ADCS = 'adcs',
  Telecom = 'telecom',
  EPS = 'eps',
  Propulsion = 'propulsion',
  OBCS = 'obcs'
}

export const DATASOURCE_REF = {
  // uid: 'iSTWfX0Vk',
  // type: 'testdata',
//   uid: 'RRqoBbE4k',
  type: 'hsfl-cosmos-datasource',
};

export const TEST_DATASOURCE_REF = {
  // uid: 'iSTWfX0Vk',
  // type: 'testdata',
  uid: 'abc7869e-33ce-4944-887a-fbec348b0d00',
  type: 'testdata',
};

export const DASH_DATASOURCE_REF = {
  // uid: 'iSTWfX0Vk',
  // type: 'testdata',
  uid: '-- Dashboard --',
  type: 'datasource',
};
