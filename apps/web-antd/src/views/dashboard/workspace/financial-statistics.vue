<script lang="ts" setup>
import type { EchartsUIType } from '@vben/plugins/echarts';

import { onMounted, ref } from 'vue';

import { EchartsUI, useEcharts } from '@vben/plugins/echarts';

const chartRef = ref<EchartsUIType>();
const { renderEcharts: renderEcharts1 } = useEcharts(chartRef);

// 修改数据
const chartData = {
  xAxis: [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
  ],
  industry: {
    title: '实业板',
    value: [40, 40, 70, 80, 98, 88, 55, 120, 120, 196, 110, 200],
  },
  market: {
    title: '上市板',
    value: [48, 48, 70, 160, 88, 220, 120, 200, 300, 250, 459, 250],
  },
};

// 渲染折线图
const renderPieChart = () => {
  renderEcharts1({
    title: {
      text: '财务统计',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#000',
        },
      },
    },
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985',
      },
    },
    legend: {
      data: ['实业板', '上市板'],
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: chartData.xAxis,
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: chartData.industry.title,
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        lineStyle: {
          width: 5,
          color: '#FF6B6B',
        },
        emphasis: {
          focus: 'series',
        },
        data: chartData.industry.value,
      },
      {
        name: chartData.market.title,
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        lineStyle: {
          width: 5,
          color: '#0aa3a3',
        },
        emphasis: {
          focus: 'series',
        },
        data: chartData.market.value,
      },
    ],
  });
};

onMounted(() => {
  renderPieChart();
});
</script>

<template>
  <EchartsUI ref="chartRef" />
</template>
