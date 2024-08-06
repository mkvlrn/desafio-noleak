import { next } from "@mkvlrn/eslint-config";

export default [
  ...next,
  {
    ignores: ["dist"],
  },
];
