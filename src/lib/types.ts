import { Color } from "./ui/color";

export type Task = {
  id: string;
  title: string;
  status: string;
  description?: string;
  tags?: string[];
};

export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;
