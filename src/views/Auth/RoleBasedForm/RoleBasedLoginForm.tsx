import React, { useState } from 'react';
import classes from './FormStyle.module.css';
import { useForm } from 'react-hook-form';
import CustomButton from '../../../components/Shared/CustomButton/CsutomButton';
import { useAppDispatch } from '../../../app/hooks';
import { loginUser } from '../../../features/auth/authSlice';
import ElementWrapper from '../../../components/Shared/ElementWrapper/ElementWrapper';
import { getUserProfile } from '../../../features/user/userSlice';

// Define TypeScript type for form values
interface LoginFormValues {
  identifier: string;
  password: string;
}

const RoleBasedLoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
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
              {...register('identifier', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Invalid email address',
                },
              })}
              placeholder='Enter Email'
              className={errors.identifier ? classes.error : ''}
            />
          </div>

          <div className={classes['form-input']}>
            <div className={classes.passwordContainer}>
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
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
