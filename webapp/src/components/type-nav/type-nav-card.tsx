import React from 'react';
import styled from 'styled-components';
import css from '@styled-system/css';
import { FormattedMessage } from 'react-intl';

export const Icon = styled.span(
  css({
    display: 'flex',
    marginBottom: '10px',

    svg: {
      width: 21,
    },
  })
);

export const Text = styled.span(
  css({
    fontSize: 'sm',
    fontWeight: 'medium',
    textAlign: 'center',
    textTransform: 'capitalize',
  })
);

export const IconWrapper = styled.button<any>((props) =>
  css({
    width: '100%',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: props.active === true ? 'primary.regular' : 'gray.100',
    borderRadius: 'base',
    border: 0,
    outline: 'none',
    boxShadow: 'none',
    cursor: 'pointer',

    ':focus': {
      border: 0,
      outline: 'none',
      boxShadow: 'none',
    },

    span: {
      color: props.active === true ? 'white' : 'text.bold',
    },
  })
);

type IconNavCardProps = {
  icon?: any;
  intlId?: string;
  defaultMessage?: string;
  active?: boolean;
  onClick?: (e: any) => void;
};

const IconNavCard: React.FC<IconNavCardProps> = ({
  icon,
  intlId,
  defaultMessage,
  active,
  onClick,
  ...props
}) => {
  return (
    <IconWrapper active={active} {...props} onClick={onClick}>
      <Icon>{icon}</Icon>
      <Text>
        <FormattedMessage id={intlId} defaultMessage={defaultMessage} />
      </Text>
    </IconWrapper>
  );
};

export default IconNavCard;
