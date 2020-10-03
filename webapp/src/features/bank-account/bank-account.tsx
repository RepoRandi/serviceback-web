import React, { useContext } from 'react';
import RadioGroup from 'components/radio-group/radio-group';
import RadioCard from 'components/radio-card/radio-card';
import { Button } from 'components/button/button';
import UpdateBankAccount from 'components/bank-account-card/bank-account-card';
import { handleModal } from 'features/checkouts/checkout-modal';
import { ProfileContext } from 'contexts/profile/profile.context';
import { CardHeader } from 'components/card-header/card-header';
import { ButtonGroup } from 'components/button-group/button-group';
import { Box } from 'components/box';
import { Plus } from 'assets/icons/PlusMinus';
import { deleteUserBankAccount } from 'services/user-bank-account';
interface Props {
  increment?: boolean;
  icon?: boolean;
  buttonProps?: any;
  flexStart?: boolean;
  onSelectBankAccount?: (bankAccount: any) => void;
}

const BankAccount = ({
  increment = false,
  flexStart = false,
  icon = false,
  buttonProps = {
    size: 'big',
    variant: 'outlined',
    type: 'button',
    className: 'add-button',
  },
  onSelectBankAccount,
}: Props) => {
  const {
    state: { bankAccount },
    dispatch,
  } = useContext(ProfileContext);

  const handleOnDelete = async (item) => {
    dispatch({ type: 'DELETE_BANK_ACCOUNT', payload: item.id });
    await deleteUserBankAccount(item);
  };

  const handleSelectBankAccount = (bankAccount) => {
    dispatch({
      type: 'SET_PRIMARY_BANK_ACCOUNT',
      payload: bankAccount.id.toString(),
    });
    onSelectBankAccount(bankAccount);
  };

  return (
    <>
      <CardHeader increment={increment}>Bank Accounts</CardHeader>
      <ButtonGroup flexStart={flexStart}>
        <RadioGroup
          items={bankAccount}
          component={(item: any) => (
            <RadioCard
              style={{ textAlign: 'left' }}
              id={item.id}
              key={item.id}
              title={''}
              content={`${item.name}\n${item.accountNumber}\n${item.bank.name}`}
              name="address"
              checked={item.type === 'primary'}
              onChange={() => handleSelectBankAccount(item)}
              onEdit={() => handleModal(UpdateBankAccount, item)}
              onDelete={() => handleOnDelete(item)}
            />
          )}
          secondaryComponent={
            <Button
              {...buttonProps}
              onClick={() =>
                handleModal(UpdateBankAccount, 'add-address-modal')
              }
              style={{ borderStyle: 'dashed' }}
            >
              {icon && (
                <Box mr={2}>
                  <Plus width="10px" />
                </Box>
              )}
              Add Bank Account
            </Button>
          }
        />
      </ButtonGroup>
    </>
  );
};

export default BankAccount;
