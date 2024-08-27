import React from 'react';
import classes from './FormStyle.module.css';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomButton from '../../../components/Shared/CustomButton/CsutomButton';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

// Define the TypeScript type based on the schema
type LoginFormValues = z.infer<typeof loginSchema>;

interface RoleBasedLoginFormProps {
  role: string | undefined;
}

const RoleBasedLoginForm: React.FC<RoleBasedLoginFormProps> = ({ role }) => {
  // Initialize form using react-hook-form with zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log(`${role} login data:`, data);
  };

  return (
    <div className={classes['form-wrapper']}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>
          Welcome, <span>{role}</span>! Please log in below.
        </h1>
        <div className={classes['form-input']}>
          <input
            type='email'
            {...register('email')}
            placeholder='Enter Email'
          />
          {errors.email && <p>{errors.email.message}</p>}
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
          <CustomButton type='submit'>LOG IN</CustomButton>
        </div>
      </form>
    </div>
  );
};

export default RoleBasedLoginForm;
