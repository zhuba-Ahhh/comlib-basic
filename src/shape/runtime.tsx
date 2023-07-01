import React from 'react';
import { clipPaths, ShapeProps } from './constants';
import css from './runtime.less';

interface RuntimeShapeProps {
  data: ShapeProps;
}

export default function ({ data }: RuntimeShapeProps) {
  const { type, rotate, } = data;

  const shapeStyles: React.CSSProperties = {
    clipPath: clipPaths[type],
    transform: `rotate(${rotate}deg)`
  };

  return (
    <div className={css.shape} data-item-type="wrapper">
      <div style={shapeStyles} className={css.shape} data-item-type="shape" />
    </div>
  );
}
