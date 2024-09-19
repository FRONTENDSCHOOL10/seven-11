import { getStorageData } from '@/utils';
import getDetailedAddress from '@/utils/getDetailedAddress';
import React, { useEffect, useState, useRef } from 'react';
import Script from 'react-load-script';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar';

function StudyMap() {
  const [places, setPlaces] = useState([]); // 장소 데이터 저장
  const [center, setCenter] = useState(null); // 지도 중심 좌표를 저장할 상태
  const mapRef = useRef(null); // 지도 객체를 저장할 ref

  const authUser = getStorageData('authInfo').user;

  // Kakao Map API 로드 후 지도 생성
  const handleScriptLoad = () => {
    window.kakao.maps.load(() => {
      const geocoder = new window.kakao.maps.services.Geocoder();

      // 주소를 좌표로 변환
      geocoder.addressSearch(authUser.address, (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
          setCenter(coords); // 변환된 좌표를 상태에 저장
        } else {
          alert('주소를 찾을 수 없습니다.');
        }
      });
    });
  };

  const searchPlaces = (keyword, location) => {
    const ps = new window.kakao.maps.services.Places();
    let combinedPlaces = [];
    const bounds = new window.kakao.maps.LatLngBounds();

    ps.keywordSearch(
      keyword,
      (data, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          data.forEach((place) => {
            const markerPosition = new window.kakao.maps.LatLng(
              place.y,
              place.x
            );
            const marker = new window.kakao.maps.Marker({
              position: markerPosition,
              map: mapRef.current, // 생성된 지도에 마커 추가
            });

            bounds.extend(markerPosition); // 마커 위치를 지도 경계에 추가

            // 마커에 마우스를 가져다 대면 장소 이름 표시
            const infoWindow = new window.kakao.maps.InfoWindow({
              content: `<div style="padding:5px;font-size:12px;">${place.place_name}</div>`,
            });

            window.kakao.maps.event.addListener(marker, 'mouseover', () => {
              infoWindow.open(mapRef.current, marker); // 마커 위에 InfoWindow 열기
            });

            window.kakao.maps.event.addListener(marker, 'mouseout', () => {
              infoWindow.close(); // 마우스가 마커에서 벗어나면 InfoWindow 닫기
            });

            window.kakao.maps.event.addListener(marker, 'click', () => {
              window.open(place.place_url);
            });

            combinedPlaces = [...combinedPlaces, place];
          });

          // 지도 범위 재설정
          mapRef.current.setBounds(bounds);

          // 검색된 장소 데이터를 상태로 저장
          setPlaces(combinedPlaces);
        } else {
          alert('검색된 장소가 없습니다.');
        }
      },
      { location: location, radius: 1000 } // 중심 좌표와 반경 1km로 한정
    );
  };

  useEffect(() => {
    // Kakao 지도 API가 로드된 후 지도 생성 (처음 한 번만 생성)
    if (center && !mapRef.current) {
      const container = document.getElementById('myMap');
      const options = {
        center: center,
        level: 1,
      };
      mapRef.current = new window.kakao.maps.Map(container, options);
    }

    if (center) {
      const categories = ['스터디카페', '카페', '회의실'];
      categories.forEach((category) => searchPlaces(category, center)); // 카테고리별 장소 검색
    }
  }, [center]);

  const handleSearch = (value) => {
    if (!value) {
      alert('값을 입력해주세요!');
      return;
    }
    searchPlaces(value, center);
  };

  return (
    <div className="relative w-full h-screen no-scrollbar">
      <div
        id="myMap"
        className="absolute top-0 left-0 w-full min-h-[500px] h-full"
      ></div>
      <div className="absolute z-30 top-2 left-3">
        <SearchBar
          location="ex) 회의실"
          inputColor="bg-white shadow-custom"
          onClick={handleSearch}
        />
      </div>

      <div className="absolute bottom-0 left-0 w-full bg-white overflow-y-auto rounded-t-xl shadow-map h-[58%] z-10 no-scrollbar">
        <div className="text-primary font-semibold mt-4 px-3 pb-3 border-b border-primary">
          <h3 className="text-lg">
            {getDetailedAddress(authUser.address)} 주변 1km
          </h3>
          <span className="text-base">근처에 스터디할 장소를 찾아보세요!</span>
        </div>
        <ul className='pb-[60px]'>
          {places.map((place, index) => (
            <li key={index} className="flex flex-col border-b p-3">
              <Link to={place.place_url} className="text-base font-bold">
                {place.place_name}
              </Link>
              <span className="text-sm text-gray-300">
                {place.road_address_name || place.address_name}
              </span>
              <span className="text-sm text-primary">{place.phone}</span>
            </li>
          ))}
        </ul>
      </div>

      <Script
        url={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_API_KEY}&libraries=services,clusterer,drawing&autoload=false`}
        onLoad={handleScriptLoad}
      />
    </div>
  );
}

export default StudyMap;
