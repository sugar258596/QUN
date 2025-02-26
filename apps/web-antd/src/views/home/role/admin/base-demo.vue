<script lang="ts" setup>
import type { AdministratorApi } from '#/api';

import { useVbenForm, useVbenModal, z } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { message } from 'ant-design-vue';

import { getAdminDetailApi, getRoleTypeListApi, postAdminAddApi } from '#/api';

defineOptions({
  name: 'BaseDemoAdmin',
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
      component: 'ApiSelect',
      componentProps: {
        afterFetch: (data: AdministratorApi.roleTypeListResult[]) => {
          return data.map((item) => ({
            label: item.Name,
            value: item.Id,
          }));
        },
        api: getRoleTypeListApi,
      },
      fieldName: 'roleId',
      label: $t('preferences.type.role'),
      rules: 'selectRequired',
    },
    {
      component: 'Input',
      fieldName: 'userName',
      label: $t('authentication.username'),
      rules: 'required',
    },
    {
      component: 'Switch',
      defaultValue: false,
      fieldName: 'isLock',
      label: $t('user.lock'),
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
      fieldName: 'MobileCountryCode',
      label: $t('user.nation'),
      rules: 'required',
    },
    {
      component: 'VbenInput',
      fieldName: 'mobile',
      label: $t('preferences.user.phone'),
      rules: z
        .string()
        .min(1, { message: $t('authentication.mobileTip') })
        .refine((v) => /^\d{11}$/.test(v), {
          message: $t('authentication.mobileErrortip'),
        }),
    },
    {
      component: 'Input',
      fieldName: 'realName',
      label: $t('preferences.user.name'),
    },
    {
      component: 'Input',

      fieldName: 'email',
      label: $t('authentication.email'),
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
    const { valid } = await formApi.validate();
    if (!valid) return;
    const formData = await formApi.getValues();
    await postAdminAddApi(formData as any);
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
    handleChange(data.Id);
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
</script>
<template>
  <Modal
    class="w-[800px]"
    :title="$t('user.tips.admin')"
    :title-tooltip="$t('user.tips.admin_tips')"
  >
    <Form />
  </Modal>
</template>
