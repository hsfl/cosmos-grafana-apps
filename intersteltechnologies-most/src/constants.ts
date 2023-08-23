import pluginJson from './plugin.json';

export const PLUGIN_BASE_URL = `/a/${pluginJson.id}`;

export enum ROUTES {
  Home = 'home',
  WithTabs = 'page-with-tabs',
  WithDrilldown = 'page-with-drilldown',
  HelloWorld = 'hello-world',
  FDD = 'flight-directors-display',
}

export const DATASOURCE_REF = {
  uid: 'iSTWfX0Vk',
  type: 'testdata',
};
