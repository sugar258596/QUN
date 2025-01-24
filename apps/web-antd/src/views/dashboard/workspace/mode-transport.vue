<script lang="ts" setup>
import type { EchartsUIType } from '@vben/plugins/echarts';

import { computed, onMounted, ref } from 'vue';

import { EchartsUI, useEcharts } from '@vben/plugins/echarts';

const chartRef = ref<EchartsUIType>();
const { renderEcharts } = useEcharts(chartRef);

const pieChartData = [
  { value: 79, name: 'A 陆运' },
  { value: 2, name: 'B 空运' },
];

const barChartData = computed(() => {
  return pieChartData.map((item) => item.value);
});
const barChartCategories = computed(() => {
  return pieChartData.map((item) => item.name);
});

// 合并后的渲染方法
const renderCharts = () => {
  renderEcharts({
    backgroundColor: '#254061',
    title: {
      text: '运输方式统计',
      left: 10,
      top: 10,
      textStyle: { color: '#fff' },
    },
    tooltip: { trigger: 'item' },
    grid: {
      right: '5%',
      left: '55%',
      bottom: '15%',
      top: '20%',
      containLabel: true,
    },
    yAxis: [
      {
        type: 'category',
        data: barChartCategories.value,
        axisTick: {
          alignWithLabel: true,
        },
      },
    ],
    xAxis: [
      {
        type: 'value',
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
            color: '#ddd',
          },
        },
      },
    ],

    legend: {
      bottom: '10%',
      left: '20%',
      itemWidth: 10,
      itemHeight: 10,
      textStyle: { color: '#fff' },
    },
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['25%', '55%'],
        startAngle: 180,
        endAngle: 360,
        label: {
          show: true,
          formatter: '{c}',
        },
        data: pieChartData,
      },
      {
        type: 'bar',
        barWidth: '40%',
        data: barChartData.value,
        itemStyle: {
          color(params) {
            return params.dataIndex === 0 ? '#5470c6' : '#91cc75';
          },
        },
      },
    ],
  });
};

onMounted(() => {
  renderCharts();
});
</script>

<template>
  <div>
    <EchartsUI ref="chartRef" />
  </div>
</template>
