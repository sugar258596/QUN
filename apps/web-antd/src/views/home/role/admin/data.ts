import type { VbenFormSchema as FormSchema } from '@vben/common-ui';

export const formSchema: FormSchema[] = [
  {
    component: 'Input',
    componentProps: {
      placeholder: '输入账号/客户码',
    },
    defaultValue: '',
    fieldName: 'Keywords',
    label: '账号/客户码',
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
  // { align: 'center', type: 'checkbox', width: 40 },
  // { title: '序号', type: 'seq' },
  // { field: 'category', title: '昵称' },
  // { field: 'imageUrl', title: '头像' },
  // { field: 'open', title: '审核状态' },
  // { field: 'status', title: '实名认证' },
  // { field: 'color', title: '客户码' },
  // { field: 'productName', title: '手机号/邮箱' },
  // { field: 'price', title: '余额/积分' },
  // { fixed: 'right', title: '操作', width: 120 },
  { align: 'center', type: 'checkbox', width: 40 },
  { field: 'Id', title: 'ID' },
  { field: 'Username', title: '账号' },
  { field: 'Mobile', title: '手机号' },
  { field: 'Realname', title: '姓名' },
  { field: 'AddTime', title: '注册时间' },
  { fixed: 'right', title: '操作', slots: { default: 'action' }, width: 120 },
];
