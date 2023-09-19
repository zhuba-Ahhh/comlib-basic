import { isEmptyString, uuid } from './utils';
import visibleOpt from './utils'
import { DefaultEvent, AlignEnum, Data, DialogButtonProps, Location, InputIds } from './constants';

function findConfig({ data, focusArea }, propKey?: string) {
  if (!focusArea) return;
  const id = focusArea.dataset['handlerButton'];
  const index = data.footerBtns.findIndex((item) => item.id === id);
  if (index === -1) return;
  if (typeof propKey === 'string') {
    return data.footerBtns[index][propKey];
  }
  return data.footerBtns[index];
}

//新增按钮操作
let btnsLength,
    addBtn;

const initParams = (data: Data, output) => {
  btnsLength = (data.footerBtns || []).length;
  addBtn = (btn) => {
    data.footerBtns.unshift(btn);
    output.add(btn.id, `点击${btn.title}`, { type: 'any' })
  };
};

//图标编辑
function icon(dataset: string) {
  return {
    title: '图标',
    items: [
      {
        title: '使用图标',
        type: 'Switch',
        value: {
          get({ data, focusArea }: EditorResult<Data>) {
            return findConfig({ data, focusArea }).useIcon;
          },
          set({ data, focusArea }: EditorResult<Data>, value: boolean) {
            const res = findConfig({ data, focusArea }, 'icon');
            if (!res?.length) {
              findConfig({ data, focusArea }).icon = 'HomeOutlined';
            }
            findConfig({ data, focusArea }).useIcon = value;
          }
        }
      },
      {
        title: '显示文字',
        type: 'Switch',
        ifVisible({ data, focusArea }: EditorResult<Data>) {
          const useIcon = findConfig({ data, focusArea }, 'useIcon');
          return useIcon ? true : false;
        },
        value: {
          get({ data, focusArea }: EditorResult<Data>) {
            return findConfig({ data, focusArea }, 'showText');
          },
          set({ data, focusArea }: EditorResult<Data>, value: boolean) {
            findConfig({ data, focusArea }).showText = value;
          }
        }
      },
      {
        title: '图标位置',
        type: 'Select',
        options: [
          { label: '位于文字前', value: Location.FRONT },
          { label: '位于文字后', value: Location.BACK }
        ],
        ifVisible({ data, focusArea }) {
          const useIcon = findConfig({ data, focusArea }, 'useIcon');
          return useIcon ? true : false;
        },
        value: {
          get({ data, focusArea }: EditorResult<Data>) {
            return findConfig({ data, focusArea }, 'location') || Location.FRONT;
          },
          set({ data, focusArea }: EditorResult<Data>, value: boolean) {
            findConfig({ data, focusArea }).location = value;
          }
        }
      },
      {
        type: 'Icon',
        ifVisible({ data, focusArea }: EditorResult<Data>) {
          return findConfig({ data, focusArea }, 'useIcon');
        },
        value: {
          get({ data, focusArea }: EditorResult<Data>) {
            return findConfig({ data, focusArea }, 'icon');
          },
          set({ data, focusArea }: EditorResult<Data>, value: string) {
            findConfig({ data, focusArea }).icon = value;
          }
        }
      }
    ]
  };
}

