<script lang="ts" setup>
import type { VbenFormProps } from '@vben/common-ui';

import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { RealNameApi } from '#/api';

import { Page, useVbenModal } from '@vben/common-ui';

import { Button, Image, Tag } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { getRealNameList } from '#/api';
import { $t } from '#/locales';

import BaseDemo from './base-demo.vue';

const formOptions: VbenFormProps = {
  collapsed: false,
  wrapperClass: 'grid-cols-2 md:grid-cols-2 lg:grid-cols-3',
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
            label: $t('preferences.user.sex.male'),
            value: 0,
          },
          {
            label: $t('preferences.user.sex.female'),
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
      label: $t('preferences.user.sex.type'),
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
    { field: 'MemberId', title: $t('preferences.user.id') },
    { field: 'UserNick', title: $t('preferences.user.nick') },
    {
      field: 'Avatar',
      title: $t('preferences.user.avatar'),
      slots: { default: 'image-url' },
    },
    {
      field: 'IsRealName',
      title: $t('user.real.type'),
      slots: { default: 'real-name' },
    },
    {
      field: 'Status',
      title: $t('preferences.status.type'),
      slots: { default: 'status' },
    },
    {
      field: 'UserName',
      title: $t('preferences.user.name'),
    },
    { field: 'ReviewComments', title: $t('service.remark') },
    { field: 'AddTime', title: $t('preferences.time.apply') },
    { field: 'UpdateTime', title: $t('preferences.time.audit') },
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
        const res = await getRealNameList({
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
      <template #image-url="{ row }">
        <Image :src="row.Avatar" height="30" width="30" />
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
          <Button @click="handleExamine(row, true)" type="primary">
            {{ $t('preferences.button.detail') }}
          </Button>
        </div>
      </template>
    </Grid>
    <BaseModal />
  </Page>
</template>
