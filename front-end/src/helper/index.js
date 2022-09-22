export const redirectUser = (role, navigate) => {
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

export const validationButton = (email, password) => {
  const emailRegex = /\S+@\S+\.\S+/;
  const minPassword = 6;
  return ((emailRegex.test(email)) && (password.length >= minPassword));
};

export const validateName = (name, email, password) => {
  const emailRegex = /\S+@\S+\.\S+/;
  const minPassword = 6;
  const MIN_LENGTH = 12;
  return (
    (emailRegex.test(email))
    && (password.length >= minPassword)
    && (name.length >= MIN_LENGTH));
};
