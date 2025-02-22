import type { VbenFormSchema as FormSchema } from '@vben/common-ui';

export interface RowType {
  Id: number;
  Role_name: string;
  Role_type: number;
}

export const formSchema: FormSchema[] = [
  {
    component: 'Input',
    componentProps: {
      placeholder: '输入角色名称',
    },
    defaultValue: '',
    fieldName: 'Keywords',
    label: '角色名称',
  },
  // {
  //   component: 'Select',
  //   componentProps: {
  //     allowClear: true,
  //     options: [
  //       {
  //         label: '管理员',
  //         value: '1',
  //       },
  //       {
  //         label: '普通用户',
  //         value: '2',
  //       },
  //     ],
  //     placeholder: '用户类型',
  //   },
  //   fieldName: 'type',
  //   label: '用户类型',
  // },
  // {
  //   component: 'Select',
  //   componentProps: {
  //     allowClear: true,
  //     options: [
  //       {
  //         label: '渠道注册',
  //         value: '1',
  //       },
  //       {
  //         label: '管理员添加',
  //         value: '2',
  //       },
  //     ],
  //     placeholder: '注册来源',
  //   },
  //   fieldName: 'source',
  //   label: '注册来源',
  // },
  // {
  //   component: 'Select',
  //   componentProps: {
  //     allowClear: true,
  //     options: [
  //       {
  //         label: '男',
  //         value: '1',
  //       },
  //       {
  //         label: '女',
  //         value: '2',
  //       },
  //     ],
  //     placeholder: '性别',
  //   },
  //   fieldName: 'sex',
  //   label: '性别',
  // },
  // {
  //   component: 'Select',
  //   componentProps: {
  //     allowClear: true,
  //     options: [
  //       {
  //         label: '全部信息',
  //         value: '1',
  //       },
  //       {
  //         label: '全部信息',
  //         value: '2',
  //       },
  //     ],
  //     placeholder: '全部信息',
  //   },
  //   fieldName: 'infoAll',
  //   label: '全部信息',
  // },
  // {
  //   component: 'Select',
  //   componentProps: {
  //     allowClear: true,
  //     options: [
  //       {
  //         label: '待处理',
  //         value: '1',
  //       },
  //       {
  //         label: '未处理',
  //         value: '2',
  //       },
  //     ],
  //     placeholder: '代办事项',
  //   },
  //   fieldName: 'AgentMatters',
  //   label: '代办事项',
  // },
  // {
  //   component: 'RangePicker',
  //   fieldName: 'rangePicker',
  //   label: '时间范围',
  // },
];

export const tableColumns: any[] = [
  { align: 'center', type: 'checkbox', width: 40 },
  { field: 'Id', title: 'ID' },
  { field: 'Role_name', title: '角色名称' },
  {
    field: 'Role_type',
    title: '角色类型',
    slots: { default: 'roleType' },
  },
  { fixed: 'right', title: '操作', slots: { default: 'action' }, width: 120 },
];

export const checkboxGroupData = [
  {
    label: '显示',
    value: 'Show',
  },
  {
    label: '查看',
    value: 'View',
  },
  {
    label: '添加',
    value: 'Add',
  },
  {
    label: '修改',
    value: 'Edit',
  },
  {
    label: '删除',
    value: 'Delete',
  },
  {
    label: '审核',
    value: 'Audit',
  },
];
