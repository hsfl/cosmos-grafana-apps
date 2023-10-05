import {
  SceneQueryRunner,
  EmbeddedScene,
  SceneGridLayout,
  SceneGridItem,
  VizPanel,
  SceneTimeRange,
  SceneControlsSpacer,
  SceneTimePicker,
  SceneRefreshPicker,
  ConstantVariable,
  SceneVariableSet
} from '@grafana/scenes';
import { DATASOURCE_REF } from '../../../constants';
import { NodeSceneObject } from '../../FDD/NodeSceneObject';

export function getADCSScene() {

  const NODE = 'mother'; //'${nodeToShow}';
  const row_return = 1000;

  const showADCS = new ConstantVariable({
    value: "false",
  });

  // Custom object definition
  const customObject = new NodeSceneObject({
    node: 'mother',
  });

  function getPositionICRFQuery(Node: string) {
    return {
      arg: 'icrf',
      refId: 'A',
      datasource: DATASOURCE_REF,
      filters: [
        {
          compareType: 'equals',
          filterType: 'node',
          filterValue: Node
        }
      ],
      functions: [],
      latestOnly: false,
      type: 'position'
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
          filterValue: Node
        }
      ],
      functions: [],
      latestOnly: false,
      type: 'position'
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
          filterValue: Node
        }
      ],
      functions: [],
      latestOnly: false,
      type: 'position',
    };
  }

  function getPositionAttTotQuery(Node: string) {
    return {
      arg: 'att_total',
      refId: 'A',
      datasource: DATASOURCE_REF,
      filters: [
        {
          compareType: 'equals',
          filterType: 'node',
          filterValue: Node
        }
      ],
      functions: [],
      latestOnly: false,
      type: 'position',
    };
  }

  function getSsenQuery(Node: string) {
    return {
      arg: '',
      refId: 'D',
      datasource: DATASOURCE_REF,
      filters: [
        {
          compareType: 'equals',
          filterType: 'node',
          filterValue: Node
        }
      ],
      functions: [],
      latestOnly: false,
      type: 'ssen',
    };
  }

  function getImuQuery(Node: string) {
    return {
      arg: '',
      refId: 'E',
      datasource: DATASOURCE_REF,
      filters: [
        {
          compareType: 'equals',
          filterType: 'node',
          filterValue: Node
        }
      ],
      functions: [],
      latestOnly: false,
      type: 'imu',
    };
  }

  function getGpsQuery(Node: string) {
    return {
      arg: '',
      refId: 'F',
      datasource: DATASOURCE_REF,
      filters: [
        {
          compareType: 'equals',
          filterType: 'node',
          filterValue: Node
        }
      ],
      functions: [],
      latestOnly: false,
      type: 'gps',
    };
  }

  // Query runner definition
  const queryRunnerADCS = new SceneQueryRunner({
    datasource: DATASOURCE_REF,
    queries: [
      getPositionICRFQuery(NODE), getPositionGEOCQuery(NODE), getPositionLVLHQuery(NODE),
    ],
    maxDataPoints: row_return,
  });
  const queryRunnerEstState = new SceneQueryRunner({
    datasource: DATASOURCE_REF,
    queries: [
      getPositionAttTotQuery(NODE),
    ],
    maxDataPoints: row_return,
  });
  const queryRunnerIMU = new SceneQueryRunner({
    datasource: DATASOURCE_REF,
    queries: [
      getImuQuery(NODE)
    ],
    maxDataPoints: row_return,
  });
  const queryRunnerSSEN = new SceneQueryRunner({
    datasource: DATASOURCE_REF,
    queries: [
      getSsenQuery(NODE)
    ],
    maxDataPoints: row_return,
  });
  const queryRunnerGPS = new SceneQueryRunner({
    datasource: DATASOURCE_REF,
    queries: [
      getGpsQuery(NODE)
    ],
    maxDataPoints: row_return,
  });

  // TODO needs to get passed query results for dynamic rendering per node;
  // able to iterate over panel items dynamically, needs to have results of query prior to rendering
  // as the scene query may happen after the scene and panels are rendered

  // const array = ['one', 'two', 'three'];
  // let child: SceneGridItem[] = [];
  // array.forEach((arr) => {
  //   let item = new SceneGridItem({
  //     x: 9,
  //     y: 3,
  //     width: 13,
  //     height: 17,
  //     $data: queryRunnerADCS,
  //     // $data: new SceneQueryRunner({
  //     //   datasource: DATASOURCE_REF,
  //     //   queries: [getPositionICRFQuery(NODE), getPositionGEOCQuery(NODE), getPositionLVLHQuery(NODE)],
  //     //   maxDataPoints: row_return,
  //     // }),
  //     isResizable: true,
  //     isDraggable: true,
  //     body: new VizPanel({
  //       title: 'ADCS',
  //       pluginId: 'interstel-adcs-display', // from panel.json 'name' value
  //       options: {
  //       },
  //     }),
  //   })
  //   child.push(item);
  // })

  // Query runner activation handler that will update query runner state when custom object state changes
  queryRunnerADCS.addActivationHandler(() => {
    const sub = customObject.subscribeToState((newState) => {
      queryRunnerADCS.setState({
        queries: [
          getPositionICRFQuery(newState.node),
          getPositionGEOCQuery(newState.node),
          getPositionLVLHQuery(newState.node),
        ],
      });
      queryRunnerADCS.runQueries();
    });
    return () => {
      sub.unsubscribe();
    };
  });
  queryRunnerEstState.addActivationHandler(() => {
    const sub = customObject.subscribeToState((newState) => {
      queryRunnerEstState.setState({
        queries: [
          getPositionAttTotQuery(newState.node),
        ],
      });
      queryRunnerEstState.runQueries();
    });
    return () => {
      sub.unsubscribe();
    };
  });
  queryRunnerIMU.addActivationHandler(() => {
    const sub = customObject.subscribeToState((newState) => {
      queryRunnerIMU.setState({
        queries: [
          getImuQuery(newState.node),
        ],
      });
      queryRunnerIMU.runQueries();
    });
    return () => {
      sub.unsubscribe();
    };
  });
  queryRunnerSSEN.addActivationHandler(() => {
    const sub = customObject.subscribeToState((newState) => {
      queryRunnerSSEN.setState({
        queries: [
          getSsenQuery(newState.node),
        ],
      });
      queryRunnerSSEN.runQueries();
    });
    return () => {
      sub.unsubscribe();
    };
  });
  queryRunnerGPS.addActivationHandler(() => {
    const sub = customObject.subscribeToState((newState) => {
      queryRunnerGPS.setState({
        queries: [
          getGpsQuery(newState.node),
        ],
      });
      queryRunnerGPS.runQueries();
    });
    return () => {
      sub.unsubscribe();
    };
  });

  return new EmbeddedScene({
    $timeRange: new SceneTimeRange({
      from: "2023-06-12T00:00:00.000Z",
      to: "2023-06-12T02:00:00.000Z"
      // from: 'now-12h',
      // to: 'now',
    }),
    $data: queryRunnerADCS,
    $variables: new SceneVariableSet({
      variables: [showADCS],
    }),
    body: new SceneGridLayout({
      isDraggable: false,
      isLazy: false,
      children: [
        new SceneGridItem({
          height: 11,
          width: 8,
          x: 12,
          y: 0,
          $data: queryRunnerADCS,
          isResizable: true,
          isDraggable: true,
          body: new VizPanel({
            title: 'ADCS',
            pluginId: 'interstel-adcs-display', // from panel.json 'name' value
            options: {
              showSeriesCount: false,
            },
          }),
        }),
        new SceneGridItem({
          height: 2,
          width: 12,
          x: 0,
          y: 0,
          isResizable: true,
          isDraggable: true,
          body: new VizPanel({
            title: '',
            pluginId: 'interstel-timeline', // from panel.json 'name' value
            options: {
              seriesCountSize: "sm",
              showSeriesCount: false,
            },
          }),
        }),
        new SceneGridItem({
          height: 10,
          width: 4,
          x: 20,
          y: 0,
          $data: queryRunnerEstState,
          isResizable: true,
          isDraggable: true,
          body: new VizPanel({
            title: 'Estimated States',
            pluginId: 'interstel-adcssubsystem-panel',
            options: {
              showSeriesCount: false,
            },
          }),
        }),
        new SceneGridItem({
          height: 4,
          width: 6,
          x: 0,
          y: 2,
          $data: queryRunnerIMU,
          isResizable: true,
          isDraggable: true,
          body: new VizPanel({
            title: 'IMU 1',
            pluginId: 'interstel-adcssubsystem-panel',
            options: {
            },
          }),
        }),
        new SceneGridItem({
          height: 4,
          width: 6,
          x: 6,
          y: 2,
          $data: queryRunnerIMU,
          isResizable: true,
          isDraggable: true,
          body: new VizPanel({
            title: 'IMU 2',
            pluginId: 'interstel-adcssubsystem-panel',
            options: {
            },
          }),
        }),
        new SceneGridItem({
          height: 5,
          width: 6,
          x: 0,
          y: 6,
          $data: queryRunnerSSEN,
          isResizable: true,
          isDraggable: true,
          body: new VizPanel({
            title: 'SSEN 1',
            pluginId: 'interstel-adcssubsystem-panel',
            options: {
            },
          }),
        }),
        new SceneGridItem({
          height: 5,
          width: 6,
          x: 6,
          y: 6,
          $data: queryRunnerSSEN,
          isResizable: true,
          isDraggable: true,
          body: new VizPanel({
            title: 'SSEN 2',
            pluginId: 'interstel-adcssubsystem-panel',
            options: {
            },
          }),
        }),
        new SceneGridItem({
          height: 4,
          width: 6,
          x: 0,
          y: 11,
          $data: queryRunnerGPS,
          isResizable: true,
          isDraggable: true,
          body: new VizPanel({
            title: 'GPS 1',
            pluginId: 'interstel-adcssubsystem-panel',
            options: {
            },
          }),
        }),
        new SceneGridItem({
          height: 4,
          width: 6,
          x: 6,
          y: 11,
          $data: queryRunnerGPS,
          isResizable: true,
          isDraggable: true,
          body: new VizPanel({
            title: 'GPS 2',
            pluginId: 'interstel-adcssubsystem-panel',
            options: {
            },
          }),
        }),
        // add elements dynamically from array
        // ...child
        //
      ],
    }),
    controls: [
      new SceneControlsSpacer(),
      customObject,
      new SceneTimePicker({ isOnCanvas: true }),
      new SceneRefreshPicker({})
    ],
  });
}
