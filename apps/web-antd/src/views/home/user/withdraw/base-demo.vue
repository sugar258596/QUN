<script lang="ts" setup>
import type { WithdrawApi } from '#/api';

import { useVbenForm, useVbenModal } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { message } from 'ant-design-vue';

import { getWithdrawDetail, postWithdrawCheck } from '#/api';

defineOptions({
  name: 'BaseDemoConsumption',
});

const [Form, formApi] = useVbenForm({
  commonConfig: {
    componentProps: {
      class: 'w-full',
    },
  },
  layout: 'horizontal',
  schema: [],
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
    const { valid } = await formApi.validate();
    if (!valid) return;
    const { edit } = modalApi.getData<Record<string, any>>();
    if (edit) return;
    const formData = await formApi.getValues();
    await postWithdrawCheck(formData as any);
    message.success($t('preferences.message.examine'));
    modalApi.close();
  },
  async onOpened() {
    const { edit, data } = modalApi.getData<Record<string, any>>();
    modalApi.setState({
      title: edit
        ? $t('service.withdrawal.details')
        : $t('service.withdrawal.examine'),
      titleTooltip: edit
        ? $t('service.withdrawal.details')
        : $t('service.tips.examine'),
    });
    if (!data || !data.Id) return;
    const res = await getWithdrawDetail({ Id: data.Id });
    if (edit) {
      handleDetails(res);
    } else {
      handleEdit(res);
    }
  },
  onClosed() {
    formApi.resetForm();
    formApi.setState(() => {
      return {
        schema: [],
      };
    });
  },
  showCancelButton: true,
  showConfirmButton: true,
});
async function handleEdit(data: WithdrawApi.WithdrawDetail) {
  const schemas = [
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
      disabled: data.Status !== 1,
      label: $t('preferences.status.type'),
    },
    {
      component: 'Input',
      fieldName: 'Keywords',
      defaultValue: '',
      disabled: data.Status !== 1,
      label: $t('service.remark'),
    },
  ];
  formApi.setState((prev) => {
    return {
      schema: [...(prev?.schema ?? []), ...schemas],
    };
  });
  formApi.setValues({
    Id: data.Id,
    Status: data.Status,
  });
}

async function handleDetails(data: WithdrawApi.WithdrawDetail) {
  const schemas = [
    {
      component: 'Input',
      defaultValue: 0,
      disabled: true,
      fieldName: 'Id',
      label: 'Id',
    },
    {
      component: 'Input',
      fieldName: 'OrderNo',
      label: $t('preferences.order.no'),
      disabled: true,
      defaultValue: ' ',
    },
    {
      component: 'Input',
      fieldName: 'BankCardNumber',
      label: $t('service.bank.card'),
      disabled: true,
      defaultValue: ' ',
    },
    {
      component: 'Input',
      fieldName: 'CardName',
      label: $t('service.bank.name'),
      disabled: true,
      defaultValue: ' ',
    },

    {
      component: 'Input',
      fieldName: 'RealName',
      label: $t('preferences.user.name'),
      disabled: true,
      defaultValue: '',
    },
    {
      component: 'Input',
      fieldName: 'PhoneNumber',
      label: $t('preferences.user.phone'),
      disabled: true,
      defaultValue: '',
    },

    {
      component: 'Select',
      componentProps: {
        options: [
          {
            label: $t('service.withdrawal.0'),
            value: 0,
          },
          {
            label: $t('service.withdrawal.1'),
            value: 1,
          },
          {
            label: $t('service.withdrawal.2'),
            value: 2,
          },
        ],
      },
      fieldName: 'Type',
      label: $t('service.withdrawal.type'),
      disabled: true,
      defaultValue: '',
    },

    {
      component: 'Input',
      fieldName: 'Amount',
      label: $t('service.withdrawal.amount'),
      disabled: true,
      defaultValue: '',
    },
    {
      component: 'Select',
      componentProps: {
        options: [
          {
            label: $t('service.customer.1'),
            value: 1,
          },
          {
            label: $t('user.plus.no'),
            value: 0,
          },
        ],
      },
      fieldName: 'IsAgency',
      label: $t('preferences.type.user'),
      disabled: true,
      defaultValue: '',
    },
    {
      component: 'Select',
      componentProps: {
        options: [
          {
            label: $t('service.examine.0'),
            value: 0,
          },
          {
            label: $t('service.examine.1'),
            value: 1,
          },
          {
            label: $t('service.examine.2'),
            value: 2,
          },
        ],
      },
      fieldName: 'Status',
      label: $t('service.examine.type'),
      disabled: true,
      defaultValue: '',
    },
    {
      component: 'Upload',
      defaultValue: [],
      componentProps: {
        listType: 'picture-card',
        disabled: true,
      },
      fieldName: 'CollectionCode',
      label: $t('service.bank.code'),
    },
    {
      component: 'Input',
      fieldName: 'AddTime',
      label: $t('preferences.time.apply'),
      disabled: true,
    },
    {
      component: 'Input',
      fieldName: 'UpdateTime',
      label: $t('preferences.time.audit'),
      disabled: true,
      defaultValue: '',
    },
  ];
  formApi.setState((prev) => {
    return {
      schema: [...(prev?.schema ?? []), ...schemas],
    };
  });

  formApi.setValues({
    Id: data.Id,

    OrderNo: data.OrderNo,
    BankCardNumber: data.BankCardNumber,
    CardName: data.CardName,
    RealName: data.RealName,
    PhoneNumber: data.PhoneNumber,
    Type: data.Type,
    Amount: data.Amount,
    IsAgency: data.IsAgency,
    Status: data.Status,
    CollectionCode: [
      {
        url: data.CollectionCode,
      },
    ],
    AddTime: data.AddTime,
    UpdateTime: data.UpdateTime,
  });
}
function onReset() {
  modalApi.close();
}
</script>
<template>
  <Modal class="w-[800px]">
    <Form />
  </Modal>
</template>
