const redirectUser = (role, navigate) => {
  if (role === 'administrator') {
    navigate('/admin/manage');
  }
  if (role === 'seller') {
    navigate('seller/orders');
  }
  if (role === 'customer') {
    navigate('customer/products');
  }
};

export default redirectUser;
