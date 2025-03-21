import { Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import FormInput from '../../component/formInput';
import { Link, useNavigate } from 'react-router-dom';
import { useUserStore } from '../../component/product';
import { toast, ToastContainer } from 'react-toastify';

const Signup = () => {
  const navigate = useNavigate(); // ✅ Initialize navigate
  const initialValue = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const { createUser, users } = useUserStore();

  const validateSchema = Yup.object().shape({
    username: Yup.string().required().min(6),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required').min(8),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref('password'), null],
      "password doesn't match"
    ),
  });

  const submitHandler = async (values, { resetForm, setSubmitting }) => {
    try {
      await createUser(values); // ✅ Call Zustand function

      resetForm({
        values: { username: '', email: '', password: '', confirmPassword: '' },
      }); // ✅ Clears form after success
      setTimeout(() => {
        navigate('/auth/login'); // ✅ Redirect after success
      }, 2000);
    } catch (error) {
      console.error('Error signing up:', error);
      if (error.name === 'AxiosError') {
        toast.error(`❌${error.message}. Please try again.`, {
          position: 'top-right',
          autoClose: 3000,
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValue}
      validationSchema={validateSchema}
      onSubmit={submitHandler}
    >
      {({
        values,
        errors,
        handleChange,
        handleBlur,
        touched,
        handleSubmit,
        isSubmitting,
      }) => {
        const { email, password, username, confirmPassword } = values;

        return (
          <div className="pageHeadingStyle">
            <ToastContainer />
            <div className="fixed inset-0 z-0 bg-black/30 flex justify-center items-center">
              <form
                onSubmit={handleSubmit} // ✅ Ensure Formik handles form submission
                className="px-4 py-4 flex flex-col gap-2 rounded-md mx-auto  bg-[var(--bgForm)]  h-fit text-white/80 mt-12 w-4/5 sm:w-[600px] relative"
              >
                <h2 className="text-xl lg:text-2xl text-white/80 font-bold pb-2 lg:pb-4">
                  Sign Up
                </h2>
                <section className="flex flex-col gap-2">
                  <FormInput
                    value={username}
                    error={touched.username && errors.username}
                    onBlur={handleBlur('username')}
                    onChange={handleChange('username')}
                    label="Username"
                    placeholder="Jackkie"
                  />
                  <FormInput
                    value={email}
                    error={touched.email && errors.email}
                    onBlur={handleBlur('email')}
                    onChange={handleChange('email')}
                    label="Email"
                    placeholder="example@gmail.com"
                  />

                  <FormInput
                    value={password}
                    error={touched.password && errors.password}
                    onBlur={handleBlur('password')}
                    onChange={handleChange('password')}
                    label="password"
                    placeholder="*****"
                  />
                  <FormInput
                    name={'confirm-password'}
                    value={confirmPassword}
                    error={touched.confirmPassword && errors.confirmPassword}
                    onBlur={handleBlur('confirmPassword')}
                    onChange={handleChange('confirmPassword')}
                    label="password"
                    placeholder="*****"
                  />

                  <button
                    type="submit"
                    className={`${
                      isSubmitting
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-[var(--secondary)] text-[var(--bg)] font-bold text-base'
                    } text-center px-8 md:py-2 py-1 mt-4 rounded-md`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="spinner"></span>
                    ) : (
                      <span>Create Account</span>
                    )}
                  </button>
                </section>
                <section className="flex text-base lg:tex-lg pt-4 gap-2 flex-row items-center justify-center">
                  <span>Already have an acount? </span>
                  <Link className="hover:underline pb-1" to={'/auth/login'}>
                    Login
                  </Link>
                </section>
              </form>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

export default Signup;
