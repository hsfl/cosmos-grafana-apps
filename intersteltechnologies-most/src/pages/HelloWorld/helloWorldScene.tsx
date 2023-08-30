import { EmbeddedScene, SceneFlexLayout, SceneFlexItem, VizPanel, SceneTimeRange, SceneQueryRunner, SceneControlsSpacer, SceneTimePicker, SceneRefreshPicker } from '@grafana/scenes';
import { DATASOURCE_REF } from '../../constants';

export function getScene() {
  return new EmbeddedScene({
    $timeRange: new SceneTimeRange({
      from: "2023-06-12T00:00:00.000Z",
      to: "2023-06-12T02:00:00.000Z"
      // from: 'now-12h',
      // to: 'now',
    }),
    $data: new SceneQueryRunner({
      datasource: DATASOURCE_REF,
      queries: [getPositionICRFQuery('mother'), getPositionGEOCQuery('mother'), getPositionLVLHQuery('mother'), getPositionOrbitQuery('mother')],
      maxDataPoints: 100,
    }),
    body: new SceneFlexLayout({
      direction: 'column',
      children: [
        // new SceneFlexItem({
        //   width: '100%',
        //   height: 100,
        //   body: new VizPanel({
        //     title: 'button',
        //     pluginId: 'button-panel', // from panel.json 'name' value
        //     options: {
        //       // content: 'Hello world! ',
        //     },
        //   }),
        // }),
        //
        //
        //
        // TODO : use SceneGridLayout and SceneGridItem to match the json
        // https://grafana.github.io/scenes/docs/scene-layout/#step-2-configure-grid-layout
        //   new SceneGridItem({
        //   x: 0,
        //   y: 0,
        //   width: 12,
        //   height: 10,
        //   isResizable: false,
        //   isDraggable: false,
        // }),
        //
        new SceneFlexItem({
          xSizing: 'fill',
          // ySizing: 'content',
          // width: '100%',
          height: 75,
          body: new VizPanel({
            title: '',
            pluginId: 'interstel-most-plulgin', // from panel.json 'name' value
            // TODO note typo in plugin ID name
            options: {
              // color: "red",
              // seriesCountSize: "sm",
              // showSeriesCount: false,
              // legend: {
              //   showLegend: false,
              // }
              // text: "Default value of text input option"
              // content: 'Hello world! ',
            },
          }),
        }),
        new SceneFlexItem({
          xSizing: 'fill',
          // ySizing: 'content',
          // width: '100%',
          height: 75,
          body: new VizPanel({
            title: '',
            pluginId: 'interstel-cw-panel', // from panel.json 'name' value
            options: {
              color: "red",
              seriesCountSize: "sm",
              showSeriesCount: false,
              legend: {
                showLegend: false,
              }
              // text: "Default value of text input option"
              // content: 'Hello world! ',
            },
          }),
        }),
        new SceneFlexItem({
          width: '100%',
          height: 500,
          body: new VizPanel({
            title: 'Orbit',
            pluginId: 'hsfl-orbit-display', // from panel.json 'name' value
            options: {
              // content: 'Hello world! ',
            },
          }),
        }),
        new SceneFlexItem({
          width: '100%',
          height: 500,
          body: new VizPanel({
            title: 'ADCS',
            pluginId: 'interstel-adcs-display', // from panel.json 'name' value
            options: {
              // content: 'Hello world! ',
            },
          }),
        }),
        new SceneFlexItem({
          width: '100%',
          height: 100,
          body: new VizPanel({
            title: 'timeline',
            pluginId: 'interstel-timeline', // from panel.json 'name' value
            options: {
              // content: 'Hello world! ',
            },
          }),
        }),
      ],
    }),
    controls: [new SceneControlsSpacer(), new SceneTimePicker({ isOnCanvas: true }), new SceneRefreshPicker({})],
  });
}

function getPositionICRFQuery(Node: string) {
  return {
    arg: 'icrf',
    refId: 'D',
    datasource: DATASOURCE_REF,
    filters: [
      {
        compareType: 'equals',
        filterType: 'node',
        filterValue: Node // need dynamic variable passed from node select
      }
    ],
    functions: [],
    latestOnly: false,
    type: 'position'
    // scenarioId: 'random_walk',
    // seriesCount: 1,
    // alias: roomName,
    // min: 10,
    // max: 30,
  };
}

function getPositionGEOCQuery(Node: string) {
  return {
    arg: 'geoc',
    refId: 'B',
    datasource: DATASOURCE_REF,
    filters: [
      {
        compareType: 'equals',
        filterType: 'node',
        filterValue: Node // need dynamic variable passed from node select
      }
    ],
    functions: [],
    latestOnly: false,
    type: 'position'
    // scenarioId: 'random_walk',
    // seriesCount: 1,
    // alias: roomName,
    // min: 10,
    // max: 30,
  };
}

function getPositionLVLHQuery(Node: string) {
  return {
    arg: 'eul_lvlh',
    refId: 'C',
    datasource: DATASOURCE_REF,
    filters: [
      {
        compareType: 'equals',
        filterType: 'node',
        filterValue: Node // need dynamic variable passed from node select
      }
    ],
    functions: [],
    latestOnly: false,
    type: 'position'
    // scenarioId: 'random_walk',
    // seriesCount: 1,
    // alias: roomName,
    // min: 10,
    // max: 30,
  };
}

function getPositionOrbitQuery(Node: string) {
  return {
    arg: 'eci',
    refId: 'A',
    datasource: DATASOURCE_REF,
    filters: [
      {
        compareType: 'equals',
        filterType: 'node',
        filterValue: Node // need dynamic variable passed from node select
      }
    ],
    functions: [],
    latestOnly: false,
    type: 'position'
    // scenarioId: 'random_walk',
    // seriesCount: 1,
    // alias: roomName,
    // min: 10,
    // max: 30,
  };
}

// function getRoomTemperatureQuery(roomName: string) {
//   return {
//     refId: 'Temp',
//     datasource: DATASOURCE_REF,
//     scenarioId: 'random_walk',
//     seriesCount: 1,
//     alias: roomName,
//     min: 10,
//     max: 30,
//   };
// }
