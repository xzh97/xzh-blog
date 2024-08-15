declare namespace Common {
  /**
   * @desc 接口查询分页参数
   */
  interface PageQuery {
    page: number;
    size: number;
  }

  /**
   * @desc 查询接口常用返回格式
   */
  interface ListApi<T> {
    count: number;
    list: T[];
  }

  /**
   * @desc 基础属性
   */
  interface BaseProps {
    className: string;
    style: object;
  }
}
