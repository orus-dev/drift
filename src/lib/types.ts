import { Color } from "./ui/color";

export type Task = {
  id: string;
  title: string;
  description?: string;
  tags?: { name: string; color: Color }[];
};
