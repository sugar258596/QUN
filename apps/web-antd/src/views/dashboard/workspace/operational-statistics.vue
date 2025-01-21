<script lang="ts" setup>
import type { EchartsUIType } from '@vben/plugins/echarts';

import { onMounted, ref } from 'vue';

import { EchartsUI, useEcharts } from '@vben/plugins/echarts';

// 定义类型
interface ChartDataItem {
  value: number;
  name: string;
  gradient: [string, string];
}

interface ChartSection {
  data: ChartDataItem[];
  position: {
    left?: number | string;
    right?: number | string;
    top?: number | string;
  };
  title: string;
}

const chart1Ref = ref<EchartsUIType>();

const { renderEcharts } = useEcharts(chart1Ref);

// 渐变方法
const getLinearGradient = (startColor: string, endColor: string): any => {
  return {
    type: 'linear',
    x: 0,
    y: 0,
    x2: 0,
    y2: 1,
    colorStops: [
      { offset: 0, color: startColor },
      { offset: 1, color: endColor },
    ],
  };
};

// 提取公共的饼图配置
const commonPieConfig = {
  type: 'pie' as const,
  radius: ['65%', '80%'],
  center: ['50%', '50%'],
  label: { formatter: '{c}', margin: '25%' },
};

// 提取公共配置
const CHART_CONFIG = {
  backgroundColor: '#0a1d3f',
  text: {
    textStyle: {
      color: '#fff',
    },
  },
} as const;

// 优化图表数据结构
const chartData: ChartSection[] = [
  {
    title: '用户总数',
    data: [
      { value: 400, name: '中国', gradient: ['#252740', '#502080'] },
      { value: 800, name: '俄罗斯', gradient: ['#252643', '#383962'] },
    ],
    position: { left: 0, right: '50%' },
  },
  {
    title: '下单率',
    data: [
      { value: 450, name: '已下单', gradient: ['#252740', '#cb259d'] },
      { value: 750, name: '未下单', gradient: ['#252740', '#393a61'] },
    ],
    position: { left: 'center', top: 0 },
  },
  {
    title: '订单总数',
    data: [
      { value: 287, name: '国内', gradient: ['#2e2f58', '#4547a0'] },
      { value: 870, name: '国外', gradient: ['#2e3053', '#383962'] },
    ],
    position: { left: '50%', right: 0 },
  },
];

onMounted(() => {
  renderEcharts({
    ...CHART_CONFIG,
    title: [
      {
        text: '运营统计 |',
        ...CHART_CONFIG.text,
        top: 10,
        left: 10,
      },
      ...chartData.map((section, index) => ({
        text: section.title,
        left: `${25 + index * 25}%`,
        top: 'center',
        textAlign: 'center' as const,
        ...CHART_CONFIG.text,
      })),
    ],
    tooltip: { trigger: 'item' },
    legend: {
      left: 'center',
      bottom: 0,
      textStyle: CHART_CONFIG.text.textStyle,
    },
    series: chartData.map((item, index) => ({
      ...commonPieConfig,
      ...item.position,
      animation: index !== 2,
      data: item.data.map((d) => ({
        value: d.value,
        name: d.name,
        itemStyle: {
          color: getLinearGradient(...d.gradient),
        },
      })),
    })),
  });
});
</script>

<template>
  <EchartsUI ref="chart1Ref" />
</template>
