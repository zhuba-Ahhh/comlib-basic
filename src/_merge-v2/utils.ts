import { Data } from "./constants";
import { getInputOrder } from "../utils/basic";

// 获取输出schema
function getOutputSchema(data: Data, input) {
  const res = {};
  const inputList = input.get() || [];
  const [first, ...rest] = inputList;
  const firstSchema = input.get(first?.id)?.schema;
  const firstSchemaJSON = JSON.stringify(firstSchema);

  // 1. 对象合并
  const isMergeObject = (inputList || []).every((item) => {
    const schema = input.get(item?.id)?.schema;
    return schema?.type === "object";
  });
  if (isMergeObject) {
    (inputList || []).forEach((item) => {
      const schema = input.get(item?.id)?.schema;
      Object.assign(res, schema?.properties);
    });
    return {
      type: "object",
      properties: res,
    };
  }
  // 2. 数组子项类型相同
  const isArraySameSchema = rest.every((item) => {
    const schema = input.get(item?.id)?.schema;
    return JSON.stringify(schema) === firstSchemaJSON;
  });
  if (isArraySameSchema) {
    return {
      type: "array",
      items: firstSchema,
    };
  }
  // 其他情形
  return {
    type: "array",
    items: {
      type: "any",
    },
  };
}

export { getInputOrder, getOutputSchema };
