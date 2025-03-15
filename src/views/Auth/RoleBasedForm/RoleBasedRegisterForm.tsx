import React, { useState } from 'react';
import classes from './FormStyle.module.css';
import { useForm } from 'react-hook-form';
import CustomButton from '../../../components/Shared/CustomButton/CsutomButton';
import { registerUser } from '../../../features/auth/authSlice';
import { useAppDispatch } from '../../../app/hooks';
import ElementWrapper from '../../../components/Shared/ElementWrapper/ElementWrapper';

// Define TypeScript type for form values
interface RegisterFormValues {
  displayName: string;
  email: string;
  password: string;
}

interface RoleBasedRegisterFormProps {
  role: string;
}

const RoleBasedRegisterForm: React.FC<RoleBasedRegisterFormProps> = ({
  role,
}) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // Kept for form reset on success
  } = useForm<RegisterFormValues>({
    defaultValues: {
      displayName: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    const payload = { ...data, role };
    setLoading(true);
    setSubmitError(null);
    try {
      const res = await dispatch(registerUser(payload));
      if (res.meta.requestStatus === 'fulfilled') {
        console.log('Registration successful:', res.payload);
        reset(); // Optional: Reset form on success
      } else {
        setSubmitError('Registration failed. Please try again.');
        console.log('Registration failed:', res.payload);
      }
    } catch (error) {
      setSubmitError('An error occurred. Please try again.');
      console.log('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <ElementWrapper height={450} title='REGISTER'>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        {/* Optional role display */}
        {/* <h1><span>{role}</span> Registration Form</h1> */}

        <div className={classes['form-input']}>
          <input
            type='text'
            {...register('displayName', {
              required: 'Name is required',
              minLength: {
                value: 3,
                message: 'Name must be at least 3 characters',
              },
            })}
            placeholder='Enter Your Name'
            className={errors.displayName ? classes.error : ''}
          />
        </div>

        <div className={classes['form-input']}>
          <input
            type='email'
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Invalid email address',
              },
            })}
            placeholder='Enter Email'
            className={errors.email ? classes.error : ''}
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
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>

        <div className={classes['form-button']}>
          <CustomButton type='submit' disabled={loading}>
            {loading ? 'LOADING...' : 'SUBMIT'}
          </CustomButton>
        </div>
      </form>

      {/* Error messages */}
      {errors.displayName && (
        <p className={classes.errorMsg}>- {errors.displayName.message}</p>
      )}
      {errors.email && (
        <p className={classes.errorMsg}>- {errors.email.message}</p>
      )}
      {errors.password && (
        <p className={classes.errorMsg}>- {errors.password.message}</p>
      )}
      {submitError && <p className={classes.errorMsg}>{submitError}</p>}
    </ElementWrapper>
  );
};

export default RoleBasedRegisterForm;
