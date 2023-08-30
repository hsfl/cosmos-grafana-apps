import { EmbeddedScene, SceneQueryRunner, SceneGridLayout, SceneGridItem, VizPanel, SceneTimeRange, SceneControlsSpacer, SceneTimePicker, SceneRefreshPicker } from '@grafana/scenes';
import { DATASOURCE_REF } from '../../constants';

// const myTimeSeriesPanel = PanelBuilders.timeseries().setTitle('My first panel');
const NODE = 'mother';
const row_return = 1000;

export function getScene() {
  return new EmbeddedScene({
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
        new SceneGridItem({
          x: 0,
          y: 1.5,
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
            title: '',
            pluginId: 'interstel-cw-panel', // from panel.json 'name' value
            options: {
              title: 'hidden'
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
        new SceneGridItem({
          x: 0,
          y: 3,
          width: 8,
          height: 15,
          $data: new SceneQueryRunner({
            datasource: DATASOURCE_REF,
            queries: [getEventQuery(NODE)],
            maxDataPoints: row_return,
          }),
          isResizable: false,
          isDraggable: false,
          body: new VizPanel({
            title: 'MED',
            pluginId: 'interstel-mission-events-display', // from panel.json 'name' value
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
        new SceneGridItem({
          x: 8,
          y: 3,
          width: 7,
          height: 15,
          $data: new SceneQueryRunner({
            datasource: DATASOURCE_REF,
            queries: [getPositionOrbitQuery(NODE)],
            maxDataPoints: row_return,
          }),
          isResizable: false,
          isDraggable: false,
          body: new VizPanel({
            title: 'Orbit',
            pluginId: 'hsfl-orbit-display', // from panel.json 'name' value
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
        new SceneGridItem({
          x: 15,
          y: 3,
          width: 5,
          height: 11,
          $data: new SceneQueryRunner({
            datasource: DATASOURCE_REF,
            queries: [getPositionICRFQuery(NODE), getPositionGEOCQuery(NODE), getPositionLVLHQuery(NODE)],
            maxDataPoints: row_return,
          }),
          isResizable: false,
          isDraggable: false,
          body: new VizPanel({
            title: 'ADCS',
            pluginId: 'interstel-adcs-display', // from panel.json 'name' value
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
        new SceneGridItem({
          x: 20,
          y: 3,
          width: 4,
          height: 7,
          $data: new SceneQueryRunner({
            datasource: DATASOURCE_REF,
            queries: [getBatteryQuery(NODE), getBCregQuery(NODE)],
            maxDataPoints: row_return,
          }),
          isResizable: false,
          isDraggable: false,
          body: new VizPanel({
            title: 'EPS',
            pluginId: 'interstel-battery-display', // from panel.json 'name' value
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
        new SceneGridItem({
          x: 20,
          y: 10,
          width: 4,
          height: 6,
          $data: new SceneQueryRunner({
            datasource: DATASOURCE_REF,
            queries: [getCPUQuery(NODE)],
            maxDataPoints: row_return,
          }),
          isResizable: false,
          isDraggable: false,
          body: new VizPanel({
            title: 'OBCS',
            pluginId: 'interstel-obcs-panel', // from panel.json 'name' value
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
        new SceneGridItem({
          height: 4,
          width: 5,
          x: 15,
          y: 14,
          $data: new SceneQueryRunner({
            datasource: DATASOURCE_REF,
            queries: [getTSENQuery(NODE)],
            maxDataPoints: row_return,
          }),
          isResizable: false,
          isDraggable: false,
          body: new VizPanel({
            title: 'TCS',
            pluginId: 'interstel-temperature-sensor-display', // from panel.json 'name' value
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
        new SceneGridItem({
          height: 7,
          width: 4,
          x: 20,
          y: 16,
          // $data: new SceneQueryRunner({
          //   datasource: DATASOURCE_REF,
          //   queries: [getQuery(NODE)],
          //   maxDataPoints: row_return,
          // }),
          isResizable: false,
          isDraggable: false,
          body: new VizPanel({
            title: 'Comm',
            pluginId: 'interstel-antenna-panel', // from panel.json 'name' value
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
        new SceneGridItem({
          height: 2,
          width: 8,
          x: 0,
          y: 18,
          // $data: new SceneQueryRunner({
          //   datasource: DATASOURCE_REF,
          //   queries: [getQuery(NODE)],
          //   maxDataPoints: row_return,
          // }),
          isResizable: false,
          isDraggable: false,
          body: new VizPanel({
            title: '',
            pluginId: 'interstel-timeline', // from panel.json 'name' value
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
        new SceneGridItem({
          height: 2,
          width: 12,
          x: 8,
          y: 18,
          // $data: new SceneQueryRunner({
          //   datasource: DATASOURCE_REF,
          //   queries: [getQuery(NODE)],
          //   maxDataPoints: row_return,
          // }),
          isResizable: false,
          isDraggable: false,
          body: new VizPanel({
            title: '',
            pluginId: 'interstel-command-panel', // from panel.json 'name' value
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
        new SceneGridItem({
          height: 5,
          width: 7,
          x: 0,
          y: 20,
          $data: new SceneQueryRunner({
            datasource: DATASOURCE_REF,
            queries: [getPositionOrbitQuery(NODE)],
            maxDataPoints: row_return,
          }),
          isResizable: false,
          isDraggable: false,
          body: new VizPanel({
            title: '',
            pluginId: 'timeseries', // from panel.json 'name' value
            options: {
              axisCenteredZero: false,
              axisColorMode: 'text',
              axisLabel: '',
              axisPlacement: 'auto',
              barAlignment: 0,
              drawStyle: 'line',
              fillOpacity: 0,
              gradientMode: 'none',
              hideFrom: {
                legend: false,
                tooltip: false,
                viz: false
              },
              lineInterpolation: 'linear',
              lineWidth: 1,
              pointSize: 5,
              scaleDistribution: {
                type: 'linear'
              },
              showPoints: 'auto',
              spanNulls: false,
              stacking: {
                group: 'A',
                mode: 'none'
              },
              thresholdsStyle: {
                mode: 'off'
              }
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
        // type time series dashboard?
        new SceneGridItem({
          height: 9,
          width: 13,
          x: 7,
          y: 20,
          $data: new SceneQueryRunner({
            datasource: DATASOURCE_REF,
            queries: [getNodeAwareQuery(NODE)],
            maxDataPoints: row_return,
          }),
          isResizable: false,
          isDraggable: false,
          body: new VizPanel({
            title: 'Nodal Situational Awareness',
            pluginId: 'hsfl-nodal-awareness', // from panel.json 'name' value
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
        new SceneGridItem({
          height: 5,
          width: 4,
          x: 20,
          y: 23,
          // $data: new SceneQueryRunner({
          //   datasource: DATASOURCE_REF,
          //   queries: [getQuery(NODE)],
          //   maxDataPoints: row_return,
          // }),
          isResizable: false,
          isDraggable: false,
          body: new VizPanel({
            title: 'GS',
            pluginId: 'text', // from panel.json 'name' value
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
        // dashboard type timeseries again? 
        new SceneGridItem({
          height: 4,
          width: 7,
          x: 0,
          y: 25,
          $data: new SceneQueryRunner({
            datasource: DATASOURCE_REF,
            queries: [getPositionICRFQuery(NODE), getPositionGEOCQuery(NODE), getPositionLVLHQuery(NODE)],
            maxDataPoints: row_return,
          }),
          isResizable: false,
          isDraggable: false,
          body: new VizPanel({
            title: '',
            pluginId: 'timeseries', // from panel.json 'name' value
            options: {
              axisCenteredZero: false,
              axisColorMode: 'text',
              axisLabel: '',
              axisPlacement: 'auto',
              barAlignment: 0,
              drawStyle: 'line',
              fillOpacity: 0,
              gradientMode: 'none',
              hideFrom: {
                legend: false,
                tooltip: false,
                viz: false
              },
              lineInterpolation: 'linear',
              lineWidth: 1,
              pointSize: 5,
              scaleDistribution: {
                type: 'linear'
              },
              showPoints: 'auto',
              spanNulls: false,
              stacking: {
                group: 'A',
                mode: 'none'
              },
              thresholdsStyle: {
                mode: 'off'
              }
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
        //
      ],
    }),
    // body: new SceneFlexLayout({
    //   children: [
    //     new SceneFlexItem({
    //       width: '100%',
    //       height: 300,
    //       body: new VizPanel({
    //         title: 'FDD panel',
    //         pluginId: 'text',
    //         options: {
    //           content: 'fddfdd! ',
    //         },
    //       }),
    //     }),
    //   ],
    // }),
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
    arg: 'orbit',
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

function getEventQuery(Node: string) {
  return {
    arg: '',
    refId: 'E',
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
    type: 'event'
    // scenarioId: 'random_walk',
    // seriesCount: 1,
    // alias: roomName,
    // min: 10,
    // max: 30,
  };
}

function getBatteryQuery(Node: string) {
  return {
    arg: '',
    refId: 'F',
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
    type: 'battery'
    // scenarioId: 'random_walk',
    // seriesCount: 1,
    // alias: roomName,
    // min: 10,
    // max: 30,
  };
}

function getBCregQuery(Node: string) {
  return {
    arg: '',
    refId: 'G',
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
    type: 'bcreg'
    // scenarioId: 'random_walk',
    // seriesCount: 1,
    // alias: roomName,
    // min: 10,
    // max: 30,
  };
}

function getCPUQuery(Node: string) {
  return {
    arg: '',
    refId: 'H',
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
    type: 'cpu'
    // scenarioId: 'random_walk',
    // seriesCount: 1,
    // alias: roomName,
    // min: 10,
    // max: 30,
  };
}

function getTSENQuery(Node: string) {
  return {
    arg: '',
    refId: 'I',
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
    type: 'tsen'
    // scenarioId: 'random_walk',
    // seriesCount: 1,
    // alias: roomName,
    // min: 10,
    // max: 30,
  };
}

function getNodeAwareQuery(Node: string) {
  return {
    arg: NODE,
    refId: 'I',
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
    type: 'nodalaware'
    // scenarioId: 'random_walk',
    // seriesCount: 1,
    // alias: roomName,
    // min: 10,
    // max: 30,
  };
}
