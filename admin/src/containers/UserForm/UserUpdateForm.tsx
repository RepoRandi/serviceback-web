import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDrawerDispatch, useDrawerState } from 'context/DrawerContext';
import { Scrollbars } from 'react-custom-scrollbars';
import Uploader from 'components/Uploader/Uploader';
import Input from 'components/Input/Input';
import Button, { KIND } from 'components/Button/Button';
import DrawerBox from 'components/DrawerBox/DrawerBox';
import { Row, Col } from 'components/FlexBox/FlexBox';
import {
  Form,
  DrawerTitleWrapper,
  DrawerTitle,
  FieldDetails,
  ButtonGroup,
} from '../DrawerItems/DrawerItems.style';
import { FormFields, FormLabel } from 'components/FormFields/FormFields';
import { useUserUpdate } from 'services/user';
import Select from 'components/Select/FormSelect';
import { USER_ROLE_OPTIONS } from 'config/constants';

const BooleanOptions = [
  {
    label: 'FALSE',
    value: false,
  },
  {
    label: 'TRUE',
    value: true,
  },
];

type Props = any;

const UserUpdateForm: React.FC<Props> = props => {
  const dispatch = useDrawerDispatch();
  const data = useDrawerState('data');
  const closeDrawer = useCallback(() => dispatch({ type: 'CLOSE_DRAWER' }), [
    dispatch,
  ]);
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: data,
  });
  const currentRole = USER_ROLE_OPTIONS.filter(role => {
    return role.value === data.role;
  });
  const [role, setRole] = useState(currentRole);
  const [disabled, setDisabled] = useState([BooleanOptions[0]]);
  const [emailVerified, setEmailVerified] = useState([BooleanOptions[0]]);

  const [mutate] = useUserUpdate();

  const onSubmit = async ({ name, email }) => {
    const newUser = {
      id: data.id,
      name,
      email,
      imageUrl: '',
      role: role[0].value,
      disabled: disabled[0].value,
      emailVerified: emailVerified[0].value,
    };
    try {
      await mutate(newUser);
    } catch (error) {
      console.error('err', error);
    }
    closeDrawer();
  };

  const handleUploader = files => {
    setValue('image', files[0].path);
  };

  const handleRoleChange = ({ value }) => {
    setValue('role', value[0].value);
    setRole(value);
  };
  const handleDisabledChange = ({ value }) => {
    setValue('disabled', value[0].value);
    setDisabled(value);
  };
  const handleEmailVerifiedChange = ({ value }) => {
    setValue('emailVerified', value[0].value);
    setEmailVerified(value);
  };

  return (
    <>
      <DrawerTitleWrapper>
        <DrawerTitle>Update User</DrawerTitle>
      </DrawerTitleWrapper>

      <Form onSubmit={handleSubmit(onSubmit)} style={{ height: '100%' }}>
        <Scrollbars
          autoHide
          renderView={props => (
            <div {...props} style={{ ...props.style, overflowX: 'hidden' }} />
          )}
          renderTrackHorizontal={props => (
            <div
              {...props}
              style={{ display: 'none' }}
              className="track-horizontal"
            />
          )}
        >
          <Row>
            <Col lg={4}>
              <FieldDetails>Upload your User image here</FieldDetails>
            </Col>
            <Col lg={8}>
              <DrawerBox
                overrides={{
                  Block: {
                    style: {
                      width: '100%',
                      height: 'auto',
                      padding: '30px',
                      borderRadius: '3px',
                      backgroundColor: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    },
                  },
                }}
              >
                <Uploader onChange={handleUploader} />
              </DrawerBox>
            </Col>
          </Row>

          <Row>
            <Col lg={4}>
              <FieldDetails>User Details</FieldDetails>
            </Col>

            <Col lg={8}>
              <DrawerBox>
                <FormFields>
                  <FormLabel>Name</FormLabel>
                  <Input inputRef={register({ required: true })} name="name" />
                </FormFields>
                <FormFields>
                  <FormLabel>Email</FormLabel>
                  <Input inputRef={register({ required: true })} name="email" />
                </FormFields>
                <FormFields>
                  <FormLabel>Role</FormLabel>
                  <Select
                    options={USER_ROLE_OPTIONS}
                    onChange={handleRoleChange}
                    value={role}
                  />
                </FormFields>
                <FormFields>
                  <FormLabel>Disabled</FormLabel>
                  <Select
                    options={BooleanOptions}
                    onChange={handleDisabledChange}
                    value={disabled}
                  />
                </FormFields>
                <FormFields>
                  <FormLabel>Verified</FormLabel>
                  <Select
                    options={BooleanOptions}
                    onChange={handleEmailVerifiedChange}
                    value={emailVerified}
                  />
                </FormFields>
              </DrawerBox>
            </Col>
          </Row>
        </Scrollbars>

        <ButtonGroup>
          <Button
            kind={KIND.minimal}
            onClick={closeDrawer}
            overrides={{
              BaseButton: {
                style: ({ $theme }) => ({
                  width: '50%',
                  borderTopLeftRadius: '3px',
                  borderTopRightRadius: '3px',
                  borderBottomRightRadius: '3px',
                  borderBottomLeftRadius: '3px',
                  marginRight: '15px',
                  color: $theme.colors.red400,
                }),
              },
            }}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            overrides={{
              BaseButton: {
                style: ({ $theme }) => ({
                  width: '50%',
                  borderTopLeftRadius: '3px',
                  borderTopRightRadius: '3px',
                  borderBottomRightRadius: '3px',
                  borderBottomLeftRadius: '3px',
                }),
              },
            }}
          >
            Update User
          </Button>
        </ButtonGroup>
      </Form>
    </>
  );
};

export default UserUpdateForm;
