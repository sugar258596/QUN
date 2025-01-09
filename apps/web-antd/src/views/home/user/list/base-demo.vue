<script lang="ts" setup>
import { ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { message } from 'ant-design-vue';

defineOptions({
  name: 'BaseDemo',
});
const fomrData = ref();
const [Modal, modalApi] = useVbenModal({
  onCancel() {
    modalApi.close();
  },
  onClosed() {
    message.info('onClosed：关闭动画结束');
  },
  onConfirm() {
    message.info('onConfirm');
    // modalApi.close();
  },
  onOpened() {
    message.info('onOpened：打开动画结束');
  },
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      const { edit, date } = modalApi.getData<Record<string, any>>();
      if (edit) {
        fomrData.value = date;
      }
    }
  },
});
</script>
<template>
  <Modal class="w-[600px]" title="基础弹窗示例" title-tooltip="标题提示内容">
    id :{{ fomrData?.id }}
  </Modal>
</template>
