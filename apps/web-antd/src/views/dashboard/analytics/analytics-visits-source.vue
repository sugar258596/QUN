<script lang="ts" setup>
import type { EchartsUIType } from '@vben/plugins/echarts';

import { onMounted, ref } from 'vue';

import { EchartsUI, useEcharts } from '@vben/plugins/echarts';

import { Button } from 'ant-design-vue';

const chartRef = ref<EchartsUIType>();
const { renderEcharts } = useEcharts(chartRef);

onMounted(() => {
  renderEcharts({
    title: {
      text: '用户充值与提现',
      left: 'left',
      textStyle: {
        fontSize: 14,
      },
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['充值', '提现'],
      left: '0%',
      top: '10%',
      textStyle: {
        fontSize: 12,
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      top: '20%',
      containLabel: true,
      width: '80%',
      height: '70%',
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['周一', '周二', '周三', '周四', '周五'],
      axisLine: {
        show: true,
        lineStyle: {
          color: '#333',
          width: 5,
        },
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: true,
        lineStyle: {
          color: '#333',
          width: 5,
        },
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
    },
    series: [
      {
        name: '充值',
        type: 'line',
        data: [0, 0.5, 0.3, 0.8, 0.6],
        itemStyle: {
          color: '#1890ff',
        },
        symbol: 'circle',
        symbolSize: 8,
        lineStyle: {
          width: 3,
        },
      },
      {
        name: '提现',
        type: 'line',
        data: [0, 0.3, 0.2, 0.4, 0.3],
        itemStyle: {
          color: '#52c41a',
        },
        symbol: 'circle',
        symbolSize: 8,
        lineStyle: {
          width: 3,
        },
      },
    ],
  });
});
</script>

<template>
  <div class="relative">
    <div class="flex gap-1">
      <EchartsUI ref="chartRef" />
      <slot name="echar-right"></slot>
    </div>
    <div class="absolute right-0 top-0">
      <div class="flex gap-2">
        <Button size="small">周</Button>
        <Button size="small">月</Button>
        <Button size="small"> 时间</Button>
      </div>
    </div>
  </div>
</template>
