import styles from './AddRate.module.css';
import React from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch } from '../../../app/hooks';
import { toggleAddRateVisibility, ISubmitRate, submitRate } from '../ratesSlice';
import { Dialog } from '@blueprintjs/core';




const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
export const AddRate = ({isOpen}: {isOpen: boolean}) => {

  const dispatch = useAppDispatch();
  const handleClose= () => {
    dispatch(toggleAddRateVisibility());
  };

  const { register, handleSubmit } = useForm<ISubmitRate>();
  const onSubmit: SubmitHandler<ISubmitRate> = (data: ISubmitRate) => dispatch(submitRate(data));

  return (

    <Dialog  isOpen={isOpen} onClose={handleClose}
      title={<h1>Submit Form</h1>}
    >

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <input className={`${styles.input} input-firstName`} placeholder="First name" {...register("firstName", { required: true, maxLength: 20 })} />
        <input className={`${styles.input} input-lastName`} placeholder="Last  name"  {...register("lastName", { pattern: /^[A-Za-z]+$/i })} />
        <input className={`${styles.input} input-value`} placeholder="Your value"  type="number" {...register("value", { min: 1, max: 9999 })} />
        <input className={`${styles.input} input-subValue`} placeholder="Your subValue"  type="number" {...register("subValue", { min: 1, max: 9999 })} />
        <input className={`${styles.input} input-subValue1`} placeholder="Your subValue1"  type="number" {...register("subValue1", { min: 1, max: 9999 })} />
        <input className={`${styles.input} input-subValue2`} placeholder="Your subValue2"  type="number" {...register("subValue2", { min: 1, max: 9999 })} />
        <input className={`${styles.input} input-subValue3`} placeholder="Your subValue3"  type="number" {...register("subValue3", { min: 1, max: 9999 })} />
        <input className={`${styles.input} input-subValue4`} placeholder="Your subValue4"  type="number" {...register("subValue4", { min: 1, max: 9999 })} />
        <input className={`${styles.input} input-subValue5`} placeholder="Your subValue4"  type="number" {...register("subValue5", { min: 1, max: 9999 })} />
        <input className={`${styles.input} input-subValue6`} placeholder="Your subValue4"  type="number" {...register("subValue6", { min: 1, max: 9999 })} />
        <input className={`${styles.input} input-age`} placeholder="Age"  type="number" {...register("age", { min: 1, max: 99 })} />
        <input className={`${styles.input} input-phone`} placeholder="Phone"  type="string" {...register("phone", { required: true, maxLength: 20 })} />
        <input className={`${styles.input} input-email`} placeholder="Email"  type="string" {...register("email", { pattern: emailPattern })} />
        <input className={`${styles.input} input-submit`} type="submit" />
      </form>
    </Dialog>
  );
}
