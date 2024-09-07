import React, { useState } from 'react';
import classes from './FormStyle.module.css';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomButton from '../../../components/Shared/CustomButton/CsutomButton';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../app/hooks';
import { loginUser } from '../../../features/auth/authSlice';

const loginSchema = z.object({
  // identifier: z
  //   .string()
  //   .refine(
  //     (value) => value.includes('@') || value.trim().length > 0,
  //     'Enter a valid email or display name'
  //   ),
  identifier: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

// Define the TypeScript type based on the schema
type LoginFormValues = z.infer<typeof loginSchema>;

const RoleBasedLoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // Initialize form using react-hook-form with zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: LoginFormValues) => {
    // console.log(payload);
    setLoading(true);

    try {
      const res = await dispatch(loginUser(data));
      setLoading(false);
      console.log('Res: ', res);
    } catch (error) {
      setLoading(false);
      console.log('Error: ', error);
    }

    setLoading(false);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className={classes['form-wrapper']}>
      <div className={classes['form-header']}>
        <span onClick={handleGoBack} className={classes['form-goback']}>
          {'< Back'}
        </span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Welcome, Please log in below.</h1>
        <div className={classes['form-input']}>
          <input
            type='email'
            {...register('identifier')}
            placeholder='Enter Email'
          />
          {errors.identifier && <p>{errors.identifier.message}</p>}
        </div>

        <div className={classes['form-input']}>
          <input
            type='password'
            {...register('password')}
            placeholder='Enter Password'
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <div className={classes['form-button']}>
          <CustomButton type='submit' disabled={loading}>
            {loading ? 'LOADING...' : 'LOG IN'}
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default RoleBasedLoginForm;
