<script setup lang="ts">
import type { AnalysisInformationitem } from '@vben/common-ui';

import { computed } from 'vue';

import { VbenCountToAnimator } from '@vben/common-ui';

import { cn } from '@vben-core/shared/utils';

interface Props {
  items: AnalysisInformationitem[];
}
defineOptions({
  name: 'AnalyticsVisitsChech',
});

const props = withDefaults(defineProps<Props>(), {
  items: () => [],
});

const noShowDotItems = computed(() => {
  return props.items.filter((item) => !item.showDot);
});

const showDotItems = computed(() => {
  return props.items.filter((item) => item.showDot);
});
</script>

<template>
  <div class="flex w-1/3 items-center justify-center">
    <div class="rounded-lg border p-4">
      <div class="mb-4">
        <template v-for="(item, index) in noShowDotItems" :key="index">
          <p class="text-gray-700">
            <span class="mr-2 truncate font-semibold"> {{ item.title }} :</span>
            <VbenCountToAnimator
              :end-val="item.value"
              :start-val="1"
              :class="cn('text-green-500', item.color)"
              prefix=""
            />
          </p>
        </template>
      </div>
      <div class="flex flex-col gap-1">
        <template v-for="(item, index) in showDotItems" :key="index">
          <p class="flex items-center gap-1 text-xs">
            <span
              :class="
                cn(
                  'flex items-center truncate before:mr-1 before:size-2 before:rounded-full before:content-[\'\']',
                  item.color,
                )
              "
            >
              {{ item.title }}
            </span>
            <VbenCountToAnimator
              :end-val="item.value"
              :start-val="1"
              class="text-purple-500"
              prefix=""
            />
          </p>
        </template>
      </div>
    </div>
  </div>
</template>
