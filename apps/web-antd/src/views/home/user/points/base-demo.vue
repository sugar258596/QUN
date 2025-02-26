<script lang="ts" setup>
import type { PointsApi } from '#/api';

import { useVbenForm, useVbenModal } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { message } from 'ant-design-vue';

import { getPointsDetail, postPointsCheck } from '#/api';

defineOptions({
  name: 'BaseDemoPoints',
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
    await postPointsCheck(formData as any);
    message.success($t('preferences.message.examine'));
    modalApi.close();
  },
  async onOpened() {
    const { edit, data } = modalApi.getData<Record<string, any>>();
    modalApi.setState({
      title: edit ? $t('service.points.details') : $t('service.points.examine'),
      titleTooltip: edit
        ? $t('service.points.details')
        : $t('service.tips.examine'),
    });
    if (!data || !data.Id) return;
    const res = await getPointsDetail({ Id: data.Id });
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
async function handleEdit(data: PointsApi.PointsDetailDetailResult) {
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

async function handleDetails(data: PointsApi.PointsDetailDetailResult) {
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
      fieldName: 'Mobile',
      label: $t('preferences.user.phone'),
      disabled: true,
      defaultValue: '',
    },
    {
      component: 'Input',
      fieldName: 'ScoreProductId',
      label: $t('service.points.id'),
      disabled: true,
      defaultValue: '',
    },
    {
      component: 'Input',
      fieldName: 'ScoreProductTitle',
      label: $t('service.points.title'),
      disabled: true,
      defaultValue: '',
    },
    {
      component: 'Input',
      fieldName: 'Consignee',
      label: $t('service.address.name'),
      disabled: true,
      defaultValue: '',
    },
    {
      component: 'Input',
      fieldName: 'AreaText',
      label: $t('service.address.area'),
      disabled: true,
      defaultValue: '',
    },

    {
      component: 'Input',
      fieldName: 'Address',
      label: $t('service.address.detail'),
      disabled: true,
      defaultValue: '',
    },

    {
      component: 'Input',
      fieldName: 'Remark',
      label: $t('service.remark'),
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
    MemberId: data.MemberId,
    UserNick: data.UserNick,
    Avatar: data.Avatar,
    Mobile: data.Mobile,
    ScoreProductId: data.ScoreProductId,
    ScoreProductTitle: data.ScoreProductTitle,
    Consignee: data.Consignee,
    AreaText: data.AreaText,
    Address: data.Address,
    Remark: data.Remark,
    Status: data.Status,
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
