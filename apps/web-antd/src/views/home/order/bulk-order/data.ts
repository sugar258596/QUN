import type { VbenFormSchema as FormSchema } from '@vben/common-ui';

export const formSchema: FormSchema[] = [
  {
    component: 'Input',
    componentProps: {
      placeholder: '输入订单号/客户码/关键字',
    },
    defaultValue: '',
    fieldName: 'category',
    label: '订单号/客户码',
  },
  {
    component: 'Select',
    componentProps: {
      allowClear: true,
      options: [
        {
          label: '管理员',
          value: '1',
        },
        {
          label: '普通用户',
          value: '2',
        },
      ],
      placeholder: '用户类型',
    },
    fieldName: 'type',
    label: '目的国家',
  },
  {
    component: 'Select',
    componentProps: {
      allowClear: true,
      options: [
        {
          label: '渠道注册',
          value: '1',
        },
        {
          label: '管理员添加',
          value: '2',
        },
      ],
      placeholder: '注册来源',
    },
    fieldName: 'source',
    label: '目的城市',
  },
  {
    component: 'Select',
    componentProps: {
      allowClear: true,
      options: [
        {
          label: '男',
          value: '1',
        },
        {
          label: '女',
          value: '2',
        },
      ],
      placeholder: '性别',
    },
    fieldName: 'sex',
    label: '物品分类',
  },
  {
    component: 'Select',
    componentProps: {
      allowClear: true,
      options: [
        {
          label: '全部信息',
          value: '1',
        },
        {
          label: '全部信息',
          value: '2',
        },
      ],
      placeholder: '全部信息',
    },
    fieldName: 'infoAll',
    label: '增值服务',
  },
  {
    component: 'Select',
    componentProps: {
      allowClear: true,
      options: [
        {
          label: '待处理',
          value: '1',
        },
        {
          label: '未处理',
          value: '2',
        },
      ],
      placeholder: '代办事项',
    },
    fieldName: 'AgentMatters',
    label: '订单状态',
  },
  {
    component: 'Select',
    componentProps: {
      allowClear: true,
      options: [
        {
          label: '待处理',
          value: '1',
        },
        {
          label: '未处理',
          value: '2',
        },
      ],
      placeholder: '代办事项',
    },
    fieldName: 'AgentMatters',
    label: '支付状态',
  },
  {
    component: 'RangePicker',
    fieldName: 'rangePicker',
    label: '订单时间',
  },
];

export const tableColumns: any[] = [
  { align: 'center', type: 'checkbox', width: 40 },
  { title: '序号', type: 'seq', width: 60 },
  { title: '订单号', field: 'orderNumber', width: 80 },
  { title: '分类', field: 'category', width: 60 },
  { title: '目的国家', field: 'destinationCountry', width: 100 },
  { title: '目的城市', field: 'destinationCity', width: 100 },
  { title: '客户码', field: 'customerCode', width: 80 },
  { title: '批号', field: 'batchNumber', width: 60 },
  { title: '收货信息', field: 'deliveryInfo', width: 100 },
  { title: '运输方式', field: 'shippingMethod', width: 100 },
  { title: '开箱检查', field: 'unpackingInspection', width: 100 },
  { title: '打木架/木箱', field: 'woodenCrate', width: 120 },
  { title: '保险保价', field: 'insuranceValue', width: 100 },
  { title: '重量', field: 'weight', width: 60 },
  { title: '运费', field: 'freight', width: 60 },
  { title: '支付方式', field: 'paymentMethod', width: 100 },
  { title: '订单状态', field: 'orderStatus', width: 100 },
  { title: '操作', fixed: 'right', slots: { default: 'action' }, width: 120 },
  // { field: 'imageUrl', title: '头像', slots: { default: 'image-url' } },
  // { field: 'open', title: '审核状态', slots: { default: 'open' } },
  // { field: 'status', title: '实名认证', slots: { default: 'status' } },
  // { field: 'color', title: '客户码' },
  // { field: 'productName', title: '手机号/邮箱' },
  // { field: 'price', title: '余额/积分' },
  // { fixed: 'right', title: '操作', slots: { default: 'action' }, width: 120 },
];
