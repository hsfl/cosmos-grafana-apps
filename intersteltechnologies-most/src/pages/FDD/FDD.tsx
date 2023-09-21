import React, { useMemo } from 'react';
// import { getScene } from './fddScene';
import { prefixRoute } from '../../utils/utils.routing';
import { DATASOURCE_REF, ROUTES } from '../../constants';
// DASH_DATASOURCE_REF
import {
  EmbeddedScene,
  SceneApp,
  SceneAppPage,
  // SceneFlexItem,
  // SceneFlexLayout,
  // SceneVariableSet,
  SceneQueryRunner,
  SceneTimePicker,
  SceneTimeRange,
  SceneGridLayout,
  SceneGridItem,
  VizPanel,
  SceneControlsSpacer,
  SceneRefreshPicker,
  // CustomVariable,
  VariableValueSelectors
} from '@grafana/scenes';
import { getGSScene } from '../Subsystems/GS/scenes';
import { getADCSScene } from '../Subsystems/ADCS/adcsScene';
import { NodeSceneObject } from './NodeSceneObject';
// import {SimplePanel} from '../../../../../cosmos-grafana-plugins/src/cosmos-timeline';

// const scene = () => getScene();
// const scene = getScene;

const NODE = 'mother'; //'${nodeToShow}'; // 'mother';
const row_return = 1000;
const draggable = true;
const resizeable = true;

// Variable definition, using Grafana built-in TestData datasource
// const customVariable = new CustomVariable({
//   name: 'nodeToShow',
//   label: 'Node to show',
//   value: 'mother',
//   query: 'Mother Node : mother, Child 01 : child_01',
//   // query: 'Mother Node : mother, Child 01 : child_01',
// });

let timeRange = new SceneTimeRange({
  from: "2023-06-12T00:00:00.000Z",
  to: "2023-06-12T02:00:00.000Z"
  // from: 'now-1h',
  // to: 'now',
});

// Custom object definition
const customObject = new NodeSceneObject({
  node: 'mother',
});

// TODO note inefficiency where state change triggers all queries on every keystroke;
// TODO update node selection object to be a list of nodes, returned from db query
// TODO need better way to pass the node state to supsystem scene, object does not transfer value
// TODO need to write queryRunner function for each panel to add activation handler for dynamic node

//TODO can group panels within app scene? 
// TODO pass node as url string variable 
// TODO update node list dynamically by query

// ADCS query
// Query runner definition
const queryRunnerADCS = new SceneQueryRunner({
  datasource: DATASOURCE_REF,
  queries: [
    // getDashQuery()
    // getPositionOrbitQuery(NODE),
    getPositionICRFQuery(NODE), getPositionGEOCQuery(NODE), getPositionLVLHQuery(NODE),
  ],
  maxDataPoints: row_return,
});

// Query runner activation handler that will update query runner state when custom object state changes
queryRunnerADCS.addActivationHandler(() => {
  const sub = customObject.subscribeToState((newState) => {
    queryRunnerADCS.setState({
      queries: [
        getPositionICRFQuery(newState.node),
        getPositionGEOCQuery(newState.node),
        getPositionLVLHQuery(newState.node),
        // getPositionLVLHQuery(customVariable.getValueText()),
        // getPositionOrbitQuery(newState.node),
        // {
        //   // ...queryRunner.state.queries[0],
        //   ...queryRunner.state.queries[0],
        //   // NODE: newState.node,
        //   filters: [
        //     {
        //       compareType: 'equals',
        //       filterType: 'node',
        //       filterValue: newState.node // need dynamic variable passed from node select
        //     }
        //   ],
        // },
      ],
    });
    queryRunnerADCS.runQueries();
  });

  return () => {
    sub.unsubscribe();
  };
});

// Orbit Query
// Query runner definition
const queryRunnerOrbit = new SceneQueryRunner({
  datasource: DATASOURCE_REF,
  queries: [
    getPositionOrbitQuery(NODE),
  ],
  maxDataPoints: row_return,
});
// Query runner activation handler that will update query runner state when custom object state changes
queryRunnerOrbit.addActivationHandler(() => {
  const sub = customObject.subscribeToState((newState) => {
    queryRunnerOrbit.setState({
      queries: [
        getPositionOrbitQuery(newState.node),
      ],
    });
    queryRunnerOrbit.runQueries();
  });

  return () => {
    sub.unsubscribe();
  };
});

