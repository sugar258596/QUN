<script lang="ts" setup>
import { useVbenForm, useVbenModal } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { message } from 'ant-design-vue';

import { PostCountry } from '#/api';

defineOptions({
  name: 'BaseDemoCountry',
});

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
      component: 'Input',
      fieldName: 'CountryName',
      label: $t('system.tips'),
      rules: 'required',
    },
    {
      component: 'Select',
      componentProps: {
        options: [
          { label: $t('system.country.0'), value: 0 },
          { label: $t('system.country.1'), value: 1 },
        ],
      },
      fieldName: 'Type',
      label: $t('preferences.type.type'),
      rules: 'selectRequired',
    },
  ],
  submitButtonOptions: {
    show: false,
  },
  resetButtonOptions: {
    show: false,
  },
  wrapperClass: 'grid-cols-1',
});

const [Modal, modalApi] = useVbenModal({
  onCancel() {
    modalApi.close();
  },
  async onConfirm() {
    const { edit } = modalApi.getData<Record<string, any>>();
    const formData = await formApi.getValues();
    await PostCountry(formData as any);
    message.success(
      edit ? $t('preferences.message.edit') : $t('preferences.message.add'),
    );
    modalApi.close();
  },
  async onOpened() {
    const { edit, data } = modalApi.getData<Record<string, any>>();
    if (!data || (!data.Id && !edit)) return;
    formApi.setValues({
      Id: data.Id,
      CountryName: data.CountryName,
      Type: data.Type,
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
  <Modal class="w-[800px]" title="管理员" title-tooltip="添加编辑">
    <Form />
  </Modal>
</template>
