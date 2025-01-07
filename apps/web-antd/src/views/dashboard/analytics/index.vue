<script lang="ts" setup>
import type {
  AnalysisInformationitem,
  AnalysisOverviewItem,
  WorkbenchTodoItem,
} from '@vben/common-ui';
import type { TabOption } from '@vben/types';

import { ref } from 'vue';

import {
  AnalysisChartCard,
  AnalysisChartsTabs,
  AnalysisInformation,
  AnalysisOverview,
  AnalyticsVisitsChech,
  WorkbenchTodo,
} from '@vben/common-ui';
import {
  SvgBellIcon,
  SvgCakeIcon,
  SvgCardIcon,
  SvgDownloadIcon,
} from '@vben/icons';

import AnalyticsTrends from './analytics-trends.vue';
import AnalyticsVisitsData from './analytics-visits-data.vue';
import AnalyticsVisitsSource from './analytics-visits-source.vue';
import AnalyticsVisits from './analytics-visits.vue';

const overviewItems: AnalysisOverviewItem[] = [
  {
    icon: SvgCardIcon,
    title: '收入统计',
    totalTitle: '昨日收入',
    totalValue: 120_000,
    value: 2000,
    unit: '元',
  },
  {
    icon: SvgCakeIcon,
    title: '订单统计',
    totalTitle: '昨日订单',
    totalValue: 500_000,
    value: 20_000,
    unit: '个',
  },
  {
    icon: SvgDownloadIcon,
    title: '用户统计',
    totalTitle: '昨日新增',
    totalValue: 120_000,
    value: 8000,
    unit: '位',
  },
  {
    icon: SvgBellIcon,
    title: '代理统计',
    totalTitle: '昨日新增',
    totalValue: 50_000,
    value: 5000,
    unit: '位',
  },
];

const InformationItems: AnalysisInformationitem[] = [
  {
    title: '无主包裹',
    value: 1234,
  },
  {
    title: '待入库',
    value: 1234,
  },
  {
    title: '已入库',
    value: 1234,
  },
  {
    title: '已出库',
    value: 1234,
  },
  {
    title: '已清关',
    value: 1234,
  },
  {
    title: '国外入库',
    value: 1234,
  },
  {
    title: '国内运转',
    value: 1234,
  },
  {
    title: '已完成',
    value: 1234,
  },
];

const todoItems = ref<WorkbenchTodoItem[]>([
  {
    completed: false,
    content: `审查最近提交到Git仓库的前端代码，确保代码质量和规范。`,
    date: '2024-07-30 11:00:00',
    title: '审查前端代码提交',
  },
  {
    completed: true,
    content: `检查并优化系统性能，降低CPU使用率。`,
    date: '2024-07-30 11:00:00',
    title: '系统性能优化',
  },
  {
    completed: false,
    content: `进行系统安全检查，确保没有安全漏洞或未授权的访问。 `,
    date: '2024-07-30 11:00:00',
    title: '安全检查',
  },
  {
    completed: false,
    content: `更新项目中的所有npm依赖包，确保使用最新版本。`,
    date: '2024-07-30 11:00:00',
    title: '更新项目依赖',
  },
  {
    completed: false,
    content: `修复用户报告的页面UI显示问题，确保在不同浏览器中显示一致。 `,
    date: '2024-07-30 11:00:00',
    title: '修复UI显示问题',
  },
]);

const chartTabs: TabOption[] = [
  {
    label: '流量趋势',
    value: 'trends',
  },
  {
    label: '月访问量',
    value: 'visits',
  },
];

const check: AnalysisInformationitem[] = [
  {
    title: '入账',
    value: 200,
    color: 'text-green-500',
  },
  {
    title: '出账',
    value: 100,
    color: 'text-red-500',
  },
  {
    title: '用户提现',
    value: 100,
    showDot: true,
    color: 'before:bg-blue-500',
  },
  {
    title: '代理分润',
    value: 100,
    showDot: true,
    color: 'before:bg-purple-500',
  },
];
</script>

<template>
  <div class="p-5">
    <AnalysisOverview :items="overviewItems" />
    <AnalysisInformation :items="InformationItems" class="mt-5" />
    <div class="gap-4 xl:flex">
      <div class="grow">
        <AnalysisChartsTabs :tabs="chartTabs" class="mt-5">
          <template #trends>
            <AnalyticsTrends />
          </template>
          <template #visits>
            <AnalyticsVisits />
          </template>
        </AnalysisChartsTabs>
        <div class="mt-5 w-full gap-4 md:flex">
          <AnalysisChartCard
            class="mt-5 md:mt-0 md:w-1/2 xl:w-1/2"
            title="访问数量"
          >
            <AnalyticsVisitsData />
          </AnalysisChartCard>
          <AnalysisChartCard class="mt-5 md:mt-0 md:w-1/2 xl:w-1/2" title="">
            <AnalyticsVisitsSource>
              <template #echar-right>
                <AnalyticsVisitsChech :items="check" />
              </template>
            </AnalyticsVisitsSource>
          </AnalysisChartCard>
        </div>
      </div>

      <WorkbenchTodo
        :items="todoItems"
        class="mt-5 w-full xl:w-1/3 2xl:w-1/4"
        title="待办事项"
      />
    </div>
  </div>
</template>
