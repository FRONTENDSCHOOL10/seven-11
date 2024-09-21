import PostOption from './PostOption';
import usePostOptionStore from '@/stores/usePostOptionsStore'; // Zustand 스토어 가져오기

function PostOptionList() {
  const options = usePostOptionStore((state) => state.options);
  const setOption = usePostOptionStore((state) => state.setOption); // 상태 업데이트 함수

  const optionsConfig = [
    {
      icon: 'people',
      text: '인원',
      optionType: 'counter',
      value: options.people,
    },
    {
      icon: 'gender',
      text: '성별',
      optionType: 'select',
      value: options.gender,
    },
    { icon: 'date', text: '날짜', optionType: 'date', value: options.date },
    { icon: 'time', text: '시간', optionType: 'time', value: options.time },
    {
      icon: 'map',
      text: '장소',
      optionType: 'location',
      value: options.location,
    },
  ];

  return (
    <div>
      {optionsConfig.map((option, index) => (
        <PostOption
          key={index}
          icon={option.icon}
          text={option.text}
          value={option.value}
          optionType={option.optionType}
          onChange={setOption} // setOption을 PostOption에 전달
        />
      ))}
    </div>
  );
}

export default PostOptionList;
