import React from 'react';
import { getScene } from './fddScene';

export const FDDPage = () => {
  const scene = getScene();

  return <scene.Component model={scene} />;
};