// MED Query
// Query runner definition
const queryRunnerMED = new SceneQueryRunner({
  datasource: DATASOURCE_REF,
  queries: [
    getEventQuery(NODE),
  ],
  maxDataPoints: row_return,
});
// Query runner activation handler that will update query runner state when custom object state changes
queryRunnerMED.addActivationHandler(() => {
  const sub = customObject.subscribeToState((newState) => {
    queryRunnerMED.setState({
      queries: [
        getEventQuery(newState.node),
      ],
    });
    queryRunnerMED.runQueries();
  });

  return () => {
    sub.unsubscribe();
  };
});

// EPS Query
// Query runner definition
const queryRunnerEPS = new SceneQueryRunner({
  datasource: DATASOURCE_REF,
  queries: [
    getBatteryQuery(NODE),
    getBCregQuery(NODE)
  ],
  maxDataPoints: row_return,
});
// Query runner activation handler that will update query runner state when custom object state changes
queryRunnerEPS.addActivationHandler(() => {
  const sub = customObject.subscribeToState((newState) => {
    queryRunnerEPS.setState({
      queries: [
        getBatteryQuery(newState.node),
        getBCregQuery(newState.node),
      ],
    });
    queryRunnerEPS.runQueries();
  });

  return () => {
    sub.unsubscribe();
  };
});

// OBCS Query
// Query runner definition
const queryRunnerOBCS = new SceneQueryRunner({
  datasource: DATASOURCE_REF,
  queries: [
    getCPUQuery(NODE),
  ],
  maxDataPoints: row_return,
});
// Query runner activation handler that will update query runner state when custom object state changes
queryRunnerOBCS.addActivationHandler(() => {
  const sub = customObject.subscribeToState((newState) => {
    queryRunnerOBCS.setState({
      queries: [
        getCPUQuery(newState.node),
      ],
    });
    queryRunnerOBCS.runQueries();
  });

  return () => {
    sub.unsubscribe();
  };
});

// TCS Query
// Query runner definition
const queryRunnerTCS = new SceneQueryRunner({
  datasource: DATASOURCE_REF,
  queries: [
    getTSENQuery(NODE),
  ],
  maxDataPoints: row_return,
});
// Query runner activation handler that will update query runner state when custom object state changes
queryRunnerTCS.addActivationHandler(() => {
  const sub = customObject.subscribeToState((newState) => {
    queryRunnerTCS.setState({
      queries: [
        getTSENQuery(newState.node),
      ],
    });
    queryRunnerTCS.runQueries();
  });

  return () => {
    sub.unsubscribe();
  };
});

// Nodal Awareness Query
// Query runner definition
const queryRunnerNodalAware = new SceneQueryRunner({
  datasource: DATASOURCE_REF,
  queries: [
    getNodeAwareQuery(NODE),
  ],
  maxDataPoints: row_return,
});
// Query runner activation handler that will update query runner state when custom object state changes
queryRunnerNodalAware.addActivationHandler(() => {
  const sub = customObject.subscribeToState((newState) => {
    queryRunnerNodalAware.setState({
      queries: [
        getNodeAwareQuery(newState.node),
      ],
    });
    queryRunnerNodalAware.runQueries();
  });

  return () => {
    sub.unsubscribe();
  };
});

// reference GS subsystem app scene page
const getTab1Scene = () => {
  return getGSScene(false, customObject.state.node);
};

// getADCSScene
// reference ADCS subsystem app scene page
const getAdcsTabScene = () => {
  return getADCSScene();
};
// const timelineObject = new SimplePanel({
// });

