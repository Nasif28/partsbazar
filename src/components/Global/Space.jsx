import React from "react";

export function Space({
  children,
  direction = "horizontal",
  size = 2,
  className = "",
}) {
  const classes =
    direction === "horizontal"
      ? `flex items-center gap-${size} ${className}`
      : `flex flex-col gap-${size} ${className}`;
  return <div className={classes}>{children}</div>;
}
