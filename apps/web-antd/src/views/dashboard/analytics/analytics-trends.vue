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
      text: '平台收益',
      left: '3%',
      top: 0,
      textStyle: {
        fontSize: 14,
        fontWeight: 'bold',
      },
    },

    legend: {
      show: true,
      top: 0,
      left: 120,
      itemWidth: 10,
      itemHeight: 10,
      itemGap: 15,
      data: ['新订单', '发货量', '转运量', '到货量'],
    },
    grid: {
      bottom: 0,
      containLabel: true,
      left: '3%',
      right: '3%',
      top: '15%',
    },
    series: [
      {
        name: '新订单',
        data: [12, 11, 15, 13, 16, 17, 20],
        itemStyle: {
          color: '#FF0000',
        },
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
      },
      {
        name: '发货量',
        data: [11, 13, 14, 12, 15, 16, 19],
        itemStyle: {
          color: '#FFA500',
        },
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
      },
      {
        name: '转运量',
        data: [10, 12, 13, 11, 14, 15, 18],
        itemStyle: {
          color: '#0000FF',
        },
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
      },
      {
        name: '到货量',
        data: [9, 11, 12, 10, 13, 14, 17],
        itemStyle: {
          color: '#800080',
        },
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
      },
    ],
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      axisLine: {
        show: true,
      },
      axisTick: {
        show: false,
      },
    },
    yAxis: {
      type: 'value',
      min: 8,
      max: 20,
      splitNumber: 6,
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        lineStyle: {
          type: 'dashed',
        },
      },
    },
  });
});
</script>

<template>
  <div class="relative">
    <EchartsUI ref="chartRef" />
    <div class="absolute right-0 top-0">
      <div class="flex gap-2">
        <Button>周</Button>
        <Button>月</Button>
        <Button>时间</Button>
      </div>
    </div>
  </div>
</template>
