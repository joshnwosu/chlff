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

type LoginFormValues = z.infer<typeof loginSchema>;

const RoleBasedLoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true);
    try {
      const res = await dispatch(loginUser(data));
      if (res.meta.requestStatus === 'fulfilled') {
        // Adjust based on your thunk
        await dispatch(getUserProfile());
        console.log('User profile fetched successfully');
      }
    } catch (error) {
      console.log('Error: ', error);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div>
      <ElementWrapper height={400} title='LOG IN'>
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
          <div className={classes['form-input']}>
            <input
              type='email'
              {...register('identifier')}
              placeholder='Enter Email'
              className={errors.identifier ? classes.error : ''}
            />
          </div>

          <div className={classes['form-input']}>
            <div className={classes.passwordContainer}>
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                placeholder='Enter Password'
                className={errors.password ? classes.error : ''}
              />
              <button
                type='button'
                onClick={togglePasswordVisibility}
                className={classes.toggleButton}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <div className={classes['form-button']}>
            <CustomButton type='submit' disabled={loading}>
              {loading ? 'LOADING...' : 'LOG IN'}
            </CustomButton>
          </div>
        </form>
        {errors.identifier && (
          <p className={classes.errorMsg}>- {errors.identifier.message}</p>
        )}
        {errors.password && (
          <p className={classes.errorMsg}>- {errors.password.message}</p>
        )}
      </ElementWrapper>
    </div>
  );
};

export default RoleBasedLoginForm;
