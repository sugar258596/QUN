<script lang="ts" setup>
import type { VbenFormProps } from '@vben/common-ui';

import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { AdministratorApi } from '#/api';

import { Page, useVbenModal } from '@vben/common-ui';

import { Button, message, Tag } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { getRoleListApi, postRoleDeleteApi } from '#/api';
import { $t } from '#/locales';

import BaseDemo from './base-demo.vue';

const formOptions: VbenFormProps = {
  collapsed: false,
  wrapperClass: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  schema: [
    {
      component: 'Input',
      componentProps: {
        placeholder: '输入角色名称',
      },
      defaultValue: '',
      fieldName: 'Keywords',
      label: '角色名称',
    },
  ],
  showCollapseButton: false,
  submitButtonOptions: {
    content: $t('preferences.button.inquire'),
  },
  resetButtonOptions: {
    content: $t('preferences.button.add'),
  },
  handleReset: onReset,
  submitOnChange: true,
  submitOnEnter: true,
};

const gridOptions: VxeTableGridOptions<AdministratorApi.adminDetailResult> = {
  checkboxConfig: {
    highlight: true,
    labelField: 'Name',
  },
  columns: [
    { align: 'center', type: 'checkbox', width: 40 },
    { field: 'Id', title: 'ID' },
    { field: 'Role_name', title: $t('user.role.name') },
    {
      field: 'Role_type',
      title: $t('user.role.type'),
      slots: { default: 'roleType' },
    },
    {
      fixed: 'right',
      title: $t('preferences.button.type'),
      slots: { default: 'action' },
      width: 120,
    },
  ],
  exportConfig: {},
  height: 'auto',
  keepSource: true,
  pagerConfig: {},
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues) => {
        const res = await getRoleListApi({
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

async function handleDelete() {
  const data = gridApi.grid.getCheckboxRecords(false);
  const IdArr = data.map((item) => item.Id).join(',');
  await postRoleDeleteApi({ IdArr });
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
      <template #roleType="{ row }">
        <Tag :color="row.Role_type === 1 ? '#87d068' : '#2db7f5'">
          {{ row.Role_type === 1 ? $t('user.role.1') : $t('user.role.1') }}
        </Tag>
      </template>
      <template #action="{ row }">
        <Button @click="handleEdit(row)" type="primary">
          {{ $t('preferences.button.edit') }}
        </Button>
      </template>
    </Grid>
    <BaseModal />
  </Page>
</template>
