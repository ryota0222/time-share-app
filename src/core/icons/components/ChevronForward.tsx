import { memo } from "react";

import { IconProps } from "../types";

export const ChevronForwardIcon = memo<IconProps>(
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
        d="M20.8787 11.8787C22.0503 10.7071 23.9497 10.7071 25.1213 11.8787L43.1213 29.8787C44.2929 31.0503 44.2929 32.9497 43.1213 34.1213L25.1213 52.1213C23.9497 53.2929 22.0503 53.2929 20.8787 52.1213C19.7071 50.9497 19.7071 49.0503 20.8787 47.8787L36.7574 32L20.8787 16.1213C19.7071 14.9497 19.7071 13.0503 20.8787 11.8787Z"
        fill={color}
      />
    </svg>
  )
);
