<script lang="ts" setup>
import { useVbenForm, useVbenModal } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { message } from 'ant-design-vue';

import { UpdateCustomerApply } from '#/api';

defineOptions({
  name: 'BaseDemoApplication',
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
      component: 'Switch',
      fieldName: 'Status',
      defaultValue: 2,
      componentProps: {
        class: 'w-min',
        checkedValue: 0,
        unCheckedValue: 2,
      },
      label: $t('preferences.status.type'),
    },
    {
      component: 'Input',
      fieldName: 'Keywords',
      label: $t('service.remark'),
    },
  ],
  submitButtonOptions: {
    show: false,
  },
  resetButtonOptions: {
    show: false,
  },
  handleReset: onReset,
  wrapperClass: 'grid-cols-1',
});

const [Modal, modalApi] = useVbenModal({
  onCancel() {
    modalApi.close();
  },
  async onConfirm() {
    const formData = await formApi.getValues();
    await UpdateCustomerApply(formData as any);
    message.success($t('preferences.message.edit'));
    modalApi.close();
  },
  onClosed() {
    formApi.resetForm();
    modalApi.setData({
      edit: true,
    });
  },
  async onOpened() {
    const { edit, data } = modalApi.getData<Record<string, any>>();
    if (!data || (!data.Id && !edit)) return;

    formApi.setState((prev) => {
      prev.schema?.forEach((item) => {
        item.disabled = data.Status !== 1;
      });
      return {
        schema: [...(prev?.schema ?? [])],
      };
    });
    formApi.setValues({
      Id: data.Id,
      Status: data.Status,
    });
    modalApi.setState({
      showConfirmButton: data.Status === 1,
    });
  },
  showCancelButton: true,
  showConfirmButton: true,
});

function onReset() {
  modalApi.close();
}
</script>
<template>
  <Modal class="w-[800px]" :title="$t('preferences.button.examine')">
    <Form />
  </Modal>
</template>
