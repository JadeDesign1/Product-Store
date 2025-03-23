export default {
  server: {
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
};
