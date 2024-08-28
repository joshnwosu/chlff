import React, { useState } from 'react';
import classes from './FormStyle.module.css';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomButton from '../../../components/Shared/CustomButton/CsutomButton';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../../features/auth/authSlice';
import { useAppDispatch } from '../../../app/hooks';

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
  const navigate = useNavigate();
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
        <h1>
          <span>{role}</span> registration form.
        </h1>
        <div className={classes['form-input']}>
          <input
            type='text'
            {...register('displayName')}
            placeholder='Enter Your Name'
          />
          {errors.displayName && <p>{errors.displayName.message}</p>}
        </div>

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
          <CustomButton type='submit' disabled={loading}>
            {loading ? 'LAODING...' : 'SUBMIT'}
          </CustomButton>
        </div>
      </form>
    </div>
  );
  // if (role && !validRoles.includes(role)) {
  //   return <NotFound />;
  // }

  // switch (role) {
  //   case 'learner':
  //     return (
  //       <div>
  //         <p>Welcome, Learner! Please fill out the form below.</p>
  //         {/* Learner registration form */}
  //       </div>
  //     );
  //   case 'parent':
  //     return (
  //       <div>
  //         <p>Welcome, Parent! Please fill out the form below.</p>
  //         {/* Parent registration form */}
  //       </div>
  //     );
  //   case 'tutor':
  //     return (
  //       <div>
  //         <p>Welcome, Tutor! Please fill out the form below.</p>
  //         {/* Tutor registration form */}
  //       </div>
  //     );
  //   case 'school':
  //     return (
  //       <div>
  //         <p>Welcome, School! Please fill out the form below.</p>
  //         {/* School registration form */}
  //       </div>
  //     );
  //   default:
  //     return null;
  // }
};

export default RoleBasedRegisterForm;
