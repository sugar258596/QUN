<script lang="ts" setup>
import type { VbenFormProps } from '@vben/common-ui';

import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { UserApi } from '#/api';

import { Page, useVbenModal } from '@vben/common-ui';

import { Button, Image, Tag } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { getUserFlowList } from '#/api';
import { $t } from '#/locales';

import BaseDemo from './base-demo.vue';

const formOptions: VbenFormProps = {
  collapsed: false,
  wrapperClass: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  schema: [
    {
      component: 'Input',
      defaultValue: '',
      fieldName: 'Id',
      label: 'ID',
    },
    {
      component: 'Input',
      defaultValue: '',
      fieldName: 'Keywords',
      label: $t('preferences.order.no'),
    },
    {
      component: 'Select',
      componentProps: {
        options: [
          {
            label: $t('wallet.options.0'),
            value: 0,
          },
          {
            label: $t('wallet.options.1'),
            value: 1,
          },
        ],
      },
      fieldName: 'Status',
      label: $t('preferences.status.type'),
    },
    {
      component: 'RangePicker',
      fieldName: 'rangePicker',
      dependencies: {
        componentProps(values) {
          if (values.rangePicker) {
            values.StartTime = values.rangePicker[0];
            values.EndTime = values.rangePicker[1];
          } else {
            values.StartTime = '';
            values.EndTime = '';
          }
          return values;
        },
        triggerFields: ['rangePicker'],
      },
      label: $t('preferences.time.range'),
    },
  ],
  showCollapseButton: false,
  submitButtonOptions: {
    content: $t('preferences.button.inquire'),
  },
  resetButtonOptions: {
    show: false,
  },
  handleReset: onReset,
  submitOnChange: false,
  submitOnEnter: true,
};

const gridOptions: VxeTableGridOptions<UserApi.GetUserFlowListResult> = {
  checkboxConfig: {
    highlight: true,
    labelField: 'Name',
  },
  columns: [
    { field: 'Id', title: 'ID' },
    {
      field: 'UserNick',
      title: $t('preferences.user.nick'),
    },
    {
      field: 'Avatar',
      title: $t('preferences.user.avatar'),
      slots: { default: 'image-url' },
    },
    { field: 'WalletType', title: $t('preferences.type.account') },
    { field: 'TitleType', title: $t('wallet.title') },
    { field: 'OrderNo', title: $t('preferences.order.no') },
    { field: 'SourceType', title: $t('preferences.type.source') },
    { field: 'After', title: $t('wallet.after') },
    { field: 'AddTime', title: $t('preferences.time.add') },
    {
      field: 'WalletStatus',
      title: $t('preferences.status.type'),
      slots: { default: 'status' },
    },
    { fixed: 'right', title: '操作', slots: { default: 'action' }, width: 120 },
  ],
  exportConfig: {},
  height: 'auto',
  keepSource: true,
  pagerConfig: {},
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues) => {
        const res = await getUserFlowList({
          Page: page.currentPage,
          PageSize: page.pageSize,
          ...formValues,
        });
        return {
          items: res,
          total: res.length,
        };
      },
    },
  },
  toolbarConfig: {
    custom: true,
    export: true,
    refresh: true,
    resizable: true,
    search: true,
    zoom: true,
  },
  showOverflow: false,
};
const [Grid, gridApi] = useVbenVxeGrid({ formOptions, gridOptions });

const [BaseModal, sharedModalApi] = useVbenModal({
  connectedComponent: BaseDemo,
  onBeforeClose: () => {
    gridApi.query();
  },
});

function onReset() {
  sharedModalApi.open();
}

function handleEdit(data: any) {
  sharedModalApi.setData({
    edit: true,
    data,
  });
  sharedModalApi.open();
}

function typeColor(type: number) {
  let color = '';
  switch (type) {
    case 0: {
      color = '#87d068';
      break;
    }
    case 1: {
      color = '#2db7f5';
      break;
    }
    case 99: {
      color = '#f50';
      break;
    }
    default: {
      color = '#108ee9';
      break;
    }
  }
  return color;
}

function typeText(type: number) {
  let text = '';
  switch (type) {
    case 0: {
      text = $t('preferences.status.0');
      break;
    }
    case 1: {
      text = $t('preferences.status.1');
      break;
    }
    case 99: {
      text = $t('preferences.status.99');
      break;
    }
    default: {
      text = $t('preferences.status.1');
      break;
    }
  }
  return text;
}
</script>

<template>
  <Page auto-content-height>
    <Grid>
      <template #image-url="{ row }">
        <Image :src="row.Avatar" height="30" width="30" />
      </template>
      <template #status="{ row }">
        <Tag :color="typeColor(row.WalletStatus)">
          {{ typeText(row.WalletStatus) }}
        </Tag>
      </template>
      <template #action="{ row }">
        <Button @click="handleEdit(row)" type="primary">
          {{ $t('preferences.button.detail') }}
        </Button>
      </template>
    </Grid>
    <BaseModal />
  </Page>
</template>
