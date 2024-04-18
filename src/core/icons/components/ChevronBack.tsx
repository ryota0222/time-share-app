import { memo } from "react";

import { IconProps } from "../types";

export const ChevronBackIcon = memo<IconProps>(
  ({ width = 24, height = 24, color = "#000" }) => (
    <svg
      width={width}
      height={height}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M43.1213 11.8787C41.9497 10.7071 40.0503 10.7071 38.8787 11.8787L20.8787 29.8787C19.7071 31.0503 19.7071 32.9497 20.8787 34.1213L38.8787 52.1213C40.0503 53.2929 41.9497 53.2929 43.1213 52.1213C44.2929 50.9497 44.2929 49.0503 43.1213 47.8787L27.2426 32L43.1213 16.1213C44.2929 14.9497 44.2929 13.0503 43.1213 11.8787Z"
        fill={color}
      />
    </svg>
  )
);
