import { EmbeddedScene, SceneGridLayout, SceneGridItem, VizPanel, SceneTimeRange, SceneControlsSpacer, SceneTimePicker, SceneRefreshPicker } from '@grafana/scenes';
// import { DATASOURCE_REF } from '../../../constants';

// const myTimeSeriesPanel = PanelBuilders.timeseries().setTitle('My first panel');
// const NODE = 'mother';
// const row_return = 1000;

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
            title: 'ADCS subsystem panel',
            pluginId: 'text',
            options: {
              content: 'ADCS <in development>',
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
}
