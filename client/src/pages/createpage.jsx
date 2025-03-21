import React from 'react';
import * as yup from 'yup';
import { Formik } from 'formik';
import FormInput from '../component/formInput';
import { toast, ToastContainer } from 'react-toastify';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { IoCloseSharp } from 'react-icons/io5';
import { useProductStore } from '../component/product';

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  price: yup
    .number()
    .typeError('Price must be a valid number') // Custom error for invalid type
    .positive('Price must be greater than zero') // Custom error for negative values
    .required('Price is required'), // Custom error for empty field
  image: yup.string().required('Image is required'),
});
const Createpage = () => {
  const { createProduct } = useProductStore();
  const navigate = useNavigate();
  const initialValues = {
    name: '',
    price: '',
    image: '',
  };

  const submitHandler = async (values, { resetForm, setSubmitting }) => {
    try {
      const res = await createProduct(values); // ✅ Call Zustand function

      if (res.success === true) {
        toast.success(`🎉 ${res.success}`, {
          position: 'top-right',
          autoClose: 3000,
        });
        setTimeout(() => {
          navigate('/home');
        }, 2000);
      }

      resetForm({
        values: { name: '', price: '', image: '' },
      }); // ✅ Clears form after success
    } catch (error) {
      console.error('Error adding product:', error);
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
    <main>
      <ToastContainer />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
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
          const { name, price, image } = values;
          return (
            <div className=" pt-[10px]">
              <div className="text-[var(--text2)] tracking-wider">
                <h1 className="lg:text-2xl font-bold sm:text-xl text-lg text-center capitalize">
                  create new product
                </h1>
                <form
                  onClick={isSubmitting ? null : handleSubmit}
                  className="px-4 py-5 flex flex-col gap-2 rounded-md mx-auto bg-[var(--bgForm)] mt-4 max-w-2xl relative"
                >
                  <Link
                    to={'/'}
                    className="absolute right-4 top-2 text-[var(--secondary)] text-2xl"
                  >
                    <IoCloseSharp />
                  </Link>
                  <FormInput
                    value={name}
                    error={touched.name && errors.name}
                    onBlur={handleBlur('name')}
                    onChange={handleChange('name')}
                    label="product name"
                    placeholder="lenovo x20"
                  />
                  <FormInput
                    value={price}
                    error={touched.price && errors.price}
                    onBlur={handleBlur('price')}
                    onChange={handleChange('price')}
                    label="price"
                    placeholder="50.30"
                  />
                  <FormInput
                    value={image}
                    error={touched.image && errors.image}
                    onBlur={handleBlur('image')}
                    onChange={handleChange('image')}
                    label="image"
                    placeholder="example/jpg"
                  />
                  <button
                    type="submit"
                    className={`${
                      isSubmitting
                        ? 'cursor-not-allowed'
                        : 'text-[var(--bg)] font-semibold text-base'
                    } text-center bg-gradient-to-b from-yellow-300 via-yellow-500 to-yellow-800 transition-all duration-300 hover:text-white/80 px-8 md:py-2 py-1 mt-4 rounded-md`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Add Product'}
                  </button>
                </form>
              </div>
            </div>
          );
        }}
      </Formik>
    </main>
  );
};

export default Createpage;
