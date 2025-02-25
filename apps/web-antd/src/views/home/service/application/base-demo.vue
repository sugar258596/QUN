<script lang="ts" setup>
import type { ServiceApi, SystemApi } from '#/api';

import { useVbenForm, useVbenModal } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { message } from 'ant-design-vue';

import { GetCustomerDetail, GetSelectCountryList, UpdateCustomer } from '#/api';

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
    const { edit } = modalApi.getData<Record<string, any>>();
    if (edit) return;
    const formData = await formApi.getValues();
    await UpdateCustomer(formData as any);
    message.success($t('preferences.message.edit'));
    modalApi.close();
  },
  async onOpened() {
    const { edit, data } = modalApi.getData<Record<string, any>>();
    modalApi.setState({
      title: edit ? $t('service.model.details') : $t('service.model.eidt'),
    });
    if (!data || !data.Id) return;
    const res = await GetCustomerDetail({ Id: data.Id });
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
async function handleEdit(data: ServiceApi.GetCustomerApplyListResult) {
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
      fieldName: 'Name',
      label: $t('preferences.user.name'),
      defaultValue: '',
    },
    {
      component: 'ApiSelect',
      componentProps: {
        afterFetch: (data: SystemApi.GetSeleteListResult[]) => {
          return data.map((item) => ({
            label: item.CountryName,
            value: item.Id,
          }));
        },
        api: GetSelectCountryList,
      },
      fieldName: 'CountryId',
      label: $t('service.location'),
    },
    {
      component: 'Input',
      fieldName: 'Mobile',
      label: $t('preferences.user.phone'),
      defaultValue: '',
    },
    {
      component: 'Input',
      fieldName: 'Email',
      label: $t('preferences.user.email'),
      defaultValue: '',
    },
    {
      component: 'Input',
      fieldName: 'Remark',
      label: $t('service.remark'),
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
    },
  ];
  formApi.setState((prev) => {
    return {
      schema: [...(prev?.schema ?? []), ...schemas],
    };
  });
  formApi.setValues({
    Id: data.Id,
    UserNick: data.UserNick,
    Name: data.Name,
    CountryId: data.CountryId,
    Mobile: data.Mobile,
    Email: data.Email,
    Type: data.Type,
    Status: data.Status,
  });
}

async function handleDetails(data: ServiceApi.GetCustomerApplyListResult) {
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
      component: 'Input',
      fieldName: 'CountryName',
      label: $t('service.nation'),
      disabled: true,
      defaultValue: '',
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
      fieldName: 'Email',
      label: $t('preferences.user.email'),
      disabled: true,
      defaultValue: '',
    },
    {
      component: 'Select',
      componentProps: {
        options: [
          {
            label: $t('service.customer.0'),
            value: 0,
          },
          {
            label: $t('service.customer.1'),
            value: 1,
          },
        ],
      },
      fieldName: 'Type',
      label: $t('service.type'),
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
    Name: data.Name,
    Sex: data.Sex,
    CountryName: data.CountryName,
    Mobile: data.Mobile,
    Email: data.Email,
    Type: data.Type,
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
