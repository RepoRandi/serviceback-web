import { Routes } from 'nest-router';
import { UserModule } from './api/admin/user/user.module';
import { ServiceCategoryModule } from './api/admin/service-category/service-category.module';
import { ServiceModule } from './api/admin/service/service.module';
import { AdminModule } from './api/admin/admin.module';
import { ServiceCategoryModule as AppServiceCategoryModule } from './api/app/service-category/service-category.module';
import { AppServiceModule } from './api/app/service/service.module';
import { AppUserAddressModule } from './api/app/user-address/user-address.module';
import { AdminUserAddressModule } from './api/admin/user-address/user-address.module';
import { AdminOrderModule } from './api/admin/order/order.module';
import { AppOrderModule } from './api/app/order/order.module';
import { AppOrderItemModule } from './api/app/order/order-item/order-item.module';
import { AppReviewModule } from './api/app/review/review.module'
import { AdminReviewModule } from './api/admin/review/review.module'
import { AdminBankModule } from './api/admin/bank/bank.module'
import { AppUserBankAccountModule } from './api/app/user-bank-account/user-bank-account.module'
import { AppBankModule } from './api/app/bank/bank.module'
// HYGEN-IMPORT

export const routes: Routes = [
  {
    path: '/api/v1',
    module: AdminModule,
    children: [
      {
        path: 'service-category',
        module: AppServiceCategoryModule,
      },
      {
        path: 'service',
        module: AppServiceModule,
      },
      {
        path: 'user-address',
        module: AppUserAddressModule,
      },
      {
        path: 'order',
        module: AppOrderModule,
      },
      {
        path: 'order/:orderId/order-item',
        module: AppOrderItemModule,
      },
      {
        path: 'review',
        module: AppReviewModule,
      },
      {
        path: 'user-bank-account',
        module: AppUserBankAccountModule,
      },
      {
        path: 'bank',
        module: AppBankModule,
      },
    ], // HYGEN-CHILDREN-APP
  },
  {
    path: '/api/v1/admin',
    module: AdminModule,
    children: [
      {
        path: 'user',
        module: UserModule,
      },
      {
        path: 'service-category',
        module: ServiceCategoryModule,
      },
      {
        path: 'service',
        module: ServiceModule,
      },
      {
        path: 'user-address',
        module: AdminUserAddressModule,
      },
      {
        path: 'order',
        module: AdminOrderModule,
      },
      {
        path: 'review',
        module: AdminReviewModule,
      },
      {
        path: 'bank',
        module: AdminBankModule,
      },
    ], // HYGEN-CHILDREN-ADMIN
  },
];

// prettier-ignore
export const modules = [
  UserModule,
  ServiceCategoryModule,
  ServiceModule,
  AppServiceCategoryModule,
  AppServiceModule,
  AppUserAddressModule,
  AdminUserAddressModule,
  AdminOrderModule,
  AppOrderModule,
  AppOrderItemModule,
  AppReviewModule,
  AdminReviewModule,
  AdminBankModule,
  AppUserBankAccountModule,
  AppBankModule,
] // HYGEN-MODULES
