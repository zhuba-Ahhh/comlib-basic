import React from 'react';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

export function isEmptyString(str: string): boolean {
  if (typeof str !== 'string') {
    return false
  } else {
    return !!str.trim().length
  }
}

export function uuid(pre = 'u_', len = 6) {
  const seed = 'abcdefhijkmnprstwxyz0123456789', maxPos = seed.length;
  let rtn = '';
  for (let i = 0; i < len; i++) {
    rtn += seed.charAt(Math.floor(Math.random() * maxPos));
  }
  return pre + rtn;
}

export default ({ item, index, setList }) => {
  return (
    <div
      onClick={() => {
        setList((prev) => {
          const copy = [...prev];
          if (copy && copy[index]) {
            copy[index].visible = !copy[index].visible;
          }
          return copy;
        });
      }}
      style={{cursor: "pointer", padding: "0 10px"}}
    >
      {item.visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
    </div>
  );
};

export function unitConversion(value: string) {
  if (/^\d+(?:%)$/.test(value)) {
    return value
  } else if (/^(?:calc)/.test(value)) {
    return value
  } else if (/^\d+(?:vh)$/.test(value)) {
    return parseInt(value, 10) + 'vh'
  } else if (/^\d+(?:vw)$/.test(value)) {
    return parseInt(value, 10) + 'vw'
  } else {
    return /^\d+(?:px)?$/.test(value) ? parseInt(value, 10) + 'px' : void 0
  }
}