<script lang="ts" setup>
import type { VbenFormProps } from '@vben/common-ui';

import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { RealNameApi } from '#/api';

import { Page, useVbenModal } from '@vben/common-ui';

import { Button, Tag } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { getWithdrawList } from '#/api';
import { $t } from '#/locales';

import BaseDemo from './base-demo.vue';

const formOptions: VbenFormProps = {
  collapsed: false,
  wrapperClass: 'grid-cols-2 md:grid-cols-2 lg:grid-cols-3',
  schema: [
    {
      component: 'Input',
      componentProps: {
        placeholder: $t('service.tips.withdraw'),
      },
      fieldName: 'Keywords',
      label: $t('preferences.button.inquire'),
    },
    {
      component: 'Select',
      defaultValue: -1,
      componentProps: {
        allowClear: true,
        options: [
          {
            label: $t('service.examine.0'),
            value: 0,
          },
          {
            label: $t('service.examine.1'),
            value: 1,
          },
          {
            label: $t('service.examine.2'),
            value: 2,
          },
          {
            label: $t('preferences.status.no'),
            value: -1,
          },
        ],
        label: $t('service.examine.type'),
      },
      fieldName: 'Status',
      label: $t('service.examine.type'),
    },
    {
      component: 'Select',
      defaultValue: -1,
      componentProps: {
        allowClear: true,
        options: [
          {
            label: $t('service.withdrawal.0'),
            value: 0,
          },
          {
            label: $t('service.withdrawal.1'),
            value: 1,
          },
          {
            label: $t('service.withdrawal.2'),
            value: 1,
          },
          {
            label: $t('preferences.status.no'),
            value: -1,
          },
        ],
        placeholder: $t('preferences.user.sex.type'),
      },
      fieldName: 'Type',
      label: $t('preferences.type.type'),
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

const gridOptions: VxeTableGridOptions<RealNameApi.RealNameListResult> = {
  checkboxConfig: {
    highlight: true,
    labelField: 'Name',
  },
  columns: [
    { field: 'MemberId', title: $t('preferences.user.id'), width: 80 },
    { field: 'OrderNo', title: $t('preferences.order.no'), width: 200 },
    {
      field: 'RealName',
      title: $t('preferences.user.name'),
      width: 80,
    },

    {
      field: 'PhoneNumber',
      title: $t('preferences.user.phone'),
      width: 120,
    },
    {
      field: 'Type',
      title: $t('service.withdrawal.type'),
      slots: { default: 'type' },
      width: 120,
    },
    {
      field: 'UserType',
      title: $t('preferences.type.user'),
      slots: { default: 'use-type' },
      width: 120,
    },
    {
      field: 'Amount',
      title: $t('service.withdrawal.amount'),
      width: 100,
    },
    {
      field: 'Status',
      title: $t('preferences.status.type'),
      slots: { default: 'status' },
      width: 140,
    },
    { field: 'AddTime', title: $t('preferences.time.apply'), width: 140 },
    { field: 'UpdateTime', title: $t('preferences.time.audit'), width: 140 },
    {
      fixed: 'right',
      title: $t('preferences.button.type'),
      slots: { default: 'action' },
      width: 150,
    },
  ],
  exportConfig: {},
  height: 'auto',
  keepSource: true,
  pagerConfig: {},
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues) => {
        const res = await getWithdrawList({
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

function handleExamine(data: any, edit?: boolean) {
  sharedModalApi.setData({
    edit,
    data,
  });
  sharedModalApi.open();
}

function typeColor(type: number, flag?: boolean) {
  let color = '';
  switch (type) {
    case 0: {
      color = flag ? '#87d068' : 'cyan';
      break;
    }
    case 1: {
      color = flag ? '#2db7f5' : 'processing';
      break;
    }
    case 2: {
      color = flag ? '#f50' : 'green';
      break;
    }
    default: {
      color = flag ? '#f50' : 'cyan';
      break;
    }
  }
  return color;
}

function typeText(type: number, flag?: boolean) {
  let text = '';
  switch (type) {
    case 0: {
      text = flag ? $t('service.examine.0') : $t('service.withdrawal.0');
      break;
    }
    case 1: {
      text = flag ? $t('service.examine.1') : $t('service.withdrawal.1');
      break;
    }
    case 2: {
      text = flag ? $t('service.examine.2') : $t('service.withdrawal.2');
      break;
    }
    default: {
      text = flag ? $t('service.examine.2') : $t('service.withdrawal.0');
      break;
    }
  }
  return text;
}
</script>

<template>
  <Page auto-content-height>
    <Grid>
      <template #use-type="{ row }">
        <Tag :color="row.UserType.includes('客服') ? 'volcano' : 'gold'">
          {{ row.UserType }}
        </Tag>
      </template>
      <template #type="{ row }">
        <Tag :color="typeColor(row.Type)">
          {{ typeText(row.Type) }}
        </Tag>
      </template>
      <template #status="{ row }">
        <Tag :color="typeColor(row.Status, true)">
          {{ typeText(row.Status, true) }}
        </Tag>
      </template>
      <template #action="{ row }">
        <div class="flex gap-2">
          <Button @click="handleExamine(row)" type="primary">
            {{ $t('preferences.button.examine') }}
          </Button>
          <Button @click="handleExamine(row, true)" type="primary">
            {{ $t('preferences.button.detail') }}
          </Button>
        </div>
      </template>
    </Grid>
    <BaseModal />
  </Page>
</template>
