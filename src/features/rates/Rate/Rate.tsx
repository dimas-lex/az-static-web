
import styles from './Rate.module.css';
import React from 'react';
import { TRate } from '../ratesSlice';

export const Rate = ({ rate }: { rate: TRate }) => {
  return (
    <tr className={styles.rate} >
      <td className={styles.cell}>{rate.id}</td>
      <td className={styles.cell}>{rate.betaId}</td>
      <td className={styles.cell}>{rate.name}</td>
      <td className={styles.cell}>{rate.value}</td>
      <td className={styles.cell}>{rate.currency}</td>
      <td className={styles.cell}>{rate.timestamp}</td>
    </tr>
  );
}