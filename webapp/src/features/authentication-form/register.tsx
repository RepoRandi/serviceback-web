import React, { useContext } from 'react';
import Link from 'next/link';
import { Input } from 'components/forms/input';
import {
  Button,
  IconWrapper,
  Wrapper,
  Container,
  Heading,
  SubHeading,
  HelperText,
  Offer,
  Divider,
  LinkButton,
} from './authentication-form.style';
// import { Facebook } from 'assets/icons/Facebook';
import { Google } from 'assets/icons/Google';
import { AuthContext } from 'contexts/auth/auth.context';
import { FormattedMessage, useIntl } from 'react-intl';
import { closeModal } from '@redq/reuse-modal';

export default function SignOutModal() {
  const intl = useIntl();
  const { authDispatch, authenticateWithGoogle, signup } = useContext<any>(
    AuthContext,
  );
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const toggleSignInForm = () => {
    authDispatch({
      type: 'SIGNIN',
    });
  };

  const signupCallback = (e) => {
    e.preventDefault();
    signup({ email, password }, () => {
      if (typeof window !== 'undefined') {
        authDispatch({ type: 'SIGNIN_SUCCESS' });
        closeModal();
      }
    });
  };

  const signupWithGoogle = (e) => {
    e.preventDefault();
    authenticateWithGoogle(() => {
      if (typeof window !== 'undefined') {
        authDispatch({ type: 'SIGNIN_SUCCESS' });
        closeModal();
      }
    });
  };

  return (
    <Wrapper>
      <Container>
        <Heading>
          <FormattedMessage id="signUpBtnText" defaultMessage="Sign Up" />
        </Heading>
        <SubHeading>Sign up for a ServiceBack Account</SubHeading>
        <form onSubmit={signupCallback}>
          <Input
            type="email"
            placeholder="Ex: John.Doe@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            height="48px"
            backgroundColor="#F7F7F7"
            mb="10px"
          />
          <Input
            type="password"
            placeholder="Password (min 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            height="48px"
            backgroundColor="#F7F7F7"
            mb="10px"
          />
          <HelperText style={{ padding: '20px 0 30px' }}>
            By signing up, you agree to ServiceBack's &nbsp;
            <Link href="/">
              <a>
                <FormattedMessage
                  id="termsConditionText"
                  defaultMessage="Terms &amp; Condition"
                />
              </a>
            </Link>
          </HelperText>
          <Button variant="primary" size="big" width="100%" type="submit">
            <FormattedMessage id="continueBtn" defaultMessage="Continue" />
          </Button>
        </form>
        <Divider>
          <span>
            <FormattedMessage id="orText" defaultMessage="or" />
          </span>
        </Divider>
        {/* <Button
          variant="primary"
          size="big"
          style={{
            width: '100%',
            backgroundColor: '#4267b2',
            marginBottom: 10,
          }}
        >
          <IconWrapper>
            <Facebook />
          </IconWrapper>
          <FormattedMessage
            id="continueFacebookBtn"
            defaultMessage="Continue with Facebook"
          />
        </Button> */}
        <Button
          variant="primary"
          size="big"
          style={{ width: '100%', backgroundColor: '#4285f4' }}
          onClick={signupWithGoogle}
        >
          <IconWrapper>
            <Google />
          </IconWrapper>
          <FormattedMessage
            id="continueGoogleBtn"
            defaultMessage="Continue with Google"
          />
        </Button>
        <Offer style={{ padding: '20px 0' }}>
          <FormattedMessage
            id="alreadyHaveAccount"
            defaultMessage="Already have an account?"
          />{' '}
          <LinkButton onClick={toggleSignInForm}>
            <FormattedMessage id="loginBtnText" defaultMessage="Login" />
          </LinkButton>
        </Offer>
      </Container>
    </Wrapper>
  );
}
