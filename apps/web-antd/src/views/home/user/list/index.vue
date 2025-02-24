<script lang="ts" setup>
import type { VbenFormProps } from '@vben/common-ui';

import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { UserApi } from '#/api';

import { Page } from '@vben/common-ui';

import { Image, Switch, Tag } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { GetCustomerList } from '#/api';
import { $t } from '#/locales';

const formOptions: VbenFormProps = {
  collapsed: false,
  wrapperClass: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-3',
  schema: [
    {
      component: 'Input',
      defaultValue: '',
      fieldName: 'Keywords',
      label: $t('preferences.user.account'),
    },
    {
      component: 'Select',
      componentProps: {
        allowClear: true,
        options: [
          {
            label: $t('user.plus.yes'),
            value: '0',
          },
          {
            label: $t('user.plus.no'),
            value: '1',
          },
        ],
        label: $t('preferences.type.user'),
      },
      fieldName: 'IsPlus',
      label: $t('preferences.type.user'),
    },
    {
      component: 'Select',
      componentProps: {
        allowClear: true,
        options: [
          {
            label: $t('preferences.user.sex.male'),
            value: '0',
          },
          {
            label: $t('preferences.user.sex.female'),
            value: '1',
          },
        ],
        placeholder: $t('preferences.user.sex.type'),
      },
      fieldName: 'Sex',
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
    content: '查询',
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
    { field: 'NickName', title: $t('preferences.user.nick') },
    {
      field: 'Avatar',
      title: $t('preferences.user.avatar'),
      slots: { default: 'image-url' },
    },
    {
      field: 'IsPlus',
      title: $t('user.plus.type'),
      slots: { default: 'puls' },
    },
    {
      field: 'IsRealName',
      title: $t('user.real.type'),
      slots: { default: 'real-name' },
    },
    {
      field: 'Sex',
      title: $t('preferences.user.sex.type'),
      slots: { default: 'sex' },
    },
    {
      field: 'UserCode',
      title: $t('user.usercode'),
      slots: { default: 'code' },
    },
    { field: 'Mobile', title: $t('preferences.user.phone') },
    { field: 'Email', title: $t('preferences.user.email') },
    { field: 'Wallet', title: $t('user.amount') },
    { field: 'Score', title: $t('user.score') },
    {
      field: 'Status',
      title: $t('preferences.user.type'),
      slots: { default: 'status' },
    },
  ],
  exportConfig: {},
  height: 'auto',
  keepSource: true,
  pagerConfig: {},
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues) => {
        const res = await GetCustomerList({
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
</script>

<template>
  <Page auto-content-height>
    <Grid>
      <template #image-url="{ row }">
        <Image :src="row.Avatar" height="30" width="30" />
      </template>
      <template #real-name="{ row }">
        <Tag :color="row.IsRealName === 0 ? 'processing' : 'error'">
          {{ row.IsRealName === 0 ? $t('user.real.yes') : $t('user.real.no') }}
        </Tag>
      </template>
      <template #puls="{ row }">
        <Tag :color="row.IsPlus === 0 ? '#87d068' : 'warning'">
          {{ row.IsPlus === 0 ? $t('user.plus.yes') : $t('user.plus.no') }}
        </Tag>
      </template>
      <template #sex="{ row }">
        <Tag :color="row.Sex === 0 ? 'cyan' : 'magenta'">
          {{
            row.Sex === 0
              ? $t('preferences.user.sex.male')
              : $t('preferences.user.sex.female')
          }}
        </Tag>
      </template>
      <template #code="{ row }">
        <Tag color="purple">{{ row.UserCode }}</Tag>
      </template>
      <template #status="{ row }">
        <Switch v-model:checked="row.Status" disabled />
      </template>
    </Grid>
  </Page>
</template>
