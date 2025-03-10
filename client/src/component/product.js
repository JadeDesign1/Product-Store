import axios from 'axios';
import { toast } from 'react-toastify';
import { create } from 'zustand';

export const useProductStore = create((set) => ({
  products: [],

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

      const data = res.data;

      // ✅ Update Zustand Store
      set((state) => ({ products: [...state.products, data] }));

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
    const res = await axios.get('http://localhost:5000/api/product');
    const data = res.data.products;
    set({ products: data });
  },

  deleteProduct: async (id) => {
    try {
      // ✅ Send POST Request
      const res = await axios.delete(`http://localhost:5000/api/product/${id}`);

      toast.success(`🎉${res.message}!`, {
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

export const themeChanger = create((set) => ({
  dark: false,

  setTheme: (dark) => set({ dark }),

  themeToggle: (mode) => {
    set((state) => ({ dark: mode === 'dark' ? false : true }));
  },
}));
