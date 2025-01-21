<script lang="ts" setup>
import type { EchartsUIType } from '@vben/plugins/echarts';

import { onMounted, ref } from 'vue';

import { EchartsUI, useEcharts } from '@vben/plugins/echarts';

const chartRef = ref<EchartsUIType>();
const { renderEcharts: renderEcharts1 } = useEcharts(chartRef);

// 修改数据
const chartData = {
  xAxis: ['B市', 'S市', 'T市', 'W市', 'E市', 'J市', 'F市', 'D市'],
  value: [6130, 1255, 1251, 924, 144, 109, 106, 81],
};

// 渲染柱状图
const renderBarChart = () => {
  renderEcharts1({
    backgroundColor: '#254061',
    title: {
      text: '收货地统计 |',
      textStyle: {
        color: '#fff',
      },
      top: 10,
      left: 10,
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: chartData.xAxis,
      axisLabel: {
        color: '#fff',
      },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: '#fff',
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(255,255,255,0.1)',
        },
      },
    },
    series: [
      {
        type: 'bar',
        data: chartData.value,
        itemStyle: {
          color: '#1890ff',
        },
        emphasis: {
          itemStyle: {
            color: '#40a9ff',
          },
        },
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)',
        },
      },
    ],
  });
};

onMounted(() => {
  renderBarChart();
});
</script>

<template>
  <EchartsUI ref="chartRef" />
</template>
