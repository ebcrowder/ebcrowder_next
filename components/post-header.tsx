import DateFormatter from "./date-formatter";
import PostTitle from "./post-title";

type Props = {
  title: string;
  date: string;
};

const PostHeader = ({ title, date }: Props) => {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="prose prose-xl max-w-prose mx-auto dark:prose-invert">
        <div className="mb-6 font-bold text-lg">
          <DateFormatter dateString={date} />
        </div>
      </div>
    </>
  );
};

export default PostHeader;
