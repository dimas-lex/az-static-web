
import styles from './Rates.module.css';
import React, { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectStatus, selectRates, selectQuantity, updateQuantity } from '../../../features/rates/ratesSlice';
import { RateRow } from '../RateRow';
import { ProgressBar } from '../../ProgressBar/ProgressBar';

export const Rates = ({className}: {className?: string}) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectStatus);
  const rates = useAppSelector(selectRates);
  const quantity = useAppSelector(selectQuantity);

  const onChangeQuantity = (e: ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    dispatch(updateQuantity(val));
  };

  return (
    <div className={`${styles.rates} ${className || ''} cy-rates`}>
      <div className={styles.title}>
        Rates Info for
        <input className={`${styles.input} cy-rate-quantity`} type="number" name="quantity" value={quantity} onChange={onChangeQuantity} />
      </div>
      <div className={styles.status}>
        {
          status === 'loading' && <ProgressBar />
        }
        {
          status === 'failed' && ('Request failed')
        }
      </div>

      <div className={styles.info}>
        {
          rates && (

            <table className={`${styles.table} cy-rates-table`}>
              <tbody>
                <tr>
                  <th className={`${styles.header} cy-rates-header`}>id</th>
                  <th className={`${styles.header} cy-rates-header`}>betaId</th>
                  <th className={`${styles.header} cy-rates-header`}>name</th>
                  <th className={`${styles.header} cy-rates-header`}>value</th>
                  <th className={`${styles.header} cy-rates-header`}>currency</th>
                  <th className={`${styles.header} cy-rates-header`}>timestamp</th>
                </tr>
                {
                  rates?.map(rate => {
                    return (
                      <RateRow key={rate.id} rate={rate} />
                    )
                  })
                }
              </tbody>
            </table>
          )
        }
      </div>
      <div className={styles.line}></div>
    </div>
  );
}