import React, { useContext, lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import {
  // HYGEN-ROUTES_CONSTANTS
  BANK,
  REVIEW,
  ORDER,
  SERVICE,
  LOGIN,
  CATEGORY,
  DASHBOARD,
  USERS,
} from 'config/constants';
import AuthProvider, { AuthContext } from 'context/auth';
import { InLineLoader } from 'components/InlineLoader/InlineLoader';
// HYGEN-ROUTE_IMPORT
const Bank = lazy(() => import('./containers/Bank/Bank'));
const Review = lazy(() => import('./containers/Review/Review'));
const Order = lazy(() => import('./containers/Order/Order'));
const Service = lazy(() => import('./containers/Service/Service'));
const AdminLayout = lazy(() => import('containers/Layout/Layout'));
const Dashboard = lazy(() => import('containers/Dashboard/Dashboard'));
const Category = lazy(() =>
  import('containers/ServiceCategory/ServiceCategory'),
);
const Users = lazy(() => import('containers/Users/User'));
const Login = lazy(() => import('containers/Login/Login'));
const NotFound = lazy(() => import('containers/NotFound/NotFound'));

/**
 *
 *  A wrapper for <Route> that redirects to the login
 * screen if you're not yet authenticated.
 *
 */

function PrivateRoute({ children, ...rest }) {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

const Routes = () => {
  return (
    <AuthProvider>
      <Suspense fallback={<InLineLoader />}>
        <Switch>
          <PrivateRoute exact={true} path={DASHBOARD}>
            <AdminLayout>
              <Suspense fallback={<InLineLoader />}>
                <Dashboard />
              </Suspense>
            </AdminLayout>
          </PrivateRoute>
          <PrivateRoute path={CATEGORY}>
            <AdminLayout>
              <Suspense fallback={<InLineLoader />}>
                <Category />
              </Suspense>
            </AdminLayout>
          </PrivateRoute>
          <PrivateRoute path={USERS}>
            <AdminLayout>
              <Suspense fallback={<InLineLoader />}>
                <Users />
              </Suspense>
            </AdminLayout>
          </PrivateRoute>
          {/* 
          <PrivateRoute path={SETTINGS}>
            <AdminLayout>
              <Suspense fallback={<InLineLoader />}>
                <Settings />
              </Suspense>
            </AdminLayout>
          </PrivateRoute>
          <PrivateRoute path={SITE_SETTINGS}>
            <AdminLayout>
              <Suspense fallback={<InLineLoader />}>
                <SiteSettingForm />
              </Suspense>
            </AdminLayout>
          </PrivateRoute> */}
          <PrivateRoute path={SERVICE}>
            <AdminLayout>
              <Suspense fallback={<InLineLoader />}>
                <Service />
              </Suspense>
            </AdminLayout>
          </PrivateRoute>
          <PrivateRoute path={ORDER}>
            <AdminLayout>
              <Suspense fallback={<InLineLoader />}>
                <Order />
              </Suspense>
            </AdminLayout>
          </PrivateRoute>
          <PrivateRoute path={REVIEW}>
            <AdminLayout>
              <Suspense fallback={<InLineLoader />}>
                <Review />
              </Suspense>
            </AdminLayout>
          </PrivateRoute>
          <PrivateRoute path={BANK}>
            <AdminLayout>
              <Suspense fallback={<InLineLoader />}>
                <Bank />
              </Suspense>
            </AdminLayout>
          </PrivateRoute>
          {/* HYGEN-ROUTES_ROUTE */}
          <Route path={LOGIN}>
            <Login />
          </Route>
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </AuthProvider>
  );
};

export default Routes;
