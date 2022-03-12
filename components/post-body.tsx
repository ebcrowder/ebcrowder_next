type Props = {
  content: string;
};

const PostBody = ({ content }: Props) => {
  return (
    <div className="prose prose-xl max-w-prose mx-auto dark:prose-invert">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default PostBody;
