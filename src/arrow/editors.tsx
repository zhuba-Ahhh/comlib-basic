import { ArrowProps } from "./constants";
import Style from "./runtime.less";

export default {
  "@init"({ style }) {
    style.width = 200;
    style.height = "fit-content";
  },
  "@resize": {
    options: ["width"],
  },
  ":root": {
    style: [
      {
        title: "箭头",
        type: "style",
        options: ["background"],
        target: `.${Style.arrowWarrper}`,
      },
      {
        title: "箭头",
        type: "style",
        options: ["border"],
        target: `.${Style.arrowWarrper}`,
      },
    ],
    items: [
      {
        title: "箭头方向",
        type: "Select",
        options: [
          { value: "left", label: "左" },
          { value: "right", label: "右" },
          { value: "both", label: "双向" },
        ],
        value: {
          get({ data }: EditorResult<ArrowProps>) {
            return data.type;
          },
          set({ data }: EditorResult<ArrowProps>, value: ArrowProps["type"]) {
            data.type = value;
          },
        },
      },
      {
        title: "颜色",
        type: "COLORPICKER",
        value: {
          get({ data }: EditorResult<ArrowProps>) {
            return data.color;
          },
          set({ data }: EditorResult<ArrowProps>, value: string) {
            data.color = value;
          },
        },
      },
      {
        title: "角度",
        type: "inputNumber",
        options: [{ min: -360, max: 360, width: 60 }],
        value: {
          get({ data }: EditorResult<ArrowProps>) {
            return [data.angle];
          },
          set({ data }: EditorResult<ArrowProps>, value: number[]) {
            data.angle = value[0];
          },
        },
      },
      {
        title: "箭头尖高",
        type: "inputNumber",
        description: "三角形底 单位 px",
        options: [{ min: 0, width: 100, formatter: "px" }],
        value: {
          get({ data }: EditorResult<ArrowProps>) {
            return [data.arrowHeight];
          },
          set({ data }: EditorResult<ArrowProps>, value: number[]) {
            data.arrowHeight = value[0];
          },
        },
      },
      {
        title: "箭头尖宽",
        type: "inputNumber",
        description: "三角形底 单位 px",
        options: [{ min: 0, width: 100, formatter: "px" }],
        value: {
          get({ data }: EditorResult<ArrowProps>) {
            return [data.arrowWidth];
          },
          set({ data }: EditorResult<ArrowProps>, value: number[]) {
            data.arrowWidth = value[0];
          },
        },
      },
      {
        title: "箭头尾高",
        type: "inputNumber",
        description: "长方形宽 单位 px",
        options: [{ min: 0, width: 100, formatter: "px" }],
        value: {
          get({ data }: EditorResult<ArrowProps>) {
            return [data.arrowBodyHeight];
          },
          set({ data }: EditorResult<ArrowProps>, value: number[]) {
            data.arrowBodyHeight = value[0];
          },
        },
      },
    ],
  },
};
