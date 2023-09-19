import {
  // CustomVariable,
  EmbeddedScene,
  SceneControlsSpacer,
  // SceneFlexItem,
  // SceneFlexLayout,
  SceneGridLayout,
  SceneGridItem,
  SceneQueryRunner,
  SceneRefreshPicker,
  SceneTimePicker,
  SceneTimeRange,
  // SceneVariableSet,
  VariableValueSelectors,
  VizPanel,
} from '@grafana/scenes';
import {TEST_DATASOURCE_REF} from '../../../constants';
import {NodeSceneObject} from '../../FDD/NodeSceneObject';

export function getGSScene(templatised = true, seriesToShow = '__server_names') {
  // const timeRange = new SceneTimeRange({
  //   from: 'now-6h',
  //   to: 'now',
  // });

  // // Variable definition, using Grafana built-in TestData datasource
  // const customVariable = new CustomVariable({
  //   name: 'seriesToShow',
  //   label: 'Series to show',
  //   value: '__server_names',
  //   query: 'Server Names : __server_names, House locations : __house_locations',
  // });

  // Query runner definition, using Grafana built-in TestData datasource
  const queryRunnerGS = new SceneQueryRunner({
    datasource: TEST_DATASOURCE_REF,
    queries: [
      {
        refId: 'A',
        datasource: TEST_DATASOURCE_REF,
        scenarioId: 'random_walk',
        seriesCount: 5,
        // Query is using variable value
        alias: templatised ? '${seriesToShow}' : seriesToShow,
        min: 30,
        max: 60,
      },
    ],
    maxDataPoints: 100,
  });

  // Custom object definition
  const customObject = new NodeSceneObject({
    node: templatised ? 'mother' : seriesToShow, //'mother',
  });

  // Query runner activation handler that will update query runner state when custom object state changes
  queryRunnerGS.addActivationHandler(() => {
    const sub = customObject.subscribeToState((newState) => {
      queryRunnerGS.setState({
        queries: [
          {
            ...queryRunnerGS.state.queries[0],
            seriesNode: newState.node,
          },
        ],
      });
      queryRunnerGS.runQueries();
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
            title: 'GS subsystem panel',
            pluginId: 'text',
            options: {
              content: `GS <in development> ${ seriesToShow }`,
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
    controls: [
      new VariableValueSelectors({}),
      new SceneControlsSpacer(),
      customObject,
      new SceneTimePicker({isOnCanvas: true}),
      new SceneRefreshPicker({})
    ],
  });
}
