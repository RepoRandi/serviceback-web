import React, { useContext } from 'react';
import { FormattedMessage } from 'react-intl';
import RadioGroup from 'components/radio-group/radio-group';
import RadioCard from 'components/radio-card/radio-card';
import { Button } from 'components/button/button';
import { handleModal } from 'features/checkouts/checkout-modal';
import { ProfileContext } from 'contexts/profile/profile.context';
import useUser from 'data/use-user';
import CreateOrUpdateContact from 'components/contact-card/contact-card';
import { CardHeader } from 'components/card-header/card-header';
import { ButtonGroup } from 'components/button-group/button-group';
import { Box } from 'components/box';
import { Plus } from 'assets/icons/PlusMinus';
interface Props {
  increment?: boolean;
  flexStart?: boolean;
  icon?: boolean;
  buttonProps?: any;
}

const Contact = ({
  increment = false,
  flexStart = false,
  icon = false,
  buttonProps = {
    size: 'big',
    variant: 'outlined',
    type: 'button',
    className: 'add-button',
  },
}: Props) => {
  const { deleteContactNumber } = useUser();

  const {
    state: { contact },
    dispatch,
  } = useContext(ProfileContext);

  const handleOnDelete = async (item) => {
    dispatch({ type: 'DELETE_CONTACT', payload: item.id });
    await deleteContactNumber(item.id);
  };
  return (
    <>
      <CardHeader increment={increment}>
        <FormattedMessage
          id='contactNumberText'
          defaultMessage='Select Your Contact Number'
        />
      </CardHeader>
      <ButtonGroup flexStart={flexStart}>
        <RadioGroup
          items={contact}
          component={(item: any) => (
            <RadioCard
              id={item.id}
              key={item.id}
              title={item.type}
              content={item.number}
              checked={item.type === 'primary'}
              onChange={() =>
                dispatch({
                  type: 'SET_PRIMARY_CONTACT',
                  payload: item.id.toString(),
                })
              }
              name='contact'
              onEdit={() => handleModal(CreateOrUpdateContact, item)}
              onDelete={() => handleOnDelete(item)}
            />
          )}
          secondaryComponent={
            <Button
              {...buttonProps}
              onClick={() =>
                handleModal(CreateOrUpdateContact, 'add-contact-modal')
              }
            >
              {icon && (
                <Box mr={2}>
                  <Plus width='10px' />
                </Box>
              )}
              <FormattedMessage
                id='addContactBtn'
                defaultMessage='Add Contact'
              />
            </Button>
          }
        />
      </ButtonGroup>
    </>
  );
};

export default Contact;
