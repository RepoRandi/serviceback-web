import React, { useState } from 'react';
import {
  Button,
  Wrapper,
  Container,
  Heading,
  SubHeading,
} from './edit-modal.style';
import { Input } from 'components/forms/input';
import TextField from 'components/forms/text-field';

type OrderReviewProps = {
  order: any;
  onSave: (newOrder: any) => void;
};

const OrderReview: React.FC<OrderReviewProps> = ({ order, onSave }) => {
  const [content, setContent] = useState('');

  const handleSave = (e) => {
    e.preventDefault();

    onSave({
      order,
      content,
    });
  };

  return (
    <Wrapper>
      <Container>
        <Heading>Submit Review</Heading>

        <SubHeading>How did we do?</SubHeading>
        <form onSubmit={handleSave}>
          <TextField
            id="info"
            as="textarea"
            placeholder="Enter Review"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ marginBottom: '20px' }}
          />
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

export default OrderReview;
