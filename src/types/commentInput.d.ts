declare namespace CommentInput {
  interface Props extends BaseProps {
    /**
     * @desc 只能输入原始文本
     **/
    isPlain?: boolean;
    /**
     * @desc 最多输入字符数
     **/
    maxLength?: number;
  }
}
