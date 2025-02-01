import React, { useState } from 'react';
import classes from './FormStyle.module.css';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomButton from '../../../components/Shared/CustomButton/CsutomButton';
import { useAppDispatch } from '../../../app/hooks';
import { loginUser } from '../../../features/auth/authSlice';
import ElementWrapper from '../../../components/Shared/ElementWrapper/ElementWrapper';
import { getUserProfile } from '../../../features/user/userSlice';

const loginSchema = z.object({
  identifier: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

// Define the TypeScript type based on the schema
type LoginFormValues = z.infer<typeof loginSchema>;

const RoleBasedLoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
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

      // console.log('Res: ', res);

      // Call getUserProfile action after successful login
      if (res?.payload) {
        await dispatch(getUserProfile());
        console.log('User profile fetched successfully');
        // window.location.reload();
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('Error: ', error);
    }

    setLoading(false);
  };

  return (
    <ElementWrapper height={400} title='LOG IN'>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <div className={classes['form-input']}>
          <input
            type='email'
            {...register('identifier')}
            placeholder='Enter Email'
            className={errors.identifier ? classes.error : ''}
          />
          {/* {errors.identifier && <p>{errors.identifier.message}</p>} */}
        </div>

        <div className={classes['form-input']}>
          <input
            type='password'
            {...register('password')}
            placeholder='Enter Password'
            className={errors.password ? classes.error : ''}
          />
          {/* {errors.password && <p>{errors.password.message}</p>} */}
        </div>

        <div className={classes['form-button']}>
          <CustomButton type='submit' disabled={loading}>
            {loading ? 'LOADING...' : 'LOG IN'}
          </CustomButton>
        </div>
      </form>
    </ElementWrapper>
  );
};

export default RoleBasedLoginForm;
