<script lang="ts" setup>
import type { UserApi } from '#/api/core/user';

import { useVbenForm, useVbenModal } from '@vben/common-ui';

import { message } from 'ant-design-vue';

import {
  getRoleAuthorityApi,
  getRoleDetailApi,
  getRoleTypeListApi,
  postRoleAddApi,
} from '#/api';

import { checkboxGroupData } from './data';

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
      if (!data || (!data.Id && !edit)) {
        handleSetState();
        return;
      }
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
        afterFetch: (data: UserApi.roleTypeListResult[]) => {
          return data.map((item) => ({
            label: item.Name,
            value: item.Id,
          }));
        },
        api: getRoleTypeListApi,
      },
      fieldName: 'roleType',
      label: '角色类型',
      rules: 'selectRequired',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
      },
      fieldName: 'roleName',
      label: '名称',
      rules: 'required',
    },
  ],
  wrapperClass: 'grid-cols-1',
  resetButtonOptions: {
    content: '取消',
  },
  handleReset: () => {
    modalApi.close();
  },
});

async function onSubmit(values: Record<string, any>) {
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
  if (values.Id !== 0) {
    message.success('编辑成功');
    return;
  }
  message.success('添加成功');
  modalApi.close();
}

function beforeClose() {
  modalApi.setData({
    edit: true,
  });

  formApi.resetForm();
  formApi.setState((prev) => {
    return {
      schema: prev.schema?.filter((item) => arr.has(item.fieldName)),
    };
  });
}
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

function transformData(data: UserApi.roleAuthorityResult[]): SchemaResult[] {
  const stateData: SchemaResult[] = [];
  traverseData(data, stateData);
  return stateData;
}

function transformValue(
  data: UserApi.roleAuthorityResult[],
): Record<string, string[]> {
  const stateData: Record<string, string[]> = {};
  traverseValue(data, stateData);
  return stateData;
}

function traverseData(
  items: UserApi.roleAuthorityResult[],
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
  items: UserApi.roleAuthorityResult[],
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
  item: UserApi.roleAuthorityResult,
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
  item: UserApi.roleAuthorityResult,
  options: CheckboxGroupOption[],
): void {
  const schemaItem = createSchema(item, options);
  formApi.setState((prev) => ({
    schema: [...(prev?.schema ?? []), schemaItem],
  }));
}
</script>
<template>
  <Modal class="w-[800px]" title="角色管理" title-tooltip="菜单权限初始默认值">
    <Form />
  </Modal>
</template>
