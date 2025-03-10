import React from 'react';
import * as yup from 'yup';
import { Formik } from 'formik';
import FormInput from '../component/formInput';
import { toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
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
            <>
              <div className="text-[var(--primary)] tracking-wider pt-[96px] md:pt-[105px]">
                <h1 className="lg:text-6xl font-bold sm:text-4xl text-xl text-center capitalize">
                  create new product
                </h1>
                <form
                  onClick={isSubmitting ? null : handleSubmit}
                  className="px-4 py-5 flex flex-col gap-2 rounded-md mx-auto bg-[var(--bgForm)] mt-12 max-w-3xl relative"
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
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-[var(--secondary)] text-[var(--bg)] font-bold text-lg'
                    } text-center px-8 md:py-2 mt-4 rounded-md`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Add Product'}
                  </button>
                </form>
              </div>
            </>
          );
        }}
      </Formik>
    </main>
  );
};

export default Createpage;
