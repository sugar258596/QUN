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
    name: 'Demos',
    path: '/demos',
    children: [
      {
        meta: {
          icon: 'tabler:users',
          title: $t('home.user.user'),
        },
        name: 'User',
        path: '/demos/user',
        children: [
          {
            path: 'user',
            name: 'UserManagement',
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
                path: 'message',
                name: 'MessageManagement',
                meta: {
                  title: $t('home.user.messageManagement'),
                },
                component: () => import('#/views/home/user/message/index.vue'),
              },
              {
                path: 'consumption',
                name: 'ConsumptionRanking',
                meta: {
                  title: $t('home.user.consumptionRanking'),
                },
                component: () =>
                  import('#/views/home/user/consumption/index.vue'),
              },
              {
                path: 'recharge',
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
                path: 'entry',
                name: 'EntryRecord',
                meta: {
                  title: $t('home.user.entryRecord'),
                },
                component: () => import('#/views/home/user/entry/index.vue'),
              },
              {
                path: 'behavior',
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
        path: '/demos/order',
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
                path: 'membership',
                name: 'MembershipOrder',
                meta: {
                  title: $t('home.order.unclaimedParcel'),
                },
                component: () =>
                  import('#/views/home/order/unclaimed-parcel/index.vue'),
              },
              {
                path: 'containerOrder',
                name: 'ContainerOrder',
                meta: {
                  title: $t('home.order.containerOrder'),
                },
                component: () =>
                  import('#/views/home/order/container-order/index.vue'),
              },
              {
                path: 'lotNumberList',
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
        path: '/demos/statistics',
        component: () => import('#/views/home/statistics/index.vue'),
      },
      {
        meta: {
          icon: 'lsicon:warehouse-filled',
          title: $t('home.stash.stash'),
        },
        name: 'Stash',
        path: '/demos/stash',
        component: () => import('#/views/home/stash/index.vue'),
      },
      {
        meta: {
          icon: 'mdi:customer-service',
          title: $t('home.service.service'),
        },
        name: 'Service',
        path: '/demos/service',
        component: () => import('#/views/home/service/index.vue'),
      },
      {
        meta: {
          icon: 'eos-icons:system-ok-outlined',
          title: $t('home.system.system'),
        },
        name: 'System',
        path: '/demos/system',
        component: () => import('#/views/home/system/index.vue'),
      },
      {
        meta: {
          icon: 'akar-icons:statistic-up',
          title: $t('home.data.data'),
        },
        name: 'Data',
        path: '/demos/data',
        component: () => import('#/views/home/data/index.vue'),
      },
    ],
  },
];

export default routes;
