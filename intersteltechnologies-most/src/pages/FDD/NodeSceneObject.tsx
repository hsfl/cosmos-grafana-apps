import React from 'react';
import {SceneComponentProps, SceneObjectBase, SceneObjectState} from '@grafana/scenes';
import {Input} from '@grafana/ui';

export interface NodeSceneObjectState extends SceneObjectState {
  node: string;
}

export class NodeSceneObject extends SceneObjectBase<NodeSceneObjectState> {
  static Component = NodeSceneObjectRenderer;

  onValueChange = (value: string) => {
    this.setState({node: value});
  };
}

function NodeSceneObjectRenderer({model}: SceneComponentProps<NodeSceneObject>) {
  const state = model.useState();

  return (
    <Input
      prefix="Node name"
      defaultValue={state.node}
      width={20}
      type="string"
      onBlur={(evt) => {
        model.onValueChange(evt.currentTarget.value);
      }}
    />
  );
}
