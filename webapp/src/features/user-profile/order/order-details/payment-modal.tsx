import React, { useState } from 'react';
import {
  Button,
  Wrapper,
  Container,
  Heading,
  SubHeading,
} from './edit-modal.style';
import Uploader from 'components/upload/upload';
import firebase from 'firebase';

type PaymentModalProps = {
  order: any;
  onSave: (newOrder: any) => void;
};

const PaymentModal: React.FC<PaymentModalProps> = ({ order, onSave }) => {
  const storageRef = firebase.storage().ref();
  const [paymentProofImageUrl, setPaymentProofImageUrl] = useState('');

  const handleUploader = async (files) => {
    const imageRef = storageRef.child(`payment/${files[0].name}`);

    await imageRef.put(files[0]);
    const imageUrl = await imageRef.getDownloadURL();
    setPaymentProofImageUrl(imageUrl);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (paymentProofImageUrl !== '') {
      onSave({
        id: order.id,
        paymentProofImageUrl,
        paymentStatus: 'PROCESSING',
      });
    }
  };

  return (
    <Wrapper>
      <Container>
        <Heading>Make Payment</Heading>

        <SubHeading>Upload Proof of Payment here</SubHeading>
        <form onSubmit={handleSave}>
          {/* <Col xs={12} sm={12} md={12} lg={12}> */}
          <Uploader onChange={handleUploader} intlUploadText="rmUploadText" />
          {/* </Col> */}

          <Button
            variant="primary"
            size="big"
            style={{ width: '100%' }}
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Container>
    </Wrapper>
  );
};

export default PaymentModal;
