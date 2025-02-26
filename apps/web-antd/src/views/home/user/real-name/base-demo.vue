<script lang="ts" setup>
import type { RealNameApi } from '#/api';

import { useVbenForm, useVbenModal } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { message } from 'ant-design-vue';

import { getRealNameDetail, postRealNameCheck } from '#/api';

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
    await postRealNameCheck(formData as any);
    message.success($t('preferences.message.examine'));
    modalApi.close();
  },
  async onOpened() {
    const { edit, data } = modalApi.getData<Record<string, any>>();
    modalApi.setState({
      title: edit ? $t('user.real.details') : $t('user.real.examine'),
      titleTooltip: edit ? $t('user.real.details') : $t('service.tips.examine'),
    });
    if (!data || !data.Id) return;
    const res = await getRealNameDetail({ Id: data.Id });
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
async function handleEdit(data: RealNameApi.RealNameListResult) {
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

async function handleDetails(data: RealNameApi.RealNameListResult) {
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
      disabled: true,
      defaultValue: '',
    },
    {
      component: 'Input',
      fieldName: 'UserNick',
      label: $t('preferences.user.nick'),
      disabled: true,
      defaultValue: ' ',
    },
    {
      component: 'CellImage',
      fieldName: 'Avatar',
      componentProps: {
        width: 100,
        height: 100,
      },
      label: $t('preferences.user.avatar'),
      disabled: true,
      defaultValue: '',
    },
    {
      component: 'Input',
      fieldName: 'Name',
      label: $t('preferences.user.name'),
      disabled: true,
      defaultValue: '',
    },
    {
      component: 'Select',
      componentProps: {
        options: [
          {
            label: $t('preferences.user.sex.male'),
            value: 0,
          },
          {
            label: $t('preferences.user.sex.male'),
            value: 1,
          },
        ],
      },
      fieldName: 'Sex',
      label: $t('preferences.user.sex.type'),
      disabled: true,
      defaultValue: '',
    },
    {
      component: 'Input',
      fieldName: 'CountryCode',
      label: $t('service.nation'),
      disabled: true,
      defaultValue: '',
    },
    {
      component: 'Input',
      fieldName: 'IDnumber',
      label: $t('user.identity'),
      disabled: true,
      defaultValue: '',
    },
    {
      component: 'Input',
      fieldName: 'ReviewComments',
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
      component: 'Upload',
      defaultValue: [],
      componentProps: {
        listType: 'picture-card',
        disabled: true,
      },
      fieldName: 'AdditionalInfo',
      label: $t('service.certificate'),
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
    Name: data.Name,
    Sex: data.Sex,
    CountryCode: data.CountryCode,
    IDnumber: data.IDnumber,
    ReviewComments: data.ReviewComments,
    Status: data.Status,
    AdditionalInfo: data.AdditionalInfo.map((item) => {
      return {
        url: item,
      };
    }),
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