export default {
  '@init'({style}) {
    style.width = '100%'
    style.height = '100%'
  },
  ':root': {
    style: [
      {
        title: '位置',
        type: 'Select',
        description: '抽屉在屏幕展开的位置',
        options() {
          return [
            { label: '上', value: 'top' },
            { label: '下', value: 'bottom' },
            { label: '左', value: 'left' },
            { label: '右', value: 'right' }
          ];
        },
        value: {
          get({ data }: EditorResult<Data>) {
            return data.placement;
          },
          set(
            { data }: EditorResult<Data>,
            value: 'top' | 'right' | 'bottom' | 'left' | undefined
          ) {
            data.placement = value;
          }
        }
      },
      {
        title: '宽度',
        description: '调试态和发布态,在placement为 top 或 bottom 时生效，其余方向时不生效；编辑态，这里的高度高度仅方便搭建。设置0将使用默认宽度：520',
        type: 'Slider',
        options: {
          max: 5000,
          min: 0,
          step: 100,
          formatter: 'px'
        },
        value: {
          get({ data }) {
            return data.width;
          },
          set({ data }, value: number) {        
            data.width = value;
          }
        }
      },
      {
        title: '抽屉高度',
        description: '调试态和发布态,在placement为 top 或 bottom 时生效，其余方向时不生效；编辑态，这里的高度高度仅方便搭建。设置0将使用默认高度：800',
        type: 'Slider',
        options: {
          max: 5000,
          min: 0,
          step: 100,
          formatter: 'px'
        },
        value: {
          get({ data }) {
            return data.height;
          },
          set({ data }, value: number) {
            data.height = value
          }
        }
      },
      {
        title: '内容',
        options: [ { type: 'background', config: { disableBackgroundImage: true } } ],
        global: true,
        target: '.{id} .ant-drawer-body'
      }
    ],
    items: ({}, cate1, cate2) => {
      cate1.title = '常规';
      cate1.items = [
        {
          title: '标题',
          type: 'Text',
          value: {
            get({ data }) {
              return data.title;
            },
            set({ data }, value: string) {
              if (isEmptyString(value)) {
                data.title = value;
              }
            }
          }
        },
        {
          title: '隐藏标题',
          type: 'Switch',
          value: {
            get({ data }) {
              return data.hideTitle;
            },
            set({ data }, value: boolean) {
              data.hideTitle = value;
            }
          }
        },
        {
          title: '关闭按钮',
          type: 'Switch',
          value: {
            get({ data }) {
              return data.closable;
            },
            set({ data }, value: boolean) {
              data.closable = value;
            }
          }
        },
        {
          title: '点击蒙层关闭',
          type: 'switch',
          value: {
            get({ data }) {
              return !!data.maskClosable;
            },
            set({ data }, val: boolean) {
              data.maskClosable = val;
            }
          }
        },
      ];
      cate2.title = '操作区';
      cate2.items = [
        {
          title: '显示',
          type: 'switch',
          value: {
            get({ data }) {
              return data.useFooter;
            },
            set({ data }, value: boolean) {
              data.useFooter = value;
            }
          }
        },
        {
          title: '对齐方式',
          type: 'Radio',
          options: [
            { value: AlignEnum.FlexStart, label: '居左' },
            { value: AlignEnum.Center, label: '居中' },
            { value: AlignEnum.FlexEnd, label: '居右' }
          ],
          value: {
            get({ data }) {
              return data.footerLayout;
            },
            set({ data }, value: AlignEnum) {
              data.footerLayout = value;
            }
          }
        },
        {
          title: '操作列表',
          description: '选中拖拽各项左侧手柄，可改变按钮的相对位置',
          type: 'array',
          options: {
            addText: '添加操作',
            deletable: false,
            editable: false,
            customOptRender: visibleOpt,
            getTitle: (item) => {
              return item?.title;
            },
            onAdd: () => {
              const defaultBtn = {
                title: `操作项${btnsLength + 1}`,
                id: uuid(),
                icon: "",
                useIcon: false,
                showText: true,
                dynamicHidden: true,
                dynamicDisabled: true,
                type: "default",
                visible: true,
                autoClose: true,
                isConnected: false,
                disabled: false,
                useDynamicDisabled: false,
                useDynamicHidden: false
              };
              addBtn(defaultBtn);
              return defaultBtn;
            },
          },
          value: {
            get({ data, output }: EditorResult<Data>) {
              initParams(data, output);
              return data.footerBtns || [];
            },
            set({ data }: EditorResult<Data>, val: any[]) {
              data.footerBtns = val;
            }
          }
        },
      ]
    }
  },
  '.ant-drawer-title': {
    title: '标题',
    items: [
      {
        title: '内容',
        type: 'text',
        ifVisible({ data }: EditorResult<Data>) {
          return !data.isTitleCustom;
        },
        value: {
          get({data}) {
            return data.title
          },
          set({data}, title) {
            data.title = title
          }
        }
      },
      {
        title: '自定义',
        type: 'switch',
        value: {
          get({data}) {
            return data.isTitleCustom
          },
          set({data,slot}, value) {
            data.isTitleCustom = value;
            if (data.isTitleCustom === true) {
              slot.add('title', '标题');
            } else {
              slot.remove('title', '标题');
            }
          }
        }
      }
    ]
  },
  '.ant-drawer-close': {
    title: '关闭按钮',
    items: [
      {
        title: '显示',
        type: 'Switch',
        value: {
          get({ data }) {
            return data.closable;
          },
          set({ data }, value: boolean) {
            data.closable = value;
          }
        }
      }
    ]
  },
  '[data-toolbar]': {
    title: '操作区',
    items: [
      {
        title: '显示',
        type: 'Switch',
        value: {
          get({ data }) {
            return data.useFooter;
          },
          set({ data }, value: boolean) {
            data.useFooter = value;
          }
        }
      },
      {
        title: '对齐方式',
        type: 'Radio',
        options: [
          { value: AlignEnum.FlexStart, label: '居左' },
          { value: AlignEnum.Center, label: '居中' },
          { value: AlignEnum.FlexEnd, label: '居右' }
        ],
        value: {
          get({ data }) {
            return data.footerLayout;
          },
          set({ data }, value: AlignEnum) {
            data.footerLayout = value;
          }
        }
      },
      {
        title: '操作列表',
        description: '选中拖拽各项左侧手柄，可改变按钮的相对位置',
        type: 'array',
        options: {
          addText: '添加操作',
          deletable: false,
          editable: false,
          customOptRender: visibleOpt,
          getTitle: (item) => {
            return item?.title;
          },
          onAdd: () => {
            const defaultBtn = {
              title: `操作项${btnsLength + 1}`,
              id: uuid(),
              icon: "",
              useIcon: false,
              showText: true,
              dynamicHidden: true,
              dynamicDisabled: true,
              type: "default",
              visible: true,
              autoClose: true,
              isConnected: false,
              disabled: false,
              useDynamicDisabled: false,
              useDynamicHidden: false
            };
            addBtn(defaultBtn);
            return defaultBtn;
          },
        },
        value: {
          get({ data, output }: EditorResult<Data>) {
            initParams(data, output);
            return data.footerBtns || [];
          },
          set({ data }: EditorResult<Data>, val: any[]) {
            data.footerBtns = val;
          }
        }
      }
    ]
  },
  '[data-handler-button]': {
    title: '按钮',
    items: ({}: EditorResult<Data>, cate1, cate2)=>{
      cate1.title = '按钮',
      cate1.items = [
        {
          title: '显示',
          type: 'Switch',
          value: {
            get({ data, focusArea }: EditorResult<Data>) {
              return !!findConfig({ data, focusArea }, 'visible');
            },
            set({ data, focusArea }: EditorResult<Data>, value: boolean) {
              findConfig({ data, focusArea }).visible = !!value;
            }
          }
        },
        {
          title: '名称',
          type: 'Text',
          value: {
            get({ data, focusArea }) {
              return findConfig({ data, focusArea }, 'title')
            },
            set({ data, focusArea }, value: string) {
              findConfig({ data, focusArea }).title = value;
            }
          }
        },
        {
          title: '基础样式',
          items: [
            {
              title: '风格',
              type: 'Select',
              options() {
                return [
                  { value: 'default', label: '默认' },
                  { value: 'primary', label: '主按钮' },
                  { value: 'dashed', label: '虚线按钮' },
                  { value: 'danger', label: '危险按钮' },
                  { value: 'link', label: '链接按钮' },
                  { value: 'text', label: '文字按钮' }
                ];
              },
              value: {
                get({ data, focusArea }: EditorResult<Data>) {
                  return findConfig({ data, focusArea }, 'type');
                },
                set({ data, focusArea }: EditorResult<Data>, value: string) {
                  findConfig({ data, focusArea }).type = value;
                }
              }
            }
          ]
        },
        icon('handlerButton'),
        {
          title: '事件',
          items: [
            {
              title: '点击自动关闭抽屉',
              description: '开启时, 单击按钮会自动关闭抽屉。特殊处理：当需要向外输出数据时, 抽屉在数据输出后关闭。',
              type: 'switch',
              ifVisible({ data, focusArea }: EditorResult<Data>) {
                return findConfig({ data, focusArea }, 'id') === 'cancel';
              },
              value: {
                get({ data, focusArea }: EditorResult<Data>) {
                  return findConfig({ data, focusArea }, 'autoClose');
                },
                set({ data, focusArea }: EditorResult<Data>, value: boolean) {
                  findConfig({ data, focusArea }).autoClose = value;
                }
              }
            },
            {
              title: '点击',
              type: '_event',
              options({data, focusArea}) {
                return {
                  outputId: findConfig({ data, focusArea }, 'id')
                }
              }
            }
          ]
        },
        {
          title: '删除',
          type: 'Button',
          ifVisible({ data, focusArea }) {
            return !DefaultEvent.includes(findConfig({ data, focusArea }, 'id'));
          },
          value: {
            set({ data, output, focusArea }: EditorResult<Data>) {
              const footerBtns = data.footerBtns;
              const itemId = findConfig({ data, focusArea }, 'id');
              const index = footerBtns.findIndex((item) => item.id === itemId);
              const item = data.footerBtns[index];
  
              output.remove(item.id);
              footerBtns.splice(index, 1);
            }
          }
        }
      ],
      cate2.title = '高级',
      cate2.items = [
        {
          title: '动态启用/禁用',
          type: 'Switch',
          value: {
            get({ data, focusArea }: EditorResult<Data>) {
              return !!findConfig({ data, focusArea }, 'useDynamicDisabled');
            },
            set({ data, focusArea, input }: EditorResult<Data>, value: boolean) {
              if (!focusArea) return;
              const id = findConfig({ data, focusArea }, 'id');
              const title =  findConfig({ data, focusArea }, 'title');
              const eventKey1 = `${InputIds.SetEnable}_${id}`;
              const eventKey2 = `${InputIds.SetDisable}_${id}`;
      
              const event1 = input.get(eventKey1);
              const event2 = input.get(eventKey2);
              if (value) {
                !event1 && input.add(eventKey1, `启用-"${title}"`, {type: 'any'});
                !event2 && input.add(eventKey2, `禁用-"${title}"`, {type: 'any'});
              } else {
                event1 && input.remove(eventKey1);
                event2 && input.remove(eventKey2);
              }
              findConfig({ data, focusArea }).useDynamicDisabled = value;
            }
          }
        },
        {
          title: '动态显示/隐藏',
          type: 'Switch',
          value: {
            get({ data, focusArea }: EditorResult<Data>) {
              return !!findConfig({ data, focusArea }, 'useDynamicHidden')
            },
            set({ data, focusArea, input }: EditorResult<Data>, value: boolean) {
              if (!focusArea) return;
              const id = findConfig({ data, focusArea }, 'id');
              const title =  findConfig({ data, focusArea }, 'title');
              const eventKey1 = `${InputIds.SetShow}_${id}`;
              const eventKey2 = `${InputIds.SetHidden}_${id}`;
      
              const event1 = input.get(eventKey1);
              const event2 = input.get(eventKey2);
              if (value) {
                !event1 && input.add(eventKey1, `显示-"${title}"`, {type: 'any'});
                !event2 && input.add(eventKey2, `隐藏-"${title}"`, {type: 'any'});
              } else {
                event1 && input.remove(eventKey1);
                event2 && input.remove(eventKey2);
              }
              findConfig({ data, focusArea }).useDynamicHidden = value;
            }
          }
        }
      ]
    }
  }
}