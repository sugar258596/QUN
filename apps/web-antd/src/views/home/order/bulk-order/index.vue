<script lang="ts" setup>
import type { VbenFormProps } from '@vben/common-ui';

import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import { Page } from '@vben/common-ui';

import { Button } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { getExampleTableApi2 } from '#/api';

import { formSchema, tableColumns } from './data';

interface RowType {
  orderNumber: string; // 订单号
  category: string; // 分类
  destinationCountry: string; // 目的国家
  destinationCity: string; // 目的城市
  customerCode: string; // 客户码
  batchNumber: string; // 批号
  deliveryInfo: string; // 收货信息
  shippingMethod: string; // 运输方式
  unpackingInspection: string; // 开箱检查
  woodenCrate: string; // 打木架/木箱
  insuranceValue: number; // 保险保价
  weight: number; // 重量
  freight: number; // 运费
  paymentMethod: string; // 支付方式
  orderStatus: string; // 订单状态
}

const formOptions: VbenFormProps = {
  // 默认展开
  collapsed: false,
  wrapperClass: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  schema: formSchema,
  // 控制表单是否显示折叠按钮
  showCollapseButton: false,
  submitButtonOptions: {
    content: '查询',
  },
  resetButtonOptions: {
    content: '添加',
  },

  // 是否在字段值改变时提交表单
  submitOnChange: false,
  // 按下回车时是否提交表单
  submitOnEnter: false,
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
        return await getExampleTableApi2({
          page: page.currentPage,
          pageSize: page.pageSize,
          ...formValues,
        });
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

const handleEdit = (_date: any) => {};
</script>

<template>
  <Page auto-content-height>
    <Grid>
      <template #action="{ row }">
        <div>
          <Button type="link">编辑</Button>
          <Button type="link" @click="handleEdit(row)">编辑</Button>
        </div>
      </template>
    </Grid>
  </Page>
</template>
