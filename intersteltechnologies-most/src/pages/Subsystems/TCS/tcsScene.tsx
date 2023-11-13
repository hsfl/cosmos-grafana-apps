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

export function getTCSScene() {

  const NODE = 'mother'; //'${nodeToShow}';
  const row_return = 1000;

  const showTCS = new ConstantVariable({
    value: "false",
  });

  // Custom object definition
  const customObject = new NodeSceneObject({
    node: 'mother',
  });

  function getTsenQuery(Node: string) {
    return {
      arg: '',
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
      type: 'tsen',
    };
  }

  function getBcregQuery(Node: string) {
    return {
      arg: '',
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
      type: 'bcreg',
    };
  }

  // Query runner definition
  const queryRunnerTCS = new SceneQueryRunner({
    datasource: DATASOURCE_REF,
    queries: [
      getTsenQuery(NODE),
      getBcregQuery(NODE),
    ],
    maxDataPoints: row_return,
  });

  // Query runner activation handler that will update query runner state when custom object state changes
  queryRunnerTCS.addActivationHandler(() => {
    const sub = customObject.subscribeToState((newState) => {
      queryRunnerTCS.setState({
        queries: [
          getTsenQuery(newState.node),
          getBcregQuery(newState.node),
        ],
      });
      queryRunnerTCS.runQueries();
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
    $data: queryRunnerTCS,
    $variables: new SceneVariableSet({
      variables: [showTCS],
    }),
    body: new SceneGridLayout({
      isDraggable: false,
      isLazy: false,
      children: [
        new SceneGridItem({
          height: 16,
          width: 21,
          x: 0,
          y: 2,
          $data: queryRunnerTCS,
          isResizable: true,
          isDraggable: true,
          body: new VizPanel({
            title: 'TCS',
            pluginId: 'interstel-thermalsubsystem-panel', // from panel.json 'name' value
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
        // ...[new_imu_scene(3, queryRunnerIMU)],
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
