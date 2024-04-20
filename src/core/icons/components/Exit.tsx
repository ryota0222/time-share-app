import { memo } from "react";

import { IconProps } from "../types";

export const ExitIcon = memo<IconProps>(
  ({ width = 24, height = 24, color = "#000" }) => (
    <svg
      width={width}
      height={height}
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.76884 4.51884C3.26113 4.02656 3.92881 3.75 4.625 3.75H13.625C14.3212 3.75 14.9889 4.02656 15.4812 4.51884C15.9734 5.01113 16.25 5.67881 16.25 6.375V8.25C16.25 8.66421 15.9142 9 15.5 9C15.0858 9 14.75 8.66421 14.75 8.25V6.375C14.75 6.07663 14.6315 5.79048 14.4205 5.5795C14.2095 5.36853 13.9234 5.25 13.625 5.25H4.625C4.32663 5.25 4.04048 5.36853 3.8295 5.5795C3.61853 5.79048 3.5 6.07663 3.5 6.375V17.625C3.5 17.9234 3.61853 18.2095 3.8295 18.4205C4.04048 18.6315 4.32663 18.75 4.625 18.75H13.625C13.9234 18.75 14.2095 18.6315 14.4205 18.4205C14.6315 18.2095 14.75 17.9234 14.75 17.625V15.75C14.75 15.3358 15.0858 15 15.5 15C15.9142 15 16.25 15.3358 16.25 15.75V17.625C16.25 18.3212 15.9734 18.9889 15.4812 19.4812C14.9889 19.9734 14.3212 20.25 13.625 20.25H4.625C3.92881 20.25 3.26113 19.9734 2.76884 19.4812C2.27656 18.9889 2 18.3212 2 17.625V6.375C2 5.67881 2.27656 5.01113 2.76884 4.51884ZM17.9697 7.71967C18.2626 7.42678 18.7374 7.42678 19.0303 7.71967L22.7803 11.4697C23.0732 11.7626 23.0732 12.2374 22.7803 12.5303L19.0303 16.2803C18.7374 16.5732 18.2626 16.5732 17.9697 16.2803C17.6768 15.9874 17.6768 15.5126 17.9697 15.2197L20.4393 12.75H9.45312C9.03891 12.75 8.70312 12.4142 8.70312 12C8.70312 11.5858 9.03891 11.25 9.45312 11.25H20.4393L17.9697 8.78033C17.6768 8.48744 17.6768 8.01256 17.9697 7.71967Z"
        fill={color}
      />
    </svg>
  )
);
