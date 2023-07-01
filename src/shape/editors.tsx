import { ShapeProps, ShapeType } from './constants';

export default {
  '@init'({ style }) {
    style.width = 20;
    style.height = 20;
  },
  '@resize': {
    options: ['width', 'height']
  },
  ':root': {
    style: [
      {
        title: '形状',
        type: 'style',
        options: ['background', 'padding'],
        initValue: {
          backgroundColor: '#000'
        },
        target: '[data-item-type="shape"]'
      },
      {
        title: '形状',
        type: 'style',
        options: ['padding'],
        initValue: {
          backgroundColor: '#000'
        },
        target: '[data-item-type="wrapper"]'
      },
      {
        title: '旋转',
        type: 'inputnumber',
        description: '顺时针旋转',
        options: [{ min: -360, max: 360 }],
        value: {
          get({ data }: EditorResult<ShapeProps>) {
            return [data.rotate || 0];
          },
          set({ data }: EditorResult<ShapeProps>, value: number[]) {
            data.rotate = value[0];
          }
        }
      },
    ],
    items: [
      {
        title: '形状',
        type: 'Select',
        options: [
          { value: 'circle', label: '圆形' },
          { value: 'ellipse', label: '椭圆' },
          { value: 'square', label: '矩形' },
          { value: 'triangle', label: '三角形' }
        ],
        value: {
          get({ data }: EditorResult<ShapeProps>) {
            return data.type;
          },
          set({ data }: EditorResult<ShapeProps>, value: ShapeType) {
            data.type = value;
          }
        }
      },
    ]
  }
};
