import { faker } from '@faker-js/faker';
import { verifyAccessToken } from '~/utils/jwt-utils';
import { unAuthorizedResponse } from '~/utils/response';

function generateMockDataList(count: number) {
  const dataList = [];

  for (let i = 0; i < count; i++) {
    const dataItem = {
      orderNumber: faker.string.uuid(), // 订单号
      category: faker.commerce.department(), // 分类
      destinationCountry: faker.location.country(), // 目的国家
      destinationCity: faker.location.city(), // 目的城市
      customerCode: faker.string.uuid(), // 客户码
      batchNumber: faker.string.alphanumeric(6), // 批号
      deliveryInfo: faker.location.streetAddress(), // 收货信息
      shippingMethod: faker.helpers.arrayElement(['Air', 'Sea', 'Land']), // 运输方式
      unpackingInspection: faker.datatype.boolean() ? '合格' : '不合格', // 开箱检查
      woodenCrate: faker.datatype.boolean() ? '打木架' : '不打木架', // 打木架/木箱
      insuranceValue: faker.commerce.price(), // 保险保价
      weight: faker.number.float({ min: 1, max: 100 }), // 重量
      freight: faker.commerce.price(), // 运费
      paymentMethod: faker.helpers.arrayElement([
        'Credit Card',
        'Paypal',
        'Bank Transfer',
      ]), // 支付方式
      orderStatus: faker.helpers.arrayElement([
        'Pending',
        'Shipped',
        'Delivered',
        'Canceled',
      ]), // 订单状态
    };

    dataList.push(dataItem);
  }

  return dataList;
}

const mockData = generateMockDataList(100);

export default eventHandler(async (event) => {
  const userinfo = verifyAccessToken(event);
  if (!userinfo) {
    return unAuthorizedResponse(event);
  }

  await sleep(600);

  const { page, pageSize, sortBy, sortOrder } = getQuery(event);
  const listData = structuredClone(mockData);
  if (sortBy && Reflect.has(listData[0], sortBy as string)) {
    listData.sort((a, b) => {
      if (sortOrder === 'asc') {
        if (sortBy === 'price') {
          return (
            Number.parseFloat(a[sortBy as string]) -
            Number.parseFloat(b[sortBy as string])
          );
        } else {
          return a[sortBy as string] > b[sortBy as string] ? 1 : -1;
        }
      } else {
        if (sortBy === 'price') {
          return (
            Number.parseFloat(b[sortBy as string]) -
            Number.parseFloat(a[sortBy as string])
          );
        } else {
          return a[sortBy as string] < b[sortBy as string] ? 1 : -1;
        }
      }
    });
  }

  return usePageResponseSuccess(page as string, pageSize as string, listData);
});
