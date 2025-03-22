import axios from 'axios';
import { toast } from 'react-toastify';
import { create } from 'zustand';

export const useProductStore = create((set) => ({
  products: [], // ✅ Ensures products is never undefined
  success: null, // ✅ Track success state

  setProducts: (products) => set({ products }),

  createProduct: async (newProduct) => {
    // ✅ Validate Fields Before Sending Request
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: 'Please fill in all the fields' };
    }

    try {
      // ✅ Send POST Request
      const res = await axios.post(
        'http://localhost:5000/api/product',
        newProduct
      );
      // alert
      toast.success(`🎉${res.data.message}!`, {
        position: 'top-right',
        autoClose: 3000,
      });

      const ProductDetails = res.data.product;
      const status = res.data.success;

      // ✅ Update Zustand Store
      set((state) => ({
        products: [...state.products, ProductDetails],
        success: status,
      }));

      return { success: true, message: 'Product created successfully' };
    } catch (error) {
      console.error('Error creating product:', error);
      return {
        success: false,
        message: 'Failed to create product. Please try again.',
      };
    }
  },

  fetchProducts: async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/product');

      const fetchedProducts = res.data.products;

      const status = res.data.success;

      set({ products: fetchedProducts || [], success: status }); // ✅ Ensure products is always an array

      return status;
    } catch (error) {
      console.error('Error fetching products:', error);

      set({ products: [], success: false }); // ✅ Handle API failure
      return false;
    }
  },

  deleteProduct: async (id) => {
    try {
      // ✅ Send POST Request
      const res = await axios.delete(`http://localhost:5000/api/product/${id}`);

      toast.success(`🎉${res.data.message}!`, {
        position: 'top-right',
        autoClose: 3000,
      });
      // ✅ Update Zustand Store
      set((state) => ({
        products: state.products.filter((product) => product._id !== id),
      }));

      return { success: true, message: 'Product deleted successfully' };
    } catch (error) {
      console.error('Error creating product:', error);
      return {
        success: false,
        message: 'Failed to create product. Please try again.',
      };
    }
  },

  updateProduct: async (updatedProduct) => {
    try {
      // ✅ Send POST Request
      await axios.patch(
        `http://localhost:5000/api/product/${updatedProduct._id}`,
        updatedProduct
      );

      toast.success('🎉 Product updated successfully!', {
        position: 'top-right',
        autoClose: 3000,
      });
      // ✅ Update Zustand Store
      set((state) => ({
        products: state.products.filter(
          (product) => product._id !== updatedProduct._id
        ),
      }));

      return { success: true, message: 'Product updated successfully' };
    } catch (error) {
      console.error('Error updating product:', error);
      return {
        success: false,
        message: 'Failed to update product. Please try again.',
      };
    }
  },
}));

export const useUserStore = create((set) => ({
  users: [], // ✅ Ensures users is never undefined
  success: null, // ✅ Track success state
  isAuthenticated: false,

  setUsers: (users) => set({ users }),

  createUser: async (newUser) => {
    // ✅ Validate Fields Before Sending Request
    if (
      !newUser.username ||
      !newUser.email ||
      !newUser.password ||
      !newUser.confirmPassword
    ) {
      return { success: false, message: 'Please fill in all the fields' };
    }

    try {
      // ✅ Send POST Request
      const res = await axios.post(
        'http://localhost:5000/api/user/sign-up',
        newUser
      );
      console.log(res);

      // alert
      toast.success(`🎉${res.data.message}!`, {
        position: 'top-right',
        autoClose: 3000,
      });

      const userData = res.data.user;
      const status = res.data.success;

      // ✅ Update Zustand Store
      set((state) => ({
        users: [...state.users, userData],
        success: status,
      }));

      return { success: true, message: 'sign up successfully' };
    } catch (error) {
      console.error('Error signing up:', error);
      // alert
      toast.error(`🎉${error.message}!`, {
        position: 'top-right',
        autoClose: 3000,
      });
      return {
        success: false,
        message: 'Failed to sign-up. Please try again.',
      };
    }
  },

  login: async (loginDetails) => {
    console.log(loginDetails);

    try {
      const res = await axios.post(
        'http://localhost:5000/api/user/sign-in',
        loginDetails
      );

      toast.success(`✅ ${res.data.message}! Redirecting...`, {
        position: 'top-right',
        autoClose: 2000,
      });

      const userInfo = res.data.user;
      const status = res.data.success;

      localStorage.setItem('token', res.data.token);

      set({ users: userInfo || [], success: status, isAuthenticated: true }); // ✅ Ensure users is always an array

      return status;
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error(`❌ ${error.response.data.message}`, {
        position: 'top-right',
        autoClose: 3000,
      });

      set({ users: [], success: false }); // ✅ Handle API failure
      return false;
    }
  },

  signOut: () => {
    setTimeout(() => {
      localStorage.removeItem('token');
      set({ users: [], success: false, isAuthenticated: false });
    }, 2000);
  },

  deleteUser: async (id) => {
    try {
      // ✅ Send POST Request
      const res = await axios.delete(`http://localhost:5000/api/user/${id}`);

      toast.success(`🎉${res.data.message}!`, {
        position: 'top-right',
        autoClose: 3000,
      });
      // ✅ Update Zustand Store
      set((state) => ({
        users: state.users.filter((user) => user._id !== id),
      }));

      return { success: true, message: 'Account deleted successfully' };
    } catch (error) {
      console.error('Error deleting account:', error);
      return {
        success: false,
        message: 'Failed to delete account. Please try again.',
      };
    }
  },

  updateUser: async (updatedUser) => {
    try {
      // ✅ Send POST Request
      await axios.patch(
        `http://localhost:5000/api/user/${updatedUser._id}`,
        updatedUser
      );

      toast.success('🎉 user details updated successfully!', {
        position: 'top-right',
        autoClose: 3000,
      });
      // ✅ Update Zustand Store
      set((state) => ({
        users: state.users.filter((user) => user._id !== updatedUser._id),
      }));

      return { success: true, message: 'user details updated successfully' };
    } catch (error) {
      console.error('Error updating user details:', error);
      return {
        success: false,
        message: 'Failed to update user details. Please try again.',
      };
    }
  },
}));

export const themeChanger = create((set) => ({
  dark: false,

  setTheme: (dark) => set({ dark }),

  themeToggle: (mode) => {
    set((state) => ({ dark: mode === 'dark' ? false : true }));
  },
}));
