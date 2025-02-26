<script lang="ts" setup>
import type { VxeGridProps } from '#/adapter/vxe-table';

import { Page, useVbenModal } from '@vben/common-ui';
import { IconifyIcon } from '@vben/icons';
import { $t } from '@vben/locales';

import { Button, message, Switch } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { getMenuListApi, postMenuDeleteApi } from '#/api';

import BaseDemo from './base-demo.vue';

interface RowType {
  Id: number;
  Icon_url: string;
  Title: string;
  Name: string;
  Link_url: string;
  Is_lock: boolean;
}

const gridOptions: VxeGridProps<RowType> = {
  checkboxConfig: {
    highlight: true,
    labelField: 'name',
  },
  columns: [
    { align: 'left', type: 'checkbox', width: 50 },
    { field: 'Id', title: 'ID', treeNode: true },
    { field: 'Title', title: $t('user.menu.name') },
    {
      field: 'Icon_url',
      title: $t('user.menu.icon'),
      slots: { default: 'icon' },
      width: 100,
    },
    { field: 'Name', title: $t('user.menu.invoke') },
    { field: 'Link_url', title: $t('user.menu.link') },
    {
      field: 'Is_lock',
      title: $t('preferences.status.type'),
      slots: { default: 'open' },
    },
    {
      fixed: 'right',
      title: $t('preferences.button.type'),
      slots: { default: 'action' },
      width: 100,
    },
  ],
  pagerConfig: {
    enabled: false,
  },
  exportConfig: {},

  keepSource: true,
  treeConfig: {
    parentField: 'Parent_id',
    rowField: 'Id',
    transform: true,
  },
  proxyConfig: {
    ajax: {
      query: async () => {
        const res = await getMenuListApi();
        const arr: any[] = [];
        res.forEach((item) => {
          const SubMenuList = item.SubMenuList;
          arr.push(item);
          if (SubMenuList) {
            SubMenuList.forEach((item) => {
              arr.push(item);
            });
          }
        });
        return { items: arr, total: arr.length };
      },
    },
  },
  toolbarConfig: {
    custom: true,
    export: true,
    refresh: true,
    resizable: true,
    zoom: true,
  },
};

const [Grid, gridApi] = useVbenVxeGrid({ gridOptions });
const [BaseModal, sharedModalApi] = useVbenModal({
  connectedComponent: BaseDemo,
  onBeforeClose: () => {
    gridApi.query();
  },
});

const expandAll = () => {
  gridApi.grid?.setAllTreeExpand(true);
};

const collapseAll = () => {
  gridApi.grid?.setAllTreeExpand(false);
};

const handleAdd = () => {
  sharedModalApi.setData({
    edit: false,
  });
  sharedModalApi.open();
};

const handleEdit = (data: any) => {
  sharedModalApi.setData({
    edit: true,
    data,
  });
  sharedModalApi.open();
};

const handleDelete = async () => {
  const data = gridApi.grid.getCheckboxRecords(false);
  const IdArr = data.map((item) => item.Id).join(',');
  await postMenuDeleteApi({ IdArr });
  await gridApi.query();
  message.success($t('preferences.message.delete'));
};
</script>

<template>
  <Page>
    <Grid table-title="菜单列表" table-title-help="展开后才能选中下面的子集">
      <template #toolbar-tools>
        <div class="flex gap-2">
          <Button type="primary" @click="expandAll">
            {{ $t('preferences.button.expand') }}
          </Button>
          <Button type="primary" @click="collapseAll">
            {{ $t('preferences.button.fold') }}
          </Button>
          <Button type="primary" @click="handleAdd">
            {{ $t('preferences.button.add') }}
          </Button>
          <Button @click="handleDelete" type="primary" danger>
            {{ $t('preferences.button.delete') }}
          </Button>
        </div>
      </template>
      <template #icon="{ row }">
        <div class="flex justify-center">
          <IconifyIcon :icon="row.Icon_url" class="text-2xl" />
        </div>
      </template>
      <template #open="{ row }">
        <Switch v-model:checked="row.Is_lock" disabled />
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
