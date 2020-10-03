import React, { useContext, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { withFormik, FormikProps, Form } from 'formik';
import { closeModal } from '@redq/reuse-modal';
import TextField from 'components/forms/text-field';
import { Button } from 'components/button/button';
import { FieldWrapper, Heading } from './bank-account-card.style';
import { FormattedMessage } from 'react-intl';
import {
  createUserBankAccount,
  updateUserBankAccount,
} from 'services/user-bank-account';
import { ProfileContext } from 'contexts/profile/profile.context';
import Select from 'components/select/select';
import { useBankList } from 'services/bank';
// Shape of form values
interface FormValues {
  id?: number | null;
  name?: string;
  accountNumber?: string;
  bank?: any;
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
      name: props.item.name || '',
      accountNumber: props.item.accountNumber || '',
      bank: props.item.bank || {},
    };
  },
  validationSchema: Yup.object().shape({
    name: Yup.string().required('Name is required!'),
    accountNumber: Yup.string().required('Account Number is required'),
  }),
  handleSubmit: (values) => {
    // do submitting things
  },
});

const UpdateBankAccount = (props: FormikProps<FormValues> & MyFormProps) => {
  const [bankOptions, setBankOptions] = useState([]);
  const [selectedBank, setSelectedBank] = useState({});
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

  const bankAccountValue = {
    id: values.id,
    name: values.name,
    accountNumber: values.accountNumber,
    bank: values.bank,
  };

  const { data } = useBankList();

  useEffect(() => {
    if (((data || {}).data || []).length > 0) {
      const banks = data.data.map((bank) => ({
        value: bank,
        label: bank.name,
      }));

      const selected = banks.filter((b) => {
        return b.value.id === values.bank.id;
      })[0];

      setBankOptions(banks);
      setSelectedBank(selected);
    }
  }, [data]);

  const handleBankSelected = (option) => {
    setSelectedBank(option);
    values.bank = option.value;
  };

  const handleSubmit = async () => {
    console.log({ bankAccountValue });
    if (isValid) {
      if (bankAccountValue.id) {
        const bankAccountData = await updateUserBankAccount(bankAccountValue);
        dispatch({ type: 'UPDATE_BANK_ACCOUNT', payload: bankAccountData });
      } else {
        const bankAccountData = await createUserBankAccount(bankAccountValue);
        dispatch({ type: 'ADD_BANK_ACCOUNT', payload: bankAccountData });
      }

      closeModal();
    }
  };

  return (
    <Form>
      <Heading>
        {item && item.id ? 'Edit Bank Account' : 'Add Bank Account'}
      </Heading>
      <FieldWrapper>
        <TextField
          id="name"
          type="text"
          placeholder="Full Name"
          error={touched.name && errors.name}
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </FieldWrapper>

      <FieldWrapper>
        <TextField
          id="accountNumber"
          type="text"
          placeholder="Account Number"
          error={touched.accountNumber && errors.accountNumber}
          value={values.accountNumber}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </FieldWrapper>

      <FieldWrapper>
        <Select
          id="bank"
          options={bankOptions}
          value={selectedBank}
          onChange={handleBankSelected}
        />
      </FieldWrapper>

      <Button
        onClick={handleSubmit}
        type="submit"
        style={{ width: '100%', height: '44px' }}
      >
        <FormattedMessage
          id="savedAddressId"
          defaultMessage="Save Bank Account"
        />
      </Button>
    </Form>
  );
};

export default FormEnhancer(UpdateBankAccount);
