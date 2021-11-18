
import styles from './RateDetail.module.css';
import React from 'react';

import { Button } from "@blueprintjs/core";
import { useAppDispatch } from '../../../app/hooks';
import { rateDetailClosed, toggleAddRateVisibility, IRate } from '../../../features/rates/ratesSlice';

export const RateDetail = ({ rate }: { rate: IRate }) => {
  const dispatch = useAppDispatch();
  const onCloseRate = () => dispatch(rateDetailClosed());
  const  date = new Date(rate.timestamp);

  const onClick= () => {
    dispatch(toggleAddRateVisibility());
  };

  return (
    <div className={`${styles.rateDetailBox} cy-rateDetail-box`}>
      <div className={styles.line}>
        <div className={styles.details}>
          <div className={`${styles.close} cy-close`} onClick={onCloseRate}>x</div>

          <div className={`${styles.rateItem} cy-rateItem`}>
            <span className={`${styles.rateLabel} cy-rateLabel`}>id</span>
            <span className={`${styles.rateValue} cy-rateValue`}>{rate.id}</span>
          </div>
          <div className={`${styles.rateItem} cy-rateItem`}>
            <span className={`${styles.rateLabel} cy-rateLabel`}>betaId</span>
            <span className={`${styles.rateValue} cy-rateValue`}>{rate.betaId}</span>
          </div>
          <div className={`${styles.rateItem} cy-rateItem`}>
            <span className={`${styles.rateLabel} cy-rateLabel`}>name</span>
            <span className={`${styles.rateValue} cy-rateValue`}>{rate.name}</span>
          </div>
          <div className={`${styles.rateItem} cy-rateItem`}>
            <span className={`${styles.rateLabel} cy-rateLabel`}>value</span>
            <span className={`${styles.rateValue} cy-rateValue`}>{rate.value} {rate.currency}</span>
          </div>
          <div className={`${styles.rateItem} cy-rateItem`}>
            <span className={`${styles.rateLabel} cy-rateLabel`}>subValue</span>
            <span className={`${styles.rateValue} cy-rateValue`}>{rate.subValue} {rate.currency}</span>
          </div>
          <div className={`${styles.rateItem} cy-rateItem`}>
            <span className={`${styles.rateLabel} cy-rateLabel`}>timestamp</span>
            <span className={`${styles.rateValue} cy-rateValue`}>{date.toLocaleDateString()}</span>
          </div>
          <div className={`${styles.rateItem} cy-rateItem`}>
            <span className={`${styles.rateLabel} cy-rateLabel`}>description</span>
            <span className={`${styles.rateValue} cy-rateValue`}>{rate.description}</span>
          </div>
        </div>
        <Button className={`${styles.edit} edit`} icon="edit" text="Edit" onClick={onClick} />
      </div>
    </div>
  )
}