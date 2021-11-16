
import styles from './Rate.module.css';
import React from 'react';
import { rateSelected, TRate } from '../ratesSlice';
import { useAppDispatch } from '../../../app/hooks';

export const Rate = ({ rate }: { rate: TRate }) => {
  const dispatch = useAppDispatch();
  const onRateSelected = (rate: TRate) => dispatch(rateSelected(rate.id));

  return (
    <tr className={`${styles.rate} rate-row`} onClick={() => onRateSelected(rate)}>
      <td className={`${styles.cell} rate-cell`}>{rate.id}</td>
      <td className={`${styles.cell} rate-cell`}>{rate.betaId}</td>
      <td className={`${styles.cell} rate-cell`}>{rate.name}</td>
      <td className={`${styles.cell} rate-cell`}>{rate.value}</td>
      <td className={`${styles.cell} rate-cell`}>{rate.currency}</td>
      <td className={`${styles.cell} rate-cell`}>{rate.timestamp}</td>
    </tr>
  );
}