
import styles from './Rates.module.css';
import React, { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectStatus, selectRates, selectQuantity, updateQuantity } from './ratesSlice';
import { Rate } from './Rate';

export const Rates = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectStatus);
  const rates = useAppSelector(selectRates);
  const quantity = useAppSelector(selectQuantity);

  const onChangeQuantity = (e: ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10)
    dispatch(updateQuantity(val));
  };

  return (
    <div className={styles.rates}>
      <div className={styles.title}>
        Rates Info for
        <input className={styles.input} type="number" name="quantity" value={quantity} onChange={onChangeQuantity} />
      </div>
      <div className={styles.status}>
        {
          status === 'loading' && ('loading')
        }
        {
          status === 'failed' && ('Request failed')
        }
      </div>

      <div className={styles.info}>
        {
          rates && (

            <table className={styles.table}>
              <tbody>
                <tr>
                  <th className={styles.header} >id</th>
                  <th className={styles.header}>betaId</th>
                  <th className={styles.header}>name</th>
                  <th className={styles.header}>value</th>
                  <th className={styles.header}>currency</th>
                  <th className={styles.header}>timestamp</th>
                </tr>
                {
                  rates?.map(rate => {
                    return (
                      <Rate key={rate.id} rate={rate} />
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