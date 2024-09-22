import { getTimeDifference } from '@/utils';
import { object } from 'prop-types';
import  useCategoryStore  from '@/stores/useCategoryStore'; // 카테고리 가져오기
import { Link } from 'react-router-dom';
import Badge from './Badge';
import { LocationTime } from './Chat';

QuestionList.propTypes = {
  item: object.isRequired,
};

function QuestionList({ item }) {
  const { categories } = useCategoryStore(); // store에서 카테고리 배열 가져오기
  const category = categories.find((cat) => cat.id === item.category); // 카테고리 ID로 이름 찾기

  return (
    <Link
      to={`qna-detail/${item.id}`}
      className="flex justify-between items-center p-3 border-b border-gray-300"
    >
      <div className="flex flex-col flex-grow">
        <div>
          <Badge
            label={category ? category.category_name : '카테고리 없음'} // 카테고리 이름 전달
            isPrimary={false}
          />
        </div>
        <h2 className="text-base mt-1">{item.title}</h2>
        <p className="text-sm text-gray-500 mt-1">{item.description}</p>
        <LocationTime time={getTimeDifference(item.created)} />
      </div>

      {item.imageUrl && (
        <div className="ml-4 flex-shrink-0">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-16 h-16 rounded object-cover"
          />
        </div>
      )}
    </Link>
  );
}

export default QuestionList;
