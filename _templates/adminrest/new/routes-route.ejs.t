---
to: admin/src/routes.tsx
inject: true
skip_if: <PrivateRoute path={<%= h.changeCase.constant(name) %>}>
before: HYGEN-ROUTES_ROUTE
---
          <PrivateRoute path={<%= h.changeCase.constant(name) %>}>
            <AdminLayout>
              <Suspense fallback={<InLineLoader />}>
                <<%= h.changeCase.pascal(name) %> />
              </Suspense>
            </AdminLayout>
          </PrivateRoute>