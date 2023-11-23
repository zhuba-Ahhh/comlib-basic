import { OutputIds } from "./constants";

export default function ({ env, inputs, outputs }) {
  const { runtime } = env;
  let list: any[] = [];

  if (runtime) {
    inputs["input"]((val: Record<string, Array<any>>) => {
      list = Object.values(val);
      outputs[OutputIds.Output](list);
    });
  }
}
