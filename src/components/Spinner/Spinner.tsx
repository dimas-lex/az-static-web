import * as React from "react";
import {  Spinner as BSpinner, Intent } from "@blueprintjs/core";

export const Spinner = ({isVisible, size = 25}: {isVisible?: boolean; size?: number}) => {

  return (
    isVisible ?
      (
        <BSpinner intent={Intent.PRIMARY} size={size} />
      )
      : null
  );
}

