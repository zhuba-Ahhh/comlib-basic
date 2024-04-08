export interface ArrowProps {
  type: "both" | "left" | "right";
  color: string;
  arrowWidth: number;
  arrowLength: number;
  arrowBodyWidth: number; // 箭体宽度
  angle?: number; // 可选的旋转角度
}
