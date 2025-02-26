<script lang="ts" setup>
import { useVbenForm, useVbenModal } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { getUserFlowDetail } from '#/api';

defineOptions({
  name: 'BaseDemo',
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
      fieldName: 'MemberId',
      label: $t('preferences.user.id'),
      defaultValue: '',
      disabled: true,
    },
    {
      component: 'Input',
      fieldName: 'UserNick',
      label: $t('preferences.user.nick'),
      defaultValue: '',
      disabled: true,
    },
    {
      component: 'CellImage',

      componentProps: {
        width: 100,
        height: 100,
      },
      fieldName: 'Avatar',
      label: $t('preferences.user.avatar'),
      defaultValue: '',
      disabled: true,
    },
    {
      component: 'Input',
      fieldName: 'WalletType',
      label: $t('preferences.type.account'),
      defaultValue: '',
      disabled: true,
    },
    {
      component: 'Input',
      fieldName: 'TitleType',
      label: $t('wallet.title'),
      defaultValue: '',
      disabled: true,
    },
    {
      component: 'Input',
      fieldName: 'OrderNo',
      label: $t('preferences.order.no'),
      defaultValue: '',
      disabled: true,
    },
    {
      component: 'Input',
      fieldName: 'SourceType',
      label: $t('preferences.type.source'),
      defaultValue: '',
      disabled: true,
    },
    {
      component: 'Input',
      fieldName: 'Before',
      label: $t('wallet.before'),
      defaultValue: '',
      disabled: true,
    },
    {
      component: 'Input',
      fieldName: 'After',
      label: $t('wallet.after'),
      defaultValue: '',
      disabled: true,
    },
    {
      component: 'Input',
      fieldName: 'Change',
      label: $t('wallet.change'),
      defaultValue: '',
      disabled: true,
    },
    {
      component: 'Input',
      fieldName: 'SourceUserId',
      label: $t('wallet.source'),
      defaultValue: '',
      disabled: true,
    },
    {
      component: 'Input',
      fieldName: 'Note',
      label: $t('wallet.identification'),
      defaultValue: '',
      disabled: true,
    },
    {
      component: 'Input',
      fieldName: 'Remark',
      label: $t('wallet.remark'),
      defaultValue: '',
      disabled: true,
    },

    {
      component: 'Input',
      fieldName: 'AddTime',
      label: $t('preferences.time.add'),
      defaultValue: '',
      disabled: true,
    },
    {
      component: 'Select',
      componentProps: {
        options: [
          {
            label: $t('preferences.status.0'),
            value: 0,
          },
          {
            label: $t('preferences.status.1'),
            value: 1,
          },
          {
            label: $t('preferences.status.99'),
            value: 99,
          },
        ],
      },
      fieldName: 'WalletStatus',
      label: $t('preferences.status.type'),
      defaultValue: 0,
      disabled: true,
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
  onConfirm() {
    const { edit, data } = modalApi.getData<Record<string, any>>();
    if (!data || (!data.Id && !edit)) return;
    handleChange(data.Id);
    modalApi.close();
  },
  onClosed() {
    formApi.resetForm();
    modalApi.setData({
      edit: true,
    });
  },
  showCancelButton: true,
  showConfirmButton: true,
});

async function handleChange(Id: number) {
  const res = await getUserFlowDetail({ Id });
  formApi.setValues({
    Id: res.Id,
    MemberId: res.MemberId,
    UserNick: res.UserNick,
    Avatar: res.Avatar,
    WalletType: res.WalletType,
    TitleType: res.TitleType,
    OrderNo: res.OrderNo,
    SourceType: res.SourceType,
    Before: res.Before,
    After: res.After,
    Change: res.Change,
    Note: res.Note,
    SourceUserId: res.SourceUserId,
    WalletStatus: res.WalletStatus,
    AddTime: res.AddTime,
    Remark: res.Remark,
  });
}
function onReset() {
  modalApi.close();
}
</script>
<template>
  <Modal class="w-[800px]" title="消息管理" title-tooltip="添加编辑">
    <Form />
  </Modal>
</template>
