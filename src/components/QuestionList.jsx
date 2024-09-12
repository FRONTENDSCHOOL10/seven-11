import { string } from 'prop-types';

QuestionList.propTypes = {
  tag: string,
  title: string,
  description: string,
  timeAgo: string,
  imageUrl: string,
};

function QuestionList({ tag, title, description, timeAgo, imageUrl }) {
  return (
    <div className="flex justify-between items-center p-3 border-b border-gray-300 ">
      <div className="flex flex-col flex-grow">
        <span className="bg-gray-300 font-semibold text-white text-sm px-1 py-0.5 rounded self-start">
          {tag}
        </span>
        <h2 className="text-base mt-1 ">{title}</h2>
        <p className="text-sm text-gray-500 mt-1 ">{description}</p>
        <span className="text-sm text-gray-400 mt-1">{timeAgo}</span>
      </div>

      {imageUrl && (
        <div className="ml-4 flex-shrink-0">
          <img
            src={imageUrl}
            alt={title}
            className="w-16 h-16 rounded object-cover"
          />
        </div>
      )}
    </div>
  );
}

export default QuestionList;
