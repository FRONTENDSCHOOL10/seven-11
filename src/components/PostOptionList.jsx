import PostOption from './PostOption';

function PostOptionList() {
  const options = [
    { icon: 'people', text: '인원', value: '1', optionType: 'counter' },
    { icon: 'date', text: '날짜', value: '2024-09-10', optionType: 'date' },
    { icon: 'time', text: '시간', value: '20:00', optionType: 'time' },
    { icon: 'gender', text: '성별', value: '누구나', optionType: 'select' },
  ];

  return (
    <div>
      {options.map((option, index) => (
        <PostOption
          key={index}
          icon={option.icon}
          text={option.text}
          value={option.value}
          optionType={option.optionType}
        />
      ))}
    </div>
  );
}

export default PostOptionList;
