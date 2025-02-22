<script lang="ts" setup>
import type { VbenFormProps } from '@vben/common-ui';

import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import { Page, useVbenModal } from '@vben/common-ui';

import { Button, message } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { getAdminListApi, postAdminDeleteApi } from '#/api/core/system';

import BaseDemo from './base-demo.vue';
import { formSchema, tableColumns } from './data';

interface RowType {
  category: string;
  color: string;
  id: string;
  imageUrl: string;
  open: boolean;
  price: string;
  productName: string;
  releaseDate: string;
  status: 'error' | 'success' | 'warning';
}

const formOptions: VbenFormProps = {
  collapsed: false,
  wrapperClass: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  schema: formSchema,
  showCollapseButton: false,
  submitButtonOptions: {
    content: '查询',
  },
  resetButtonOptions: {
    content: '添加',
  },
  handleReset: onReset,
  submitOnChange: true,
  submitOnEnter: true,
};

const gridOptions: VxeTableGridOptions<RowType> = {
  checkboxConfig: {
    highlight: true,
    labelField: 'Name',
  },
  columns: tableColumns,
  exportConfig: {},
  height: 'auto',
  keepSource: true,
  pagerConfig: {},
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues) => {
        const res = await getAdminListApi({
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
  await postAdminDeleteApi({ IdArr });
  await gridApi.query();
  message.success('删除成功');
}
</script>

<template>
  <Page auto-content-height>
    <Grid>
      <template #toolbar-tools>
        <div class="flex gap-2">
          <Button @click="handleDelete" type="primary" danger>删除</Button>
        </div>
      </template>
      <template #action="{ row }">
        <Button @click="handleEdit(row)" type="primary">编辑</Button>
      </template>
    </Grid>
    <BaseModal />
  </Page>
</template>
