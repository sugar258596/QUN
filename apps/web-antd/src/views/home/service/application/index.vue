<script lang="ts" setup>
import type { VbenFormProps } from '@vben/common-ui';

import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { OrdinaryApi } from '#/api';

import { Page, useVbenModal } from '@vben/common-ui';

import { Button, Image, message, Tag } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { DeleteCustomer, GetCustomerApplyList } from '#/api';
import { $t } from '#/locales';

import BaseDemo from './base-demo.vue';
import Examine from './examine.vue';

const formOptions: VbenFormProps = {
  collapsed: false,
  wrapperClass: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-3',
  schema: [
    {
      component: 'Input',
      componentProps: {
        placeholder: $t('service.tips.application'),
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
            label: $t('service.customer.0'),
            value: 0,
          },
          {
            label: $t('service.customer.1'),
            value: 1,
          },
          {
            label: $t('preferences.status.no'),
            value: -1,
          },
        ],
        label: $t('service.customer.type'),
      },
      fieldName: 'Type',
      label: $t('service.customer.type'),
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
  submitOnChange: false,
  submitOnEnter: true,
};

const gridOptions: VxeTableGridOptions<OrdinaryApi.GetUserListResult> = {
  checkboxConfig: {
    highlight: true,
  },
  columns: [
    { fixed: 'left', align: 'center', type: 'checkbox', width: 40 },
    { field: 'MemberId', title: 'ID', width: 80 },
    { field: 'UserNick', title: $t('preferences.user.nick'), width: 80 },
    {
      field: 'Avatar',
      title: $t('preferences.user.avatar'),
      slots: { default: 'image-url' },
      width: 150,
    },

    {
      field: 'Name',
      title: $t('preferences.user.name'),
      width: 120,
    },
    { field: 'CountryName', title: $t('service.nation'), width: 80 },
    { field: 'Mobile', title: $t('preferences.user.phone'), width: 120 },
    { field: 'Email', title: $t('preferences.user.email'), width: 160 },
    {
      field: 'Type',
      title: $t('service.customer.type'),
      slots: { default: 'type' },
      width: 80,
    },
    {
      field: 'Status',
      title: $t('preferences.status.type'),
      slots: { default: 'status' },
      width: 80,
    },
    {
      fixed: 'right',
      title: $t('preferences.button.type'),
      slots: { default: 'action' },
      width: 230,
    },
  ],
  exportConfig: {},
  height: 'auto',
  keepSource: true,
  pagerConfig: {},
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues) => {
        const res = await GetCustomerApplyList({
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
const [BaseModal2, sharedModalApi2] = useVbenModal({
  connectedComponent: Examine,
  onBeforeClose: () => {
    gridApi.query();
  },
});

function handleEdit(data: any, edit?: boolean) {
  sharedModalApi.setData({
    edit,
    data,
  });
  sharedModalApi.open();
}
function handleExamine(data: any) {
  sharedModalApi2.setData({
    edit: true,
    data,
  });
  sharedModalApi2.open();
}

async function handleDelete() {
  const data = gridApi.grid.getCheckboxRecords(false);
  const IdArr = data.map((item) => item.Id).join(',');
  await DeleteCustomer({ IdArr });
  await gridApi.query();
  message.success($t('preferences.message.delete'));
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
    case 2: {
      color = '#f50';
      break;
    }
    default: {
      color = '#2db7f5';
      break;
    }
  }
  return color;
}

function typeText(type: number) {
  let text = '';
  switch (type) {
    case 0: {
      text = $t('service.examine.0');
      break;
    }
    case 1: {
      text = $t('service.examine.1');
      break;
    }
    case 2: {
      text = $t('service.examine.2');
      break;
    }
    default: {
      text = $t('service.examine.2');
      break;
    }
  }
  return text;
}
</script>

<template>
  <Page auto-content-height>
    <Grid>
      <template #toolbar-tools>
        <div class="flex gap-2">
          <Button @click="handleDelete" type="primary" danger>
            {{ $t('preferences.button.delete') }}
          </Button>
        </div>
      </template>
      <template #image-url="{ row }">
        <Image :src="row.Avatar" height="30" width="30" />
      </template>
      <template #type="{ row }">
        <Tag :color="row.Type ? 'blue' : 'gold'">
          {{ row.Type }}
        </Tag>
      </template>
      <template #status="{ row }">
        <Tag :color="typeColor(row.Status)">
          {{ typeText(row.Status) }}
        </Tag>
      </template>
      <template #action="{ row }">
        <div class="flex gap-2">
          <Button @click="handleExamine(row)" type="primary">
            {{ $t('preferences.button.examine') }}
          </Button>
          <Button @click="handleEdit(row, true)" type="primary">
            {{ $t('preferences.button.detail') }}
          </Button>
          <Button @click="handleEdit(row)" type="primary">
            {{ $t('preferences.button.edit') }}
          </Button>
        </div>
      </template>
    </Grid>
    <BaseModal />
    <BaseModal2 />
  </Page>
</template>