const getScene = () =>
  new EmbeddedScene({
    // $timeRange: new SceneTimeRange({
    //   from: "2023-06-12T00:00:00.000Z",
    //   to: "2023-06-12T02:00:00.000Z"
    //   // from: 'now-12h',
    //   // to: 'now',
    // }),
    $timeRange: timeRange,
    // $variables: new SceneVariableSet({ variables: true ? [customVariable] : [] }),
    $data: queryRunnerADCS,
    // $data: new SceneQueryRunner({
    //   datasource: DASH_DATASOURCE_REF,
    //   queries: [getDashQuery()],
    //   // maxDataPoints: row_return,
    // }),
    // $data: new SceneQueryRunner({
    //   datasource: DATASOURCE_REF,
    //   queries: [getPositionICRFQuery('mother'), getPositionGEOCQuery('mother'), getPositionLVLHQuery('mother'), getPositionOrbitQuery('mother')],
    //   maxDataPoints: 100,
    // }),
    body: new SceneGridLayout({
      isDraggable: draggable,
      isLazy: true,
      children: [
        new SceneGridItem({
          x: 0,
          y: 0,
          width: 24,
          height: 2,
          // $data: new SceneQueryRunner({
          //   datasource: DATASOURCE_REF,
          //   queries: [getDashQuery()],
          //   maxDataPoints: row_return,
          // }),
          $data: new SceneQueryRunner({
            datasource: DATASOURCE_REF,
            queries: [getEventQuery(NODE)],
            maxDataPoints: row_return,
          }),
          isResizable: resizeable,
          isDraggable: draggable,
          body: new VizPanel({
            // title: '',
            title: '${nodeToShow.query.key}',
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
          $data: new SceneQueryRunner({
            datasource: DATASOURCE_REF,
            queries: [getEventQuery(NODE)],
            maxDataPoints: row_return,
          }),
          isResizable: resizeable,
          isDraggable: draggable,
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
          // $timeRange: timeRange,
          $data: queryRunnerMED,
          // $data: new SceneQueryRunner({
          //   datasource: DATASOURCE_REF,
          //   queries: [getEventQuery(NODE)],
          //   maxDataPoints: row_return,
          // }),
          isResizable: resizeable,
          isDraggable: draggable,
          body: new VizPanel({
            title: 'MED',
            pluginId: 'interstel-mission-events-display', // from panel.json 'name' value
            options: {
              seriesCountSize: "sm",
              showSeriesCount: false,
              text: "Default value of text input option",
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
          $timeRange: timeRange,
          $data: queryRunnerOrbit,
          // $data: new SceneQueryRunner({
          //   datasource: DATASOURCE_REF,
          //   queries: [getPositionOrbitQuery(NODE)],
          //   maxDataPoints: row_return,
          // }),
          isResizable: resizeable,
          isDraggable: draggable,
          body: new VizPanel({
            title: 'Orbit',
            pluginId: 'hsfl-orbit-display', // from panel.json 'name' value
            options: {
              showAnimation: false,
              showTimeline: false
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
          $data: queryRunnerADCS,
          // $data: new SceneQueryRunner({
          //   datasource: DATASOURCE_REF,
          //   queries: [getPositionICRFQuery(NODE), getPositionGEOCQuery(NODE), getPositionLVLHQuery(NODE)],
          //   maxDataPoints: row_return,
          // }),
          isResizable: resizeable,
          isDraggable: draggable,
          body: new VizPanel({
            title: 'ADCS',
            pluginId: 'interstel-adcs-display', // from panel.json 'name' value
            options: {
              customVariable: 'subsystem',
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
          $data: queryRunnerEPS,
          // $data: new SceneQueryRunner({
          //   datasource: DATASOURCE_REF,
          //   queries: [getBatteryQuery(NODE), getBCregQuery(NODE)],
          //   maxDataPoints: row_return,
          // }),
          isResizable: resizeable,
          isDraggable: draggable,
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
          $data: queryRunnerOBCS,
          // $data: new SceneQueryRunner({
          //   datasource: DATASOURCE_REF,
          //   queries: [getCPUQuery(NODE)],
          //   maxDataPoints: row_return,
          // }),
          isResizable: resizeable,
          isDraggable: draggable,
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
          $data: queryRunnerTCS,
          // $data: new SceneQueryRunner({
          //   datasource: DATASOURCE_REF,
          //   queries: [getTSENQuery(NODE)],
          //   maxDataPoints: row_return,
          // }),
          isResizable: resizeable,
          isDraggable: draggable,
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
          isResizable: resizeable,
          isDraggable: draggable,
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
          //   datasource: DASH_DATASOURCE_REF,
          //   queries: [getEventQuery(NODE)],
          //   // maxDataPoints: row_return,
          // }),
          // $data: new SceneQueryRunner({
          //   datasource: DASH_DATASOURCE_REF,
          //   queries: [getDashQuery()],
          //   // maxDataPoints: row_return,
          // }),
          // $timeRange: timeRange,
          isResizable: resizeable,
          isDraggable: draggable,
          body: new VizPanel({
            title: '',
            pluginId: 'interstel-timeline', // from panel.json 'name' value
            options: {
              seriesCountSize: "sm",
              showSeriesCount: false,
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
          isResizable: resizeable,
          isDraggable: draggable,
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
          $data: queryRunnerOrbit,
          // $data: new SceneQueryRunner({
          //   datasource: DATASOURCE_REF,
          //   queries: [getPositionOrbitQuery(NODE)],
          //   maxDataPoints: row_return,
          // }),
          isResizable: resizeable,
          isDraggable: draggable,
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
          $data: queryRunnerNodalAware,
          // $data: new SceneQueryRunner({
          //   datasource: DATASOURCE_REF,
          //   queries: [getNodeAwareQuery(NODE)],
          //   maxDataPoints: row_return,
          // }),
          isResizable: resizeable,
          isDraggable: draggable,
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
          isResizable: resizeable,
          isDraggable: draggable,
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
          $data: queryRunnerADCS,
          // $data: new SceneQueryRunner({
          //   datasource: DATASOURCE_REF,
          //   queries: [getPositionICRFQuery(NODE), getPositionGEOCQuery(NODE), getPositionLVLHQuery(NODE)],
          //   maxDataPoints: row_return,
          // }),
          isResizable: resizeable,
          isDraggable: draggable,
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
    controls: [
      new VariableValueSelectors({}),
      new SceneControlsSpacer(),
      customObject,
      new SceneTimePicker({ isOnCanvas: true }),
      new SceneRefreshPicker({})
    ],
  });


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
    type: 'position',
    // alias: '${nodeToShow}',
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

// function getDashQuery() {
//   return {
//     // arg: NODE,
//     // panelId: 11,
//     refId: 'A',
//     datasource: DASH_DATASOURCE_REF,
//     // filters: [
//     //   {
//     //     compareType: 'equals',
//     //     filterType: 'node',
//     //     filterValue: Node // need dynamic variable passed from node select
//     //   }
//     // ],
//     // functions: [],
//     // latestOnly: false,
//     // type: 'nodalaware'
//     // scenarioId: 'random_walk',
//     // seriesCount: 1,
//     // alias: roomName,
//     // min: 10,
//     // max: 30,
//   };
// }

const getFDDAppScenePage = () => {
  return new SceneApp({
    pages: [
      new SceneAppPage({
        // $timeRange: new SceneTimeRange({ from: 'now-6h', to: 'now' }),
        title: "Flight Director's Display",
        subTitle: 'This scene showcases the basic MOST functionality. Interact with CW panel to see details.',
        // controls: [new SceneTimePicker({ isOnCanvas: false })],
        url: prefixRoute(`${ ROUTES.FDD }`),
        hideFromBreadcrumbs: true,
        // scene,
        getScene,
        tabs: [
          new SceneAppPage({
            title: 'FDD',
            url: prefixRoute(`${ ROUTES.FDD }`),
            getScene: getScene,
          }),
          new SceneAppPage({
            title: 'Flight Dynamics',
            url: prefixRoute(`${ ROUTES.FDD }/flight`),
            getScene: getScene,
          }),
          new SceneAppPage({
            title: 'ADCS',
            url: prefixRoute(`${ ROUTES.FDD }/adcs`),
            getScene: getAdcsTabScene,
          }),
          new SceneAppPage({
            title: 'GS',
            url: prefixRoute(`${ ROUTES.FDD }/GS`),
            getScene: getTab1Scene,
          }),
        ]
        // drilldowns: [
        // {
        //   routePath: prefixRoute(`${ROUTES.WithDrilldown}`) + '/room/:roomName',
        //   getPage(routeMatch, parent) {
        //     const roomName = routeMatch.params.roomName;

        //     return new SceneAppPage({
        //       url: prefixRoute(`${ROUTES.WithDrilldown}`) + `/room/${roomName}/temperature`,
        //       title: `${roomName} overview`,
        //       subTitle: 'This scene is a particular room drilldown. It implements two tabs to organise the data.',
        //       getParentPage: () => parent,
        //       getScene: () => {
        //         return new EmbeddedScene({ body: new SceneFlexLayout({ children: [] }) });
        //       },
        //       tabs: [
        //         new SceneAppPage({
        //           title: 'Temperature',
        //           url: prefixRoute(`${ROUTES.WithDrilldown}`) + `/room/${roomName}/temperature`,
        //           getScene: () => getTemperatureOverviewScene(roomName),
        //         }),
        //         new SceneAppPage({
        //           title: 'Humidity',
        //           url: prefixRoute(`${ROUTES.WithDrilldown}`) + `/room/${roomName}/humidity`,
        //           getScene: () => getHumidityOverviewScene(roomName),
        //         }),
        //       ],
        //     });
        //   },
        // },
        // ],
      }),
    ],
  });
};

export const FDDPage = () => {
  // const scene = getScene();
  const scene = useMemo(() => getFDDAppScenePage(), []);


  return <scene.Component model={scene} />;
};
