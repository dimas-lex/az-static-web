
import styles from './RateDetail.module.css';
import React from 'react';
import { useAppDispatch } from '../../../app/hooks';
import { rateDetailClosed, TRate } from '../ratesSlice';

export const RateDetail = ({ rate }: { rate: TRate }) => {
  const dispatch = useAppDispatch();
  const onCloseRate = () => dispatch(rateDetailClosed());
  var date = new Date(rate.timestamp);

  return (
    <div className={`${styles.rateDetailBox} rateDetailBox`}>
    <div className={styles.line}></div>
      <div className={`${styles.close} close`} onClick={onCloseRate}>x</div>

      <div className={`${styles.rateItem} rateItem`}>
        <span className={`${styles.rateLabel} rateLabel`}>id</span>
        <span className={`${styles.rateValue} rateValue`}>{rate.id}</span>
      </div>
      <div className={`${styles.rateItem} rateItem`}>
        <span className={`${styles.rateLabel} rateLabel`}>betaId</span>
        <span className={`${styles.rateValue} rateValue`}>{rate.betaId}</span>
      </div>
      <div className={`${styles.rateItem} rateItem`}>
        <span className={`${styles.rateLabel} rateLabel`}>name</span>
        <span className={`${styles.rateValue} rateValue`}>{rate.name}</span>
      </div>
      <div className={`${styles.rateItem} rateItem`}>
        <span className={`${styles.rateLabel} rateLabel`}>value</span>
        <span className={`${styles.rateValue} rateValue`}>{rate.value} {rate.currency}</span>
      </div>
      <div className={`${styles.rateItem} rateItem`}>
        <span className={`${styles.rateLabel} rateLabel`}>subValue</span>
        <span className={`${styles.rateValue} rateValue`}>{rate.subValue} {rate.currency}</span>
      </div>
      <div className={`${styles.rateItem} rateItem`}>
        <span className={`${styles.rateLabel} rateLabel`}>timestamp</span>
        <span className={`${styles.rateValue} rateValue`}>{ date.toLocaleDateString() }</span>
      </div>
      <div className={`${styles.rateItem} rateItem`}>
        <span className={`${styles.rateLabel} rateLabel`}>description</span>
        <span className={`${styles.rateValue} rateValue`}>{rate.description}</span>
      </div>
    </div>
  )
}