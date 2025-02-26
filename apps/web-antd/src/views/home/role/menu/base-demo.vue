<script lang="ts" setup>
import type { AdministratorApi } from '#/api';

import { reactive } from 'vue';

import { useVbenForm, useVbenModal } from '@vben/common-ui';

import { message } from 'ant-design-vue';

import { getMenuDetailApi, getMenuTopListApi, postMenuAddApi } from '#/api';
import { $t } from '#/locales';

defineOptions({
  name: 'BaseDemoMenu',
});

const checkboxGroupData = reactive([
  {
    label: $t('user.checkbox.show'),
    value: 'Show',
  },
  {
    label: $t('user.checkbox.view'),
    value: 'View',
  },
  {
    label: $t('user.checkbox.add'),
    value: 'Add',
  },
  {
    label: $t('user.checkbox.edit'),
    value: 'Edit',
  },
  {
    label: $t('user.checkbox.delete'),
    value: 'Delete',
  },
  {
    label: $t('user.checkbox.audit'),
    value: 'Audit',
  },
]);

const [Form, formApi] = useVbenForm({
  commonConfig: {
    componentProps: {
      class: 'w-full',
    },
  },

  layout: 'horizontal',
  schema: [
    {
      component: 'Input',
      defaultValue: 0,
      disabled: true,
      fieldName: 'Id',
      label: 'Id',
    },
    {
      component: 'ApiSelect',
      componentProps: {
        afterFetch: (data: AdministratorApi.menuTopListResult[]) => {
          return data.map((item) => ({
            label: item.Title,
            value: item.Id,
          }));
        },
        api: getMenuTopListApi,
        allowClear: true,
        filterOption: true,
        showSearch: true,
      },
      fieldName: 'parentId',
      label: $t('user.menu.superiors'),
      rules: 'required',
    },
    {
      component: 'InputNumber',
      fieldName: 'sortId',
      label: $t('user.menu.level'),
      rules: 'required',
    },
    {
      component: 'Switch',
      fieldName: 'isLock',
      defaultValue: false,
      label: $t('user.menu.hide'),
      componentProps: {
        class: 'w-min',
      },
    },
    {
      component: 'Input',
      fieldName: 'Name',
      label: $t('user.menu.name'),
      rules: 'required',
    },
    {
      component: 'Input',

      fieldName: 'Title',
      label: $t('preferences.title'),
      rules: 'required',
    },
    {
      component: 'Input',

      fieldName: 'iconUrl',
      label: $t('user.menu.icon'),
    },
    {
      component: 'Input',
      fieldName: 'linkUrl',
      label: $t('user.menu.link'),
    },
    {
      component: 'CheckboxGroup',
      componentProps: {
        name: 'cname',
        options: checkboxGroupData,
      },
      fieldName: 'actionType',
      label: $t('user.menu.limits'),
      help: $t('user.tips.help'),
      rules: 'selectRequired',
    },
  ],
  wrapperClass: 'grid-cols-1',
  submitButtonOptions: {
    show: false,
  },
  resetButtonOptions: {
    show: false,
  },
});

const [Modal, modalApi] = useVbenModal({
  onCancel() {
    modalApi.close();
  },
  async onConfirm() {
    const { valid } = await formApi.validate();
    if (!valid) return;
    const formData = await formApi.getValues();
    formData.isLock = formData.isLock ? 1 : 0;
    formData.actionType = formData.actionType.join(',');
    await postMenuAddApi(formData as any);
    if (formData.Id === 0) {
      message.success($t('preferences.message.add'));
    } else {
      message.success($t('preferences.message.edit'));
    }
    modalApi.close();
  },
  async onOpened() {
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
  },
  onClosed() {
    formApi.resetForm();
  },

  showCancelButton: true,
  showConfirmButton: true,
});
</script>
<template>
  <Modal
    class="w-[800px]"
    :title="$t('user.tips.menu')"
    :title-tooltip="$t('user.tips.menu_tips')"
  >
    <Form />
  </Modal>
</template>
