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
        <input className={styles.input} placeholder="First name" {...register("firstName", { required: true, maxLength: 20 })} />
        <input className={styles.input} placeholder="Last  name"  {...register("lastName", { pattern: /^[A-Za-z]+$/i })} />
        <input className={styles.input} placeholder="Your value"  type="number" {...register("value", { min: 1, max: 9999 })} />
        <input className={styles.input} placeholder="Age"  type="number" {...register("age", { min: 1, max: 99 })} />
        <input className={styles.input} placeholder="Phone"  type="string" {...register("phone", { required: true, maxLength: 20 })} />
        <input className={styles.input} placeholder="Email"  type="string" {...register("email", { pattern: emailPattern })} />
        <input className={styles.input} type="submit" />
      </form>
    </Dialog>
  );
}
