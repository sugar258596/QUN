<script lang="ts" setup>
import { useVbenForm, useVbenModal } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { message } from 'ant-design-vue';

import { getMessageDetail, publishMessage } from '#/api';

defineOptions({
  name: 'BaseDemo',
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
      disabled: true,
      fieldName: 'Id',
      label: 'Id',
    },
    {
      component: 'Input',
      fieldName: 'Title',
      label: $t('management.zh_title'),
      rules: 'required',
    },
    {
      component: 'Input',
      fieldName: 'Content',
      label: $t('management.zh_content'),
      rules: 'required',
    },
    {
      component: 'Input',
      fieldName: 'EnglishTitle',
      label: $t('management.en_title'),
      rules: 'required',
    },
    {
      component: 'Input',
      fieldName: 'EnglishContent',
      label: $t('management.en_content'),
      rules: 'required',
    },
    {
      component: 'Input',
      fieldName: 'RussianTitle',
      label: $t('management.ru_title'),
      rules: 'required',
    },
    {
      component: 'Input',
      fieldName: 'RussianContent',
      label: $t('management.ru_content'),
      rules: 'required',
    },
    {
      component: 'Select',
      componentProps: {
        options: [
          {
            label: $t('management.options.all'),
            value: 0,
          },
          {
            label: $t('management.options.personage'),
            value: 1,
          },
        ],
      },
      fieldName: 'Type',
      label: $t('management.message_type'),
      rules: 'selectRequired',
    },
    {
      component: 'Input',
      dependencies: {
        rules(values) {
          if (values.Type === 1) {
            return 'required';
          }
          return null;
        },
        triggerFields: ['Type'],
      },
      fieldName: 'MemberIds',
      label: $t('management.push_user'),
      help: $t('management.help_push_user'),
    },
  ],
  submitButtonOptions: {
    content: $t('preferences.button.submit'),
  },
  resetButtonOptions: {
    content: $t('preferences.button.cancel'),
  },
  handleReset: onReset,
  wrapperClass: 'grid-cols-1',
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

function beforeClose() {
  formApi.resetForm();
  modalApi.setData({
    edit: true,
  });
  formApi.setState((prev) => {
    prev.schema?.forEach((item) => {
      if (item.fieldName !== 'Id') {
        item.disabled = false;
      }
    });
    prev.submitButtonOptions = {
      content: $t('preferences.button.submit'),
    };
    return {
      schema: [...(prev?.schema ?? [])],
    };
  });
}

async function handleChange(Id: number) {
  const res = await getMessageDetail({ Id });
  formApi.setValues({
    Id: res.Id,
    Title: res.Title,
    Content: res.Content,
    EnglishTitle: res.EnglishTitle,
    EnglishContent: res.EnglishContent,
    RussianTitle: res.RussianTitle,
    RussianContent: res.RussianContent,
    MemberIds: res.MemberIds,
    Type: res.Type,
  });
  formApi.setState((prev) => {
    prev.schema?.forEach((item) => {
      item.disabled = true;
    });
    prev.submitButtonOptions = {
      content: $t('preferences.button.confirm'),
    };
    return {
      schema: [...(prev?.schema ?? [])],
    };
  });
}
function onReset() {
  modalApi.close();
}

async function onSubmit(values: Record<string, any>) {
  if (values.Id === 0) {
    await publishMessage(values as any);
    message.success($t('preferences.message.add'));
  }
  modalApi.close();
}
</script>
<template>
  <Modal class="w-[800px]" title="消息管理" title-tooltip="添加编辑">
    <Form />
  </Modal>
</template>
