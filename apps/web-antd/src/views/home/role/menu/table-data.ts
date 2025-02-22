export const tableColumns: any[] = [
  { field: 'Id', title: 'ID', treeNode: true },
  { field: 'Title', title: '菜单名称' },
  { field: 'Icon_url', title: '图标', slots: { default: 'icon' } },
  { field: 'Name', title: '调用名称' },
  { field: 'Link_url', title: '链接' },
  { field: 'Is_lock', title: '状态', slots: { default: 'open' } },
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
