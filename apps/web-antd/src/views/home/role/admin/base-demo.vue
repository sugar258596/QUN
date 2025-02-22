<script lang="ts" setup>
import type { SystemApi } from '#/api/core/system';

import { useVbenForm, useVbenModal, z } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { message } from 'ant-design-vue';

import {
  getAdminDetailApi,
  getRoleTypeListApi,
  postAdminAddApi,
} from '#/api/core/system';

defineOptions({
  name: 'BaseDemo',
});

const [Modal, modalApi] = useVbenModal({
  onCancel() {
    modalApi.close();
  },
  onClosed() {
    beforeClose();
  },
  async onOpenChange(isOpen: boolean) {
    if (isOpen) {
      const { edit, data } = modalApi.getData<Record<string, any>>();
      if (!data || (!data.Id && !edit)) return;
      handleChange(data.Id);
    }
  },
  showCancelButton: false,
  showConfirmButton: false,
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
        afterFetch: (data: SystemApi.roleTypeListResult[]) => {
          return data.map((item) => ({
            label: item.Name,
            value: item.Id,
          }));
        },
        api: getRoleTypeListApi,
      },
      fieldName: 'roleId',
      label: '角色类型',
      rules: 'selectRequired',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
      },
      fieldName: 'userName',
      label: $t('authentication.username'),
      rules: 'required',
    },
    {
      component: 'Switch',
      defaultValue: false,
      fieldName: 'isLock',
      label: '锁定账户',
      componentProps: {
        class: 'w-min',
      },
    },
    {
      component: 'InputPassword',
      componentProps: {
        placeholder: $t('authentication.password'),
      },
      fieldName: 'password',
      label: $t('authentication.password'),
      rules: z.string().min(1, { message: $t('authentication.passwordTip') }),
    },
    {
      component: 'VbenInputPassword',
      componentProps: {
        placeholder: $t('authentication.confirmPassword'),
      },
      dependencies: {
        rules(values) {
          const { password } = values;
          return z
            .string({ required_error: $t('authentication.passwordTip') })
            .min(1, { message: $t('authentication.passwordTip') })
            .refine((value) => value === password, {
              message: $t('authentication.confirmPasswordTip'),
            });
        },
        triggerFields: ['password'],
      },
      fieldName: 'usePassword',
      label: $t('authentication.confirmPassword'),
    },
    {
      component: 'InputNumber',
      componentProps: {
        placeholder: '请输入',
      },
      fieldName: 'MobileCountryCode',
      label: '国家码',
      rules: 'required',
    },
    {
      component: 'VbenInput',
      componentProps: {
        placeholder: '请输入',
      },
      fieldName: 'mobile',
      label: '手机号',
      rules: z
        .string()
        .min(1, { message: $t('authentication.mobileTip') })
        .refine((v) => /^\d{11}$/.test(v), {
          message: $t('authentication.mobileErrortip'),
        }),
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
      },
      fieldName: 'realName',
      label: '姓名',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
      },
      fieldName: 'email',
      label: $t('authentication.email'),
    },
  ],
  resetButtonOptions: {
    content: '取消',
  },
  handleReset: onReset,
  wrapperClass: 'grid-cols-1',
});

function beforeClose() {
  formApi.resetForm();
  modalApi.setData({
    edit: true,
  });
}

async function handleChange(Id: number) {
  const res = await getAdminDetailApi({ Id });
  formApi.setValues({
    Id: res.Id,
    roleId: res.Role_id,
    userName: res.Username,
    isLock: res.Is_lock ? 1 : 0,
    mobile: res.Mobile,
    MobileCountryCode: res.MobileCountryCode,
    email: res.Email,
    realName: res.Realname,
  });
}
function onReset() {
  modalApi.close();
}

async function onSubmit(values: Record<string, any>) {
  values.isLock = values.isLock ? 1 : 0;
  await postAdminAddApi(values as any);
  if (values.Id !== 0) {
    message.success('编辑成功');
    return;
  }
  message.success('添加成功');
  modalApi.close();
}
</script>
<template>
  <Modal class="w-[800px]" title="管理员" title-tooltip="添加编辑">
    <Form />
  </Modal>
</template>
