
import styles from './RateRow.module.css';
import React from 'react';
import { rateSelected, IRate } from '../../../features/rates/ratesSlice';
import { useAppDispatch } from '../../../app/hooks';

export const RateRow = ({ rate }: { rate: IRate }) => {
  const dispatch = useAppDispatch();
  const onRateSelected = (rate: IRate) => dispatch(rateSelected(rate.id));

  return (
    <tr className={`${styles.rate} cy-rate-row`} onClick={() => onRateSelected(rate)}>
      <td className={`${styles.cell} rate-cell`}>{rate.id}</td>
      <td className={`${styles.cell} rate-cell`}>{rate.betaId}</td>
      <td className={`${styles.cell} rate-cell`}>{rate.name}</td>
      <td className={`${styles.cell} rate-cell`}>{rate.value}</td>
      <td className={`${styles.cell} rate-cell`}>{rate.currency}</td>
      <td className={`${styles.cell} rate-cell`}>{rate.timestamp}</td>
    </tr>
  );
}