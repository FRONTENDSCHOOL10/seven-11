import pb from '@/api/pb';
import { getTimeDifference } from '@/utils';
import { object } from 'prop-types';
import { useEffect, useState } from 'react';
import Badge from './Badge';
import { LocationTime } from './Chat';

QuestionList.propTypes = {
  item: object.isRequired,
};

function QuestionList({ item }) {
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        if (item.category) {
          const categoryData = await pb
            .collection('Categories')
            .getOne(item.category);
          setCategory(categoryData);
        } else {
          setCategory({ category_name: '카테고리 없음' });
        }
      } catch (error) {
        console.error('데이터를 가져오는 중 오류가 발생했습니다:', error);
      }
    };

    fetchCategory();
  }, [item.category]);

  return (
    <div className="flex justify-between items-center p-3 border-b border-gray-300 ">
      <div className="flex flex-col flex-grow">
        <div>
          <Badge
            label={category ? category.category_name : '카테고리 없음'}
            isPrimary={false}
          />
        </div>
        <h2 className="text-base mt-1 ">{item.title}</h2>
        <p className="text-sm text-gray-500 mt-1 ">{item.description}</p>
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
    </div>
  );
}

export default QuestionList;
