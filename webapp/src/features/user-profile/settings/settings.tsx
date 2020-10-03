import React, { useContext, useState } from 'react';
import { ProfileContext } from 'contexts/profile/profile.context';
import {
  SettingsForm,
  SettingsFormContent,
  HeadingSection,
  Title,
  Row,
  Col,
} from './settings.style';
import { Button } from 'components/button/button';
import { Input } from 'components/forms/input';
import { FormattedMessage } from 'react-intl';
import { Label } from 'components/forms/label';
import Address from 'features/address/address';
import firebase from 'firebase';
import Uploader from 'components/upload/upload';
import Image from 'components/image/image';
import BankAccount from 'features/bank-account/bank-account';

type SettingsContentProps = {
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
};

const SettingsContent: React.FC<SettingsContentProps> = ({ deviceType }) => {
  const storageRef = firebase.storage().ref();
  const { state, dispatch } = useContext(ProfileContext);
  const [photoURL, setPhotoURL] = useState(state.photoURL);

  const handleChange = (e) => {
    const { value, name } = e.target;
    dispatch({
      type: 'HANDLE_ON_INPUT_CHANGE',
      payload: { value, field: name },
    });
  };

  const handleSave = async () => {
    const { displayName, email } = state;
    firebase.auth().currentUser.updateProfile({
      displayName,
      photoURL,
    });
  };

  const handleUploader = async (files) => {
    const imageRef = storageRef.child(`users/${files[0].name}`);

    await imageRef.put(files[0]);
    const imageUrl = await imageRef.getDownloadURL();
    setPhotoURL(imageUrl);
  };

  const handleResetPassword = () => {
    const { email } = state;
    firebase.auth().sendPasswordResetEmail(email);
    alert(`Reset Password Email Sent to ${email}`);
  };

  return (
    <SettingsForm>
      <SettingsFormContent>
        <HeadingSection>
          <Title>
            <FormattedMessage
              id="profilePageTitle"
              defaultMessage="Your Profile"
            />
          </Title>
        </HeadingSection>
        <Row style={{ marginBottom: '50px' }}>
          <Col xs={12} sm={3} md={3} lg={3}>
            <Label>Current Profile Image</Label>
            <Image url={state.photoURL} />
            <Label>Change Profile Image</Label>
            <Uploader onChange={handleUploader} />
          </Col>
          <Col xs={12} sm={5} md={5} lg={5}>
            <Row>
              <Label>
                <FormattedMessage
                  id="profileNameField"
                  defaultMessage="Your Name"
                />
              </Label>
              <Input
                type="text"
                label="Name"
                name="displayName"
                value={state.displayName}
                onChange={handleChange}
                backgroundColor="#F7F7F7"
                height="48px"
              />
            </Row>
            <Row>
              <Label>
                <FormattedMessage
                  id="profileEmailField"
                  defaultMessage="Your Email"
                />
              </Label>
              <Input
                type="email"
                name="email"
                label="Email Address"
                value={state.email}
                backgroundColor="#F7F7F7"
                disabled
              />
            </Row>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12} style={{ position: 'relative' }}>
            <SettingsFormContent>
              <Address onSelectAddress={() => {}} />
            </SettingsFormContent>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12} style={{ position: 'relative' }}>
            <SettingsFormContent>
              <BankAccount onSelectBankAccount={() => {}} />
            </SettingsFormContent>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={4} md={4} lg={2}>
            <Button size="big" style={{ width: '100%' }} onClick={handleSave}>
              <FormattedMessage id="profileSaveBtn" defaultMessage="Save" />
            </Button>
          </Col>
          <Col xs={12} sm={4} md={4} lg={2}>
            <Button
              size="big"
              style={{ width: '100%', backgroundColor: 'red' }}
              onClick={handleResetPassword}
            >
              Reset Password
            </Button>
          </Col>
        </Row>
      </SettingsFormContent>
    </SettingsForm>
  );
};

export default SettingsContent;
