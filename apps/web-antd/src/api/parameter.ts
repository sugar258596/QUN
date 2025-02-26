/** 页码参数 */
export interface Pagination {
  /** 页码 */
  Page: number;
  /** 每页条数 */
  PageSize: number;
}

/** 详情请求参数 */
export interface DetailParams {
  /** ID */
  Id: number;
}

/** 删除请求参数 */
export interface DeleteParams {
  /** 需要删除的Id */
  IdArr: string;
}

/** 审核请求参数 */
export interface AuditParams {
  /** Id */
  Id: number;
  /** 0-审核通过   2-审核不通过  */
  Status: number;
  /** 审核备注 */
  Keywords: string;
}
