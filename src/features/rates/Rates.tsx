
import styles from './Rates.module.css';
import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectStatus, selectRates } from './ratesSlice';

export const Rates = () => {
  const status = useAppSelector(selectStatus);
  const rates = useAppSelector(selectRates);

  return (
    <div className={styles.rates}>
      <div className={styles.title}>Rates Info</div>
      <div className={styles.status}>

      {
          status === 'loading' && (
            'loading'
          )
        }  {
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
                      <tr key={rate.id}>
                        <td className={styles.cell}>{rate.id}</td>
                        <td className={styles.cell}>{rate.betaId}</td>
                        <td className={styles.cell}>{rate.name}</td>
                        <td className={styles.cell}>{rate.value}</td>
                        <td className={styles.cell}>{rate.currency}</td>
                        <td className={styles.cell}>{rate.timestamp}</td>
                      </tr>
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