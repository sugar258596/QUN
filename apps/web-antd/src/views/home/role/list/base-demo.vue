<script lang="ts" setup>
import type { AdministratorApi } from '#/api';

import { reactive } from 'vue';

import { useVbenForm, useVbenModal } from '@vben/common-ui';

import { message } from 'ant-design-vue';

import {
  getRoleAuthorityApi,
  getRoleDetailApi,
  getRoleTypeListApi,
  postRoleAddApi,
} from '#/api';
import { $t } from '#/locales';

defineOptions({
  name: 'BaseDemo',
});

interface CheckboxGroupOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SchemaResult {
  component: string;
  componentProps: {
    name: string;
    options: CheckboxGroupOption[];
  };
  fieldName: string;
  label: string;
}

const arr = new Set(['Id', 'roleName', 'roleType']);

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
        afterFetch: (data: AdministratorApi.roleTypeListResult[]) => {
          return data.map((item) => ({
            label: item.Name,
            value: item.Id,
          }));
        },
        api: getRoleTypeListApi,
      },
      fieldName: 'roleType',
      label: $t('user.role.type'),
      rules: 'selectRequired',
    },
    {
      component: 'Input',
      fieldName: 'roleName',
      label: $t('user.role.name'),
      rules: 'required',
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
    const values = await formApi.getValues();
    const authArr: any[] = [];
    const { Id, roleName, roleType, ...data } = values;
    for (const key in data) {
      if (!data[key]) continue;
      const obj = {
        Name: key,
        ActionType: data[key]?.join(','),
      };
      authArr.push(obj);
    }
    const formData = {
      Id,
      roleName,
      roleType,
      authorityJson: JSON.stringify(authArr),
    };
    await postRoleAddApi(formData as any);
    if (values.Id === 0) {
      message.success($t('preferences.message.add'));
    } else {
      message.success($t('preferences.message.edit'));
    }
    modalApi.close();
  },
  async onOpened() {
    const { edit, data } = modalApi.getData<Record<string, any>>();
    if (!data || (!data.Id && !edit)) {
      handleSetState();
      return;
    }
    handleChange(data.Id);
  },
  onClosed() {
    modalApi.setData({
      edit: true,
    });

    formApi.resetForm();
    formApi.setState((prev) => {
      return {
        schema: prev.schema?.filter((item) => arr.has(item.fieldName)),
      };
    });
  },
  showCancelButton: true,
  showConfirmButton: true,
});

async function handleChange(Id: number) {
  const res = await getRoleDetailApi({ Id });
  const values = transformValue(res.RoleList);
  formApi.setValues({
    Id: res.Id,
    roleType: res.Role_type,
    roleName: res.Role_name,
    ...values,
  });
}

async function handleSetState() {
  const res = await getRoleAuthorityApi();
  const ids = transformData(res);
  formApi.setState((prev) => {
    return {
      schema: [...(prev?.schema ?? []), ...ids],
    };
  });
}

function transformData(
  data: AdministratorApi.roleAuthorityResult[],
): SchemaResult[] {
  const stateData: SchemaResult[] = [];
  traverseData(data, stateData);
  return stateData;
}

function transformValue(
  data: AdministratorApi.roleAuthorityResult[],
): Record<string, string[]> {
  const stateData: Record<string, string[]> = {};
  traverseValue(data, stateData);
  return stateData;
}

function traverseData(
  items: AdministratorApi.roleAuthorityResult[],
  stateData: SchemaResult[],
): void {
  for (const item of items) {
    const options = getCheckboxGroupOptions(item.Action_type);
    stateData.push(createSchema(item, options));
    if (item.SubRoleList && item.SubRoleList.length > 0) {
      traverseData(item.SubRoleList, stateData);
    }
  }
}

function traverseValue(
  items: AdministratorApi.roleAuthorityResult[],
  stateData: Record<string, string[]>,
): void {
  for (const item of items) {
    if (item.Name) {
      stateData[item.Name] = getActionTypes(item.Admin_ActionType);
      const options = getCheckboxGroupOptions(item.Action_type);
      updateFormSchema(item, options);
    }
    if (item.SubRoleList && item.SubRoleList.length > 0) {
      traverseValue(item.SubRoleList, stateData);
    }
  }
}

function getActionTypes(actionTypeString?: string): string[] {
  return (
    actionTypeString
      ?.split(',')
      .map((action) => action.trim())
      .filter((action) => action !== '') ?? []
  );
}

function getCheckboxGroupOptions(
  actionTypeString?: string,
): CheckboxGroupOption[] {
  const actionTypes = getActionTypes(actionTypeString);
  return checkboxGroupData.map((label) => ({
    ...label,
    disabled: !actionTypes.includes(label.value),
  }));
}

function createSchema(
  item: AdministratorApi.roleAuthorityResult,
  options: CheckboxGroupOption[],
): SchemaResult {
  return {
    component: 'CheckboxGroup',
    componentProps: {
      name: 'cname',
      options,
    },
    fieldName: item.Name ?? '',
    label: item.Title ?? '',
  };
}

function updateFormSchema(
  item: AdministratorApi.roleAuthorityResult,
  options: CheckboxGroupOption[],
): void {
  const schemaItem = createSchema(item, options);
  formApi.setState((prev) => ({
    schema: [...(prev?.schema ?? []), schemaItem],
  }));
}
</script>
<template>
  <Modal
    class="w-[800px]"
    :title="$t('user.tips.role')"
    :title-tooltip="$t('user.tips.role_tips')"
  >
    <Form />
  </Modal>
</template>
