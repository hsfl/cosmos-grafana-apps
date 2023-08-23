import { EmbeddedScene, SceneFlexLayout, SceneFlexItem, VizPanel } from '@grafana/scenes';

export function getScene() {
  return new EmbeddedScene({
    body: new SceneFlexLayout({
      children: [
        new SceneFlexItem({
          width: '100%',
          height: 300,
          body: new VizPanel({
            title: 'FDD panel',
            pluginId: 'text',
            options: {
              content: 'fddfdd! ',
            },
          }),
        }),
      ],
    }),
  });
}
