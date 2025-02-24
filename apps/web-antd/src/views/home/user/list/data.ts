import type { VbenFormSchema as FormSchema } from '@vben/common-ui';

export const formSchema: FormSchema[] = [
  {
    component: 'Input',
    defaultValue: '',
    fieldName: 'Keywords',
    label: '账号',
  },
  {
    component: 'Select',
    componentProps: {
      allowClear: true,
      options: [
        {
          label: 'PLUS 会员',
          value: '0',
        },
        {
          label: '普通用户',
          value: '1',
        },
      ],
      placeholder: '用户类型',
    },
    fieldName: 'IsPlus',
    label: '用户类型',
  },
  {
    component: 'Select',
    componentProps: {
      allowClear: true,
      options: [
        {
          label: '男',
          value: '0',
        },
        {
          label: '女',
          value: '1',
        },
      ],
      placeholder: '性别',
    },
    fieldName: 'Sex',
    label: '性别',
  },
  {
    component: 'RangePicker',
    fieldName: 'rangePicker',
    dependencies: {
      componentProps(values) {
        if (values.rangePicker) {
          values.StartTime = values.rangePicker[0];
          values.EndTime = values.rangePicker[1];
        } else {
          values.StartTime = '';
          values.EndTime = '';
        }
        return values;
      },
      triggerFields: ['rangePicker'],
    },
    label: '时间范围',
  },
];

export const tableColumns: any[] = [
  { field: 'Id', title: 'ID' },
  { field: 'NickName', title: '昵称' },
  { field: 'Avatar', title: '头像', slots: { default: 'image-url' } },
  { field: 'IsPlus', title: '会员', slots: { default: 'puls' } },
  { field: 'IsRealName', title: '实名认证', slots: { default: 'real-name' } },
  { field: 'Sex', title: '性别', slots: { default: 'sex' } },
  { field: 'UserCode', title: '客户码', slots: { default: 'code' } },
  { field: 'Mobile', title: '手机号' },
  { field: 'Email', title: '邮箱' },
  { field: 'Wallet', title: '余额' },
  { field: 'Score', title: '积分' },
  { field: 'Status', title: '状态', slots: { default: 'status' } },
];
