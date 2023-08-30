import React, { useMemo } from 'react';
import { prefixRoute } from '../../../utils/utils.routing';
import { ROUTES } from '../../../constants';

import {
  EmbeddedScene,
  SceneApp,
  SceneAppPage,
  // SceneFlexItem,
  // SceneFlexLayout,
  // SceneQueryRunner,
  SceneTimePicker,
  SceneTimeRange,
  SceneGridLayout,
  SceneGridItem,
  VizPanel,
  SceneControlsSpacer,
  SceneRefreshPicker
} from '@grafana/scenes';

// const NODE = 'mother';
// const row_return = 1000;

const getScene = () =>
  new EmbeddedScene({
    $timeRange: new SceneTimeRange({
      from: "2023-06-12T00:00:00.000Z",
      to: "2023-06-12T02:00:00.000Z"
      // from: 'now-12h',
      // to: 'now',
    }),
    // $data: queryRunner,
    // $data: new SceneQueryRunner({
    //   datasource: DATASOURCE_REF,
    //   queries: [getPositionICRFQuery('mother'), getPositionGEOCQuery('mother'), getPositionLVLHQuery('mother'), getPositionOrbitQuery('mother')],
    //   maxDataPoints: 100,
    // }),
    body: new SceneGridLayout({
      isDraggable: false,
      isLazy: false,
      children: [
        new SceneGridItem({
          x: 0,
          y: 0,
          width: 24,
          height: 2,
          // $data: new SceneQueryRunner({
          //   datasource: DATASOURCE_REF,
          //   queries: [getQuery(NODE)],
          //   maxDataPoints: row_return,
          // }),
          isResizable: false,
          isDraggable: false,
          body: new VizPanel({
            title: 'EPS subsystem panel',
            pluginId: 'text',
            options: {
              content: 'EPS <in development>',
            },
          }),
          // body: new VizPanel({
          //   title: '',
          //   pluginId: 'interstel-most-plulgin', // from panel.json 'name' value
          //   // TODO note typo in plugin ID name
          //   options: {

          //     // color: "red",
          //     // seriesCountSize: "sm",
          //     // showSeriesCount: false,
          //     // legend: {
          //     //   showLegend: false,
          //     // }
          //     // text: "Default value of text input option"
          //     // content: 'Hello world! ',
          //   },
          // }),
        }),
        //
      ],
    }),
    controls: [new SceneControlsSpacer(), new SceneTimePicker({ isOnCanvas: true }), new SceneRefreshPicker({})],
  });

const getEPSAppScenePage = () => {
  return new SceneApp({
    pages: [
      new SceneAppPage({
        // $timeRange: new SceneTimeRange({ from: 'now-6h', to: 'now' }),
        title: "EPS subsystem",
        subTitle: 'This scene showcases the EPS functionality.',
        // controls: [new SceneTimePicker({ isOnCanvas: false })],
        url: prefixRoute(`${ROUTES.EPS}`),
        hideFromBreadcrumbs: true,
        // scene,
        getScene,
        drilldowns: [],
      }),
    ],
  });
};

export const EPSPage = () => {
  // const scene = getScene();
  const scene = useMemo(() => getEPSAppScenePage(), []);


  return <scene.Component model={scene} />;
};
