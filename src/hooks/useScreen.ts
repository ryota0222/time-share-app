import { useMediaQuery } from "@mantine/hooks";

const BREAKPOINT_MAP = {
  xs: "576px",
  sm: "768px",
  md: "992px",
  lg: "1200px",
  xl: "1400px",
} as const;

type UseScreen = () => {
  isMinimumScreen: boolean;
  isSmartPhoneScreen: boolean;
  isTabletScreen: boolean;
};

export const useScreen: UseScreen = () => {
  const isMinimumScreen = useMediaQuery(`(max-width: ${BREAKPOINT_MAP.xs})`);
  const isSmartPhoneScreen = useMediaQuery(`(max-width: ${BREAKPOINT_MAP.sm})`);
  const isTabletScreen = useMediaQuery(`(max-width: ${BREAKPOINT_MAP.md})`);
  return {
    isSmartPhoneScreen: Boolean(isSmartPhoneScreen),
    isTabletScreen: Boolean(isTabletScreen),
    isMinimumScreen: Boolean(isMinimumScreen),
  };
};
