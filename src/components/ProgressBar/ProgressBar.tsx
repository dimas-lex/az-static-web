import styles from './ProgressBar.module.css';
import * as React from "react";
import { Intent, ProgressBar as Progress } from "@blueprintjs/core";


export const ProgressBar = ({ isVisible }: { isVisible?: boolean }) => {

  return (
    isVisible ?
      (
        <div className={styles.progressBar}>
          <Progress intent={Intent.PRIMARY} />
        </div>
      )
      : null
  );
}