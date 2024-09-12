import AroundPlace from '@/components/AroundPlace';

export function Component() {
  return (
    <>
      <h1>지도 페이지</h1>
      <AroundPlace
        title="하루채움 스터디 카페"
        distance="1.2km"
        location="서울 용산구"
        phoneNumber="010-1234-5678"
        imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwyXeKDN29AmZgZPLS7n0Bepe8QmVappBwZCeA3XWEbWNdiDFB"
      />

      <AroundPlace
        title="갬성충만 카페"
        distance="42.195km"
        location="부산 진구"
        phoneNumber="010-1234-5678"
        imageUrl="https://img1.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202105/25/koreadognews/20210525045023050wquu.jpg"
      />
    </>
  );
}
