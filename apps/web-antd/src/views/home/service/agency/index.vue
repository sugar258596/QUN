<script lang="ts" setup>
import type { VbenFormProps } from '@vben/common-ui';

import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { UserApi } from '#/api';

import { Page } from '@vben/common-ui';

import { Image, Tag } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { GetAgentAchievement } from '#/api';
import { $t } from '#/locales';

const formOptions: VbenFormProps = {
  collapsed: false,
  wrapperClass: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-3',
  schema: [
    {
      component: 'Input',
      fieldName: 'Id',
      label: 'ID',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: $t('preferences.order.no'),
      },
      fieldName: 'Keywords',
      label: $t('preferences.button.inquire'),
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

const gridOptions: VxeTableGridOptions<UserApi.GetUserListResult> = {
  checkboxConfig: {
    highlight: true,
    labelField: 'Name',
  },
  columns: [
    { field: 'Id', title: 'ID' },
    { field: 'MemberId', title: $t('preferences.user.id') },
    { field: 'NickName', title: $t('preferences.user.nick') },
    {
      field: 'Avatar',
      title: $t('preferences.user.avatar'),
      slots: { default: 'image-url' },
    },
    {
      field: 'OrderNo',
      title: $t('preferences.order.no'),
      slots: { default: 'sex' },
    },
    { field: 'Before', title: $t('wallet.before') },
    { field: 'Change', title: $t('wallet.change') },
    { field: 'After', title: $t('wallet.after') },
    {
      field: 'Status',
      title: $t('preferences.status.type'),
      slots: { default: 'status' },
    },
    { field: 'AddTime', title: $t('preferences.time.add') },
  ],
  exportConfig: {},
  height: 'auto',
  keepSource: true,
  pagerConfig: {},
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues) => {
        const res = await GetAgentAchievement({
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

const [Grid] = useVbenVxeGrid({ formOptions, gridOptions });

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
    </Grid>
  </Page>
</template>
