import React, { useState } from 'react';
import Router from 'next/router';
import { Button } from 'components/button/button';
import { Input } from 'components/forms/input';
import { Label } from 'components/forms/label';
import Uploader from 'components/upload/upload';

import FormWrapper, {
  Row,
  Col,
  Container,
  FormTitleWrapper,
  FormTitle,
  NoteText,
  Heading,
  DeliveryAddress,
  // ButtonGroup,
  StyledContact,
  SubmitBtnWrapper,
} from './request-product.style';
import { FormattedMessage } from 'react-intl';
import Address from 'features/address/address';
import Contact from 'features/contact/contact';

const Checkout: React.FC<any> = () => {
  const [loading, setLoading] = useState(false);

  const [medicineNameOne, setMedicineNameOne] = useState('');
  const [quantityOne, setQuantityOne] = useState('');
  const [medicineNameTwo, setMedicineNameTwo] = useState('');
  const [quantityTwo, setQuantityTwo] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    Router.push('/medicine');
    setLoading(false);
  };

  return (
    <form>
      <FormWrapper>
        <Container>
          <FormTitleWrapper>
            <FormTitle>
              <FormattedMessage
                id="reqMedicine"
                defaultMessage="Request Medicine"
              />
            </FormTitle>
          </FormTitleWrapper>

          <Heading>
            <FormattedMessage id="noteHead" defaultMessage="Note" />
          </Heading>

          <NoteText>
            <FormattedMessage
              id="noteDescription"
              defaultMessage="Product availability &amp; price will confirm over phone. Delivery Charge inside the city ${inside} &amp; outside the city ${outside}."
              values={{ inside: 5, outside: 10 }}
            />
          </NoteText>

          <Row>
            <Col xs={12} sm={6} md={6} lg={6}>
              <Label>
                <FormattedMessage id="rmMedicineName" />
              </Label>

              <Input
                type="text"
                label="Medicine Name"
                name="medicine-Name"
                placeholder="Enter medicine name"
                value={medicineNameOne}
                onChange={(e) => setMedicineNameOne(e.target.value)}
                backgroundColor="#F7F7F7"
                height="48px"
              />
            </Col>

            <Col xs={12} sm={6} md={6} lg={6}>
              <Label>
                <FormattedMessage id="rmMedicineQuantity" />
              </Label>

              <Input
                type="text"
                label="Quantity"
                name="quantity"
                placeholder="Enter quantity"
                value={quantityOne}
                onChange={(e) => setQuantityOne(e.target.value)}
                backgroundColor="#F7F7F7"
                height="48px"
              />
            </Col>
          </Row>

          <Row>
            <Col xs={12} sm={6} md={6} lg={6}>
              <Label>
                <FormattedMessage id="rmMedicineName" />
              </Label>

              <Input
                type="text"
                label="Medicine Name"
                name="medicine-Name"
                placeholder="Enter medicine name"
                value={medicineNameTwo}
                onChange={(e) => setMedicineNameTwo(e.target.value)}
                backgroundColor="#F7F7F7"
                height="48px"
              />
            </Col>

            <Col xs={12} sm={6} md={6} lg={6}>
              <Label>
                <FormattedMessage id="rmMedicineQuantity" />
              </Label>

              <Input
                type="text"
                label="Quantity"
                name="quantity"
                placeholder="Enter quantity"
                value={quantityTwo}
                onChange={(e) => setQuantityTwo(e.target.value)}
                backgroundColor="#F7F7F7"
                height="48px"
              />
            </Col>
          </Row>

          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              <Heading>
                <FormattedMessage
                  id="rmPrescripttionUpload"
                  defaultMessage="Upload your prescription"
                />
              </Heading>
            </Col>
            <Col xs={12} sm={12} md={12} lg={12}>
              <Uploader onChange="" intlUploadText="rmUploadText" />
            </Col>
          </Row>

          {/* DeliveryAddress */}
          <DeliveryAddress>
            <Address />
          </DeliveryAddress>
          {/* Contact number */}
          <StyledContact>
            <Contact />
          </StyledContact>

          <SubmitBtnWrapper>
            <Button
              type="button"
              onClick={handleSubmit}
              size="big"
              loading={loading}
              style={{ width: '100%' }}
            >
              <FormattedMessage
                id="submitRequest"
                defaultMessage="Submit Request"
              />
            </Button>
          </SubmitBtnWrapper>
        </Container>
      </FormWrapper>
    </form>
  );
};

export default Checkout;
