import React, { useState } from 'react';
import classes from './FormStyle.module.css';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomButton from '../../../components/Shared/CustomButton/CsutomButton';
import { registerUser } from '../../../features/auth/authSlice';
import { useAppDispatch } from '../../../app/hooks';
import ElementWrapper from '../../../components/Shared/ElementWrapper/ElementWrapper';

const registerSchema = z.object({
  displayName: z.string().min(3, 'Name must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

// Define the TypeScript type based on the schema
type RegisterFormValues = z.infer<typeof registerSchema>;

interface RoleBasedRegisterFormProps {
  role: string;
}

const RoleBasedRegisterForm: React.FC<RoleBasedRegisterFormProps> = ({
  role,
}) => {
  const dispatch = useAppDispatch();

  // Initialize form using react-hook-form with zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      displayName: '',
      email: '',
      password: '',
    },
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: RegisterFormValues) => {
    const payload = {
      ...data,
      role,
    };
    // console.log(payload);
    setLoading(true);

    try {
      const res = await dispatch(registerUser(payload));
      setLoading(false);
      console.log('Res: ', res);
    } catch (error) {
      setLoading(false);
      console.log('Error: ', error);
    }

    setLoading(false);
  };

  return (
    <ElementWrapper height={450} title='REGISTER'>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        {false && (
          <h1>
            <span>{role}</span> registration form.
          </h1>
        )}

        <div className={classes['form-input']}>
          <input
            type='text'
            {...register('displayName')}
            placeholder='Enter Your Name'
            className={errors.displayName ? classes.error : ''}
          />
          {/* {errors.displayName && <p>{errors.displayName.message}</p>} */}
        </div>

        <div className={classes['form-input']}>
          <input
            type='email'
            {...register('email')}
            placeholder='Enter Email'
            className={errors.email ? classes.error : ''}
          />
          {/* {errors.email && <p>{errors.email.message}</p>} */}
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
            {loading ? 'LOADING...' : 'SUBMIT'}
          </CustomButton>
        </div>
      </form>
    </ElementWrapper>
  );
};

export default RoleBasedRegisterForm;
