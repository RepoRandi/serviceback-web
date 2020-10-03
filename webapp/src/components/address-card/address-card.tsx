import React, { useContext } from 'react';
import * as Yup from 'yup';
import { withFormik, FormikProps, Form } from 'formik';
import { closeModal } from '@redq/reuse-modal';
import TextField from 'components/forms/text-field';
import { Button } from 'components/button/button';
import { FieldWrapper, Heading } from './address-card.style';
import { FormattedMessage } from 'react-intl';
import { createUserAddress, updateUserAddress } from 'services/user-address';
import { ProfileContext } from 'contexts/profile/profile.context';

// Shape of form values
interface FormValues {
  id?: number | null;
  address1?: string;
  address2?: string;
  postalCode?: number;
}

// The type of props MyForm receives
interface MyFormProps {
  item?: any | null;
}

// Wrap our form with the using withFormik HoC
const FormEnhancer = withFormik<MyFormProps, FormValues>({
  // Transform outer props into form values
  mapPropsToValues: (props) => {
    return {
      id: props.item.id || null,
      address1: props.item.address1 || '',
      address2: props.item.address2 || '',
      postalCode: props.item.postalCode || 0,
    };
  },
  validationSchema: Yup.object().shape({
    address1: Yup.string().required('Address is required!'),
    address2: Yup.string().required('Address is required'),
    postalCode: Yup.string().required('Postal Code is required'),
  }),
  handleSubmit: (values) => {
    // do submitting things
  },
});

const UpdateAddress = (props: FormikProps<FormValues> & MyFormProps) => {
  const { dispatch } = useContext(ProfileContext);
  const {
    isValid,
    item,
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
  } = props;

  const addressValue = {
    id: values.id,
    address1: values.address1,
    address2: values.address2,
    postalCode: values.postalCode,
  };

  const handleSubmit = async () => {
    if (isValid) {
      if (addressValue.id) {
        const addressData = await updateUserAddress(addressValue);
        dispatch({ type: 'UPDATE_ADDRESS', payload: addressData });
      } else {
        const addressData = await createUserAddress(addressValue);
        dispatch({ type: 'ADD_ADDRESS', payload: addressData });
      }

      closeModal();
    }
  };

  return (
    <Form>
      <Heading>{item && item.id ? 'Edit Address' : 'Add New Address'}</Heading>
      <FieldWrapper>
        <TextField
          id="address1"
          type="text"
          placeholder="Block, Street"
          error={touched.address1 && errors.address1}
          value={values.address1}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </FieldWrapper>

      <FieldWrapper>
        <TextField
          id="address2"
          type="text"
          placeholder="Unit, Building"
          error={touched.address2 && errors.address2}
          value={values.address2}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </FieldWrapper>

      <FieldWrapper>
        <TextField
          id="postalCode"
          type="text"
          placeholder="888888"
          error={touched.postalCode && errors.postalCode}
          value={values.postalCode.toString()}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </FieldWrapper>

      <Button
        onClick={handleSubmit}
        type="submit"
        style={{ width: '100%', height: '44px' }}
      >
        <FormattedMessage id="savedAddressId" defaultMessage="Save Address" />
      </Button>
    </Form>
  );
};

export default FormEnhancer(UpdateAddress);
