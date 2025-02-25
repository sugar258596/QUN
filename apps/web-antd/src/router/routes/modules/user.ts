import type { RouteRecordRaw } from 'vue-router';

import { BasicLayout } from '#/layouts';
import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    component: BasicLayout,
    meta: {
      icon: 'ic:baseline-view-in-ar',
      keepAlive: true,
      order: 1000,
      title: $t('home.title'),
    },
    name: 'Home',
    path: '/home',
    children: [
      {
        name: 'user',
        path: '/user',
        meta: {
          icon: 'tabler:users',
          title: $t('home.user.user'),
        },
        children: [
          {
            path: 'role',
            name: 'role',
            meta: {
              icon: 'carbon:user-role',
              title: $t('home.user.roleManagement'),
            },
            children: [
              {
                path: 'admin',
                name: 'adminList',
                meta: {
                  title: $t('home.user.AdministratorList'),
                },
                component: () => import('#/views/home/role/admin/index.vue'),
              },
              {
                path: 'menu',
                name: 'menuList',
                meta: {
                  title: $t('home.user.menuList'),
                },
                component: () => import('#/views/home/role/menu/index.vue'),
              },
              {
                path: 'roleList',
                name: 'roleList',
                meta: {
                  title: $t('home.user.roleList'),
                },
                component: () => import('#/views/home/role/list/index.vue'),
              },
            ],
          },
          {
            path: 'management',
            name: 'Management',
            meta: {
              icon: 'carbon:id-management',
              title: $t('home.user.userManagement'),
            },
            children: [
              {
                path: 'list',
                name: 'UserList',
                meta: {
                  title: $t('home.user.userList'),
                },
                component: () => import('#/views/home/user/list/index.vue'),
              },

              {
                path: 'wallet',
                name: 'user-wallet',
                meta: {
                  title: $t('home.user.userWallet'),
                },
                component: () => import('#/views/home/user/wallet/index.vue'),
              },
              {
                path: 'consumption-ranking',
                name: 'ConsumptionRanking',
                meta: {
                  title: $t('home.user.consumptionRanking'),
                },
                component: () =>
                  import('#/views/home/user/consumption/index.vue'),
              },
              {
                path: 'recharge-record',
                name: 'RechargeRecord',
                meta: {
                  title: $t('home.user.rechargeRecord'),
                },
                component: () => import('#/views/home/user/recharge/index.vue'),
              },
              {
                path: 'leave-message',
                name: 'LeaveMessage',
                meta: {
                  title: $t('home.user.leaveMessageManagement'),
                },
                component: () =>
                  import('#/views/home/user/leave-message/index.vue'),
              },
              {
                path: 'entry-record',
                name: 'EntryRecord',
                meta: {
                  title: $t('home.user.entryRecord'),
                },
                component: () => import('#/views/home/user/entry/index.vue'),
              },
              {
                path: 'behavior-log',
                name: 'BehaviorLog',
                meta: {
                  title: $t('home.user.behaviorLog'),
                },
                component: () => import('#/views/home/user/behavior/index.vue'),
              },
            ],
          },
          {
            path: 'membership',
            name: 'MembershipManagement',
            meta: {
              icon: 'icon-park-outline:light-member',
              title: $t('home.user.membershipManagement'),
            },
            component: () => import('#/views/home/user/membership/index.vue'),
          },
        ],
      },
      {
        meta: {
          icon: 'icon-park-outline:order',
          title: $t('home.order.order'),
        },
        name: 'Order',
        path: '/order',
        children: [
          {
            path: 'order',
            name: 'OrderManagement',
            meta: {
              icon: 'lsicon:work-order-appointment-outline',
              title: $t('home.order.orderManagement'),
            },
            children: [
              {
                path: 'member-ship',
                name: 'MembershipOrder',
                meta: {
                  title: $t('home.order.unclaimedParcel'),
                },
                component: () =>
                  import('#/views/home/order/unclaimed-parcel/index.vue'),
              },
              {
                path: 'bulk-order',
                name: 'BulkOrder',
                meta: {
                  title: $t('home.order.bulkOrder'),
                },
                component: () =>
                  import('#/views/home/order/bulk-order/index.vue'),
              },
              {
                path: 'container-order',
                name: 'ContainerOrder',
                meta: {
                  title: $t('home.order.containerOrder'),
                },
                component: () =>
                  import('#/views/home/order/container-order/index.vue'),
              },
              {
                path: 'lot-number-list',
                name: 'LotNumberList',
                meta: {
                  title: $t('home.order.lotNumberList'),
                },
                component: () =>
                  import('#/views/home/order/container-order/index.vue'),
              },
            ],
          },
          {
            path: 'refund',
            name: 'RefundManagement',
            meta: {
              icon: 'carbon:ibm-elo-publishing',
              title: $t('home.order.postingManagement'),
            },
            children: [
              {
                path: 'userPosting',
                name: 'userPosting',
                meta: {
                  title: $t('home.order.userPosting'),
                },
                component: () =>
                  import('#/views/home/order/user-posting/index.vue'),
              },
              {
                path: 'releaseInformation',
                name: 'releaseInformation',
                meta: {
                  title: $t('home.order.releaseInformation'),
                },
                component: () =>
                  import('#/views/home/order/release-information/index.vue'),
              },
            ],
          },
        ],
      },
      {
        meta: {
          icon: 'ix:barchart',
          title: $t('home.statistics.statistics'),
        },
        name: 'Statistics',
        path: '/statistics',
        component: () => import('#/views/home/statistics/index.vue'),
      },
      {
        meta: {
          icon: 'lsicon:warehouse-filled',
          title: $t('home.stash.stash'),
        },
        name: 'Stash',
        path: '/stash',
        component: () => import('#/views/home/stash/index.vue'),
      },
      {
        meta: {
          icon: 'mdi:customer-service',
          title: $t('home.service.service'),
        },
        name: 'Service',
        path: '/service',
        children: [
          {
            meta: {
              icon: 'carbon:customer-service',
              title: $t('home.service.CustomerServiceUser'),
            },
            name: 'serviceUser',
            path: 'user',
            component: () => import('#/views/home/service/user/index.vue'),
          },
          {
            meta: {
              icon: 'covid:transmission-virus-mobile-application',
              title: $t('home.service.CustomerServiceApplication'),
            },
            name: 'Application',
            path: 'application',
            component: () =>
              import('#/views/home/service/application/index.vue'),
          },
          {
            meta: {
              icon: 'map:real-estate-agency',
              title: $t('home.service.agency'),
            },
            name: 'Agency',
            path: 'agency',
            component: () => import('#/views/home/service/agency/index.vue'),
          },
        ],
      },
      {
        meta: {
          icon: 'eos-icons:system-ok-outlined',
          title: $t('home.system.system'),
        },
        name: 'System',
        path: '/system',
        children: [
          {
            path: 'message',
            name: 'MessageManagement',
            meta: {
              icon: 'uil:message',
              title: $t('home.system.message'),
            },
            component: () => import('#/views/home/system/message/index.vue'),
          },
          {
            meta: {
              icon: 'gis:search-country',
              title: $t('home.system.country'),
            },
            name: 'Country',
            path: 'country',
            component: () => import('#/views/home/system/country/index.vue'),
          },
        ],
      },
      {
        meta: {
          icon: 'akar-icons:statistic-up',
          title: $t('home.data.data'),
        },
        name: 'Data',
        path: '/data',
        component: () => import('#/views/home/data/index.vue'),
      },
    ],
  },
];

export default routes;
