export type Color =
  | "default"
  | "gray"
  | "brown"
  | "orange"
  | "yellow"
  | "green"
  | "blue"
  | "purple"
  | "pink"
  | "red";

interface ColorStyle {
  backgroundColor: string;
  color: string;
}

export function getColor(color: Color): ColorStyle {
  const colors: Record<Color, ColorStyle> = {
    default: {
      backgroundColor: "rgba(47, 52, 55, 0.27)",
      color: "#FFFFFF",
    },
    gray: {
      backgroundColor: "rgba(151, 154, 155, 0.27)",
      color: "#979A9B",
    },
    brown: {
      backgroundColor: "rgba(147, 114, 100, 0.27)",
      color: "#937264",
    },
    orange: {
      backgroundColor: "rgba(255, 163, 68, 0.27)",
      color: "#FFA344",
    },
    yellow: {
      backgroundColor: "rgba(255, 220, 73, 0.27)",
      color: "#FFDC49",
    },
    green: {
      backgroundColor: "rgba(77, 171, 154, 0.27)",
      color: "#4DAB9A",
    },
    blue: {
      backgroundColor: "rgba(82, 156, 202, 0.27)",
      color: "#529CCA",
    },
    purple: {
      backgroundColor: "rgba(154, 109, 215, 0.27)",
      color: "#9A6DD7",
    },
    pink: {
      backgroundColor: "rgba(226, 85, 161, 0.27)",
      color: "#E255A1",
    },
    red: {
      backgroundColor: "rgba(255, 115, 105, 0.27)",
      color: "#FF7369",
    },
  };

  return colors[color];
}
