import { NextPage } from 'next';
import { Modal } from '@redq/reuse-modal';
import { ProfileProvider } from 'contexts/profile/profile.provider';
import SettingsContent from 'features/user-profile/settings/settings';
import {
  PageWrapper,
  SidebarSection,
  ContentBox,
} from 'features/user-profile/user-profile.style';
import Sidebar from 'features/user-profile/sidebar/sidebar';
import { SEO } from 'components/seo';
import Footer from 'layouts/footer';
import Firebase from 'utils/firebase';
import { useEffect, useState } from 'react';
import { getUserAddressList } from 'services/user-address';
import { getUserBankAccountList } from 'services/user-bank-account';

const firebase = new Firebase();

type Props = {
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
};
const ProfilePage: NextPage<Props> = ({ deviceType }) => {
  const [user, setUser] = useState(undefined);
  useEffect(() => {
    async function getProfileInfo() {
      try {
        const addressData = await getUserAddressList();
        const address = addressData.data.map((a, idx) => {
          return {
            ...a,
            type: idx === 0 ? 'primary' : 'seconday',
          };
        });
        const bankAccountData = await getUserBankAccountList();
        const bankAccount = bankAccountData.data.map((a, idx) => {
          return {
            ...a,
            type: idx === 0 ? 'primary' : 'seconday',
          };
        });
        const userData = await firebase.getCurrentUser();
        if (userData) {
          setUser({
            ...userData,
            address,
            bankAccount,
          });
        }
      } catch (error) {}
    }
    getProfileInfo();
  }, []);

  if (!user) return <div>loading...</div>;

  return (
    <>
      <SEO title="Profile - ServiceBack" description="Profile Details" />
      <ProfileProvider initData={user}>
        <Modal>
          <PageWrapper>
            <SidebarSection>
              <Sidebar />
            </SidebarSection>
            <ContentBox>
              <SettingsContent deviceType={deviceType} />
            </ContentBox>

            <Footer />
          </PageWrapper>
        </Modal>
      </ProfileProvider>
    </>
  );
};

export default ProfilePage;
