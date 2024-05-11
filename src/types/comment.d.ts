declare namespace Comment {
  interface Entity {
    /* 评论id */
    id: number;
    /* 名称 */
    name: string;
    /* 联系方式 电话或者邮箱 */
    contact: string;
    /* 评论内容 */
    content: string;
    /* 归属评论id */
    parentId?: number;
    /* 回复评论id */
    replyId?: number;
    /* 回复时间 */
    createTime: Date;
    /* 子回复 */
    children?: Entity[];
  }

  interface Props {
    list: Entity[];
  }
}
