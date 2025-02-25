<script lang="ts" setup>
import type { VbenFormProps } from '@vben/common-ui';

import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { UserApi } from '#/api';

import { Page, useVbenModal } from '@vben/common-ui';

import { Button, message, Tag } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { DeleteCountry, GetCountryList } from '#/api';
import { $t } from '#/locales';

import BaseDemo from './base-demo.vue';

const formOptions: VbenFormProps = {
  collapsed: false,
  wrapperClass: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-3',
  schema: [
    {
      component: 'Input',
      componentProps: {
        placeholder: $t('system.tips'),
      },
      fieldName: 'Keywords',
      label: $t('preferences.button.inquire'),
    },
  ],
  showCollapseButton: false,
  submitButtonOptions: {
    content: $t('preferences.button.inquire'),
  },
  resetButtonOptions: {
    content: $t('preferences.button.add'),
  },
  handleReset: () => {
    handleEdit();
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
    { align: 'center', type: 'checkbox', width: 40 },
    { field: 'Id', title: 'ID' },
    {
      field: 'CountryName',
      title: $t('service.nation'),
    },
    {
      field: 'Type',
      title: $t('preferences.type.type'),
      slots: { default: 'type' },
    },
    {
      field: 'AddTime',
      title: $t('preferences.time.add'),
    },
    {
      fixed: 'right',
      title: $t('preferences.button.type'),
      slots: { default: 'action' },
    },
  ],
  exportConfig: {},
  height: 'auto',
  keepSource: true,
  pagerConfig: {},
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues) => {
        const res = await GetCountryList({
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

function handleEdit(data?: any, edit?: boolean) {
  sharedModalApi.setData({
    edit,
    data,
  });
  sharedModalApi.open();
}

async function handleDelete() {
  const data = gridApi.grid.getCheckboxRecords(false);
  const IdArr = data.map((item) => item.Id).join(',');
  await DeleteCountry({ IdArr });
  await gridApi.query();
  message.success($t('preferences.message.delete'));
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
      <template #type="{ row }">
        <Tag :color="row.Type === 0 ? 'success' : 'error'">
          {{ row.Type === 0 ? $t('system.country.0') : $t('system.country.1') }}
        </Tag>
      </template>
      <template #action="{ row }">
        <Button @click="handleEdit(row, true)" type="primary">
          {{ $t('preferences.button.edit') }}
        </Button>
      </template>
    </Grid>
    <BaseModal />
  </Page>
</template>
