import React from 'react';
import { clipPaths, ShapeProps } from './constants';
import css from './runtime.less';

const wrapperStyles: React.CSSProperties = {
  width: '100%',
  height: '100%'
};

interface RuntimeShapeProps {
  data: ShapeProps;
}

export default function ({ data }: RuntimeShapeProps) {
  const { type, rotate, } = data;

  const shapeStyles: React.CSSProperties = {
    ...wrapperStyles,
    clipPath: clipPaths[type],
    transform: `rotate(${rotate}deg)`
  };

  return (
    <div style={wrapperStyles} className={css.wrapper} data-item-type="wrapper">
      <div style={shapeStyles} className={css.shape} data-item-type="shape" />
    </div>
  );
}
