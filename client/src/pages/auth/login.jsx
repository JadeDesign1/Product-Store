import { Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import FormInput from '../../component/formInput';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useUserStore } from '../../component/product';

const Login = () => {
  const navigate = useNavigate(); // ✅ Initialize navigation
  const { loginUsers } = useUserStore();

  const initialValue = {
    email: '',
    password: '',
  };

  const validateSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const submitHandler = async (values, { setSubmitting, resetForm }) => {
    try {
      const res = await loginUsers(values);
      if (res === true) {
        setTimeout(() => {
          navigate('/home'); // ✅ Redirect to /home
        }, 2000);
      }
      if (res === true) {
        resetForm({
          values: { email: '', password: '' },
        }); // ✅ Clears form after success
      }
    } catch (error) {
      console.error('Login failed:', error);
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
        return (
          <div className="pageHeadingStyle">
            <ToastContainer />
            <div className="fixed inset-0 z-0 bg-black/30 flex justify-center items-center">
              <form
                onSubmit={handleSubmit}
                className="px-4 py-4 flex flex-col gap-2 rounded-md mx-auto bg-[var(--bgForm)] h-fit text-white/80 mt-12 w-4/5 sm:w-[600px] relative"
              >
                <h2 className="text-xl lg:text-2xl text-white/80 font-bold pb-2 lg:pb-4">
                  Login
                </h2>
                <section className="flex flex-col gap-2">
                  <FormInput
                    value={values.email}
                    error={touched.email && errors.email}
                    onBlur={handleBlur('email')}
                    onChange={handleChange('email')}
                    label="Email"
                    placeholder="example@gmail.com"
                  />

                  <FormInput
                    value={values.password}
                    error={touched.password && errors.password}
                    onBlur={handleBlur('password')}
                    onChange={handleChange('password')}
                    label="password"
                    placeholder="*****"
                  />

                  <button
                    type="submit"
                    className={`${
                      isSubmitting
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-[var(--secondary)] text-[var(--bg)] font-bold text-lg'
                    } text-center px-8 md:py-2 py-1 mt-4 rounded-md`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? <span className="spinner"></span> : 'Login'}
                  </button>
                </section>
                <section className="flex text-base lg:tex-lg pt-4 gap-2 flex-row items-center justify-center">
                  <span>Don't have an account?</span>
                  <Link className="hover:underline pb-1" to="/auth/signup">
                    Sign Up
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

export default Login;
