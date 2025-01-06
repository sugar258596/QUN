<script setup lang="ts">
import type { AnalysisInformationitem } from '../typing';

import { Card, CardHeader, VbenCountToAnimator } from '@vben-core/shadcn-ui';

interface Props {
  items: AnalysisInformationitem[];
}

defineOptions({
  name: 'AnalysisOverview',
});

withDefaults(defineProps<Props>(), {
  items: () => [],
});
</script>

<template>
  <div class="grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-8">
    <template v-for="item in items" :key="item.title">
      <Card :title="item.title" class="w-full">
        <CardHeader class="items-center justify-center">
          <VbenCountToAnimator
            :end-val="item.value"
            :start-val="1"
            class="text-xl"
            prefix=""
          />
          <span> {{ item.title }} </span>
        </CardHeader>
      </Card>
    </template>
  </div>
</template>
