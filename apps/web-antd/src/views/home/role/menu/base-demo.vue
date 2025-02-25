<script lang="ts" setup>
import type { UserApi } from '#/api/core/user';

import { useVbenForm, useVbenModal } from '@vben/common-ui';

import { message } from 'ant-design-vue';

import { getMenuDetailApi, getMenuTopListApi, postMenuAddApi } from '#/api';

import { checkboxGroupData } from './table-data';

defineOptions({
  name: 'BaseDemo',
});

const [Form, formApi] = useVbenForm({
  commonConfig: {
    componentProps: {
      class: 'w-full',
    },
  },
  handleSubmit: onSubmit,
  layout: 'horizontal',
  schema: [
    {
      component: 'Input',
      defaultValue: 0,
      componentProps: {
        placeholder: '请输入',
      },
      disabled: true,
      fieldName: 'Id',
      label: 'Id',
    },
    {
      component: 'ApiSelect',
      componentProps: {
        afterFetch: (data: UserApi.menuTopListResult[]) => {
          return data.map((item) => ({
            label: item.Title,
            value: item.Id,
          }));
        },
        api: getMenuTopListApi,
        allowClear: true,
        filterOption: true,
        placeholder: '请选择',
        showSearch: true,
      },
      fieldName: 'parentId',
      label: '上级菜单',
      rules: 'required',
    },
    {
      component: 'InputNumber',
      componentProps: {
        placeholder: '请输入',
      },
      fieldName: 'sortId',
      label: '级别',
      rules: 'required',
    },
    {
      component: 'Switch',
      fieldName: 'isLock',
      defaultValue: false,
      label: '隐藏',
      componentProps: {
        class: 'w-min',
      },
      rules: 'required',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
      },
      fieldName: 'Name',
      label: '名称',
      rules: 'required',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
      },
      fieldName: 'Title',
      label: '标题',
      rules: 'required',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
      },
      fieldName: 'iconUrl',
      label: '图标',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
      },
      fieldName: 'linkUrl',
      label: '链接地址',
    },
    {
      component: 'CheckboxGroup',
      componentProps: {
        name: 'cname',
        options: checkboxGroupData,
      },
      fieldName: 'actionType',
      label: '权限',
      help: '当前拥有的查看权限',
      rules: 'selectRequired',
    },
  ],
  wrapperClass: 'grid-cols-1',
  resetButtonOptions: {
    content: '取消',
  },
  handleReset: () => {
    handleReset();
  },
});

const [Modal, modalApi] = useVbenModal({
  onCancel() {
    modalApi.close();
  },
  onClosed() {
    formApi.resetForm();
  },
  async onOpenChange(isOpen: boolean) {
    if (isOpen) {
      const { edit, data } = modalApi.getData<Record<string, any>>();
      if (!data || (!data.Id && !edit)) return;
      const res = await getMenuDetailApi({ Id: data.Id });
      formApi.setValues({
        Id: res.Id,
        parentId: res.Parent_id,
        sortId: res.Sort_id,
        isLock: res.Is_lock ? 1 : 0,
        Name: res.Name,
        Title: res.Title,
        iconUrl: res.Icon_url,
        linkUrl: res.Link_url,
        actionType: res.Action_type.split(','),
      });
    }
  },
  showCancelButton: false,
  showConfirmButton: false,
});

function handleReset() {
  modalApi.close();
}

async function onSubmit(values: Record<string, any>) {
  values.isLock = values.isLock ? 1 : 0;
  values.actionType = values.actionType.join(',');
  await postMenuAddApi(values as any);
  if (values.Id !== 0) {
    message.success('编辑成功');
    return;
  }
  message.success('添加成功');
  modalApi.close();
}
</script>
<template>
  <Modal class="w-[800px]" title="菜单详情" title-tooltip="添加编辑">
    <Form />
  </Modal>
</template>
