<script lang="ts" setup>
import type { VbenFormProps } from '@vben/common-ui';

import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { UserApi } from '#/api';

import { Page, useVbenModal } from '@vben/common-ui';

import { Button, message, Tag } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { deleteMessage, getMessageList } from '#/api';
import { $t } from '#/locales';

import BaseDemo from './base-demo.vue';

const formOptions: VbenFormProps = {
  collapsed: false,
  wrapperClass: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  schema: [
    {
      component: 'Input',
      defaultValue: '',
      fieldName: 'Keywords',
      label: $t('preferences.title'),
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

const gridOptions: VxeTableGridOptions<UserApi.GetMessageListResult> = {
  checkboxConfig: {
    highlight: true,
    labelField: 'Name',
  },
  columns: [
    { align: 'center', type: 'checkbox', width: 40 },
    { field: 'Id', title: 'ID' },
    { field: 'Title', title: $t('management.zh_title') },
    { field: 'Content', title: $t('management.zh_content') },
    { field: 'EnglishTitle', title: $t('management.en_title') },
    { field: 'EnglishContent', title: $t('management.en_title') },
    { field: 'RussianTitle', title: $t('management.ru_title') },
    { field: 'RussianContent', title: $t('management.ru_title') },
    {
      field: 'Type',
      title: $t('management.message_type'),
      slots: { default: 'type' },
    },
    { field: 'MemberIds', title: $t('management.push_user') },
    { fixed: 'right', title: '操作', slots: { default: 'action' }, width: 120 },
  ],
  exportConfig: {},
  height: 'auto',
  keepSource: true,
  pagerConfig: {},
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues) => {
        const res = await getMessageList({
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
  await deleteMessage({ IdArr });
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
        <Tag :color="row.Type === '全体' ? 'cyan' : 'magenta'">
          {{ row.Type }}
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
