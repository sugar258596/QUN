<script lang="ts" setup>
import type { VbenFormProps } from '@vben/common-ui';

import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { UserApi } from '#/api';

import { Page } from '@vben/common-ui';

import { Image, Switch, Tag } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { getUserList } from '#/api';

import { formSchema, tableColumns } from './data';

const formOptions: VbenFormProps = {
  collapsed: false,
  wrapperClass: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-3',
  schema: formSchema,
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
  columns: tableColumns,
  exportConfig: {},
  height: 'auto',
  keepSource: true,
  pagerConfig: {},
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues) => {
        const res = await getUserList({
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
          {{ row.IsRealName === 0 ? '已认证' : '未认证' }}
        </Tag>
      </template>
      <template #puls="{ row }">
        <Tag :color="row.IsPlus === 0 ? '#87d068' : 'warning'">
          {{ row.IsPlus === 0 ? 'PLUS 会员' : '普通用户' }}
        </Tag>
      </template>
      <template #sex="{ row }">
        <Tag :color="row.Sex === 0 ? 'cyan' : 'magenta'">
          {{ row.Sex === 0 ? '男' : '女' }}
        </Tag>
      </template>
      <template #code="{ row }">
        <Tag color="purple">{{ row.UserCode }}</Tag>
      </template>
      <template #status="{ row }">
        <Switch v-model:checked="row.Status" disabled />
      </template>
    </Grid>
    <BaseModal />
  </Page>
</template>
