import { Box } from "@mantine/core";
import React, { memo } from "react";

import styles from "./style.module.css";

export const Spacer = memo(() => {
  return <Box role="presentation" className={styles.wrapper} />;
});
