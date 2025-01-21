import { requestClient } from '#/api/request';

export namespace DemoTableApi {
  export interface PageFetchParams {
    [key: string]: any;
    page: number;
    pageSize: number;
  }
}

/**
 * 获取示例表格数据
 */
async function getExampleTableApi(params: DemoTableApi.PageFetchParams) {
  return requestClient.get('/table/list', { params });
}

/**
 * 获取示例表格数据
 */
async function getExampleTableApi2(params: DemoTableApi.PageFetchParams) {
  return requestClient.get('/table/list-order', { params });
}

export { getExampleTableApi, getExampleTableApi2 };
