export const getAddressList = async (query: string) => {
    try {
        const response = await fetch(`https://dapi.kakao.com/v2/local/search/address.json?query=${query}`, {
            method: 'GET',
            headers: {
                Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_API_KEY}`,
            },
        });
        if(!response.ok) {
            return dummy;
        }
        const data = await response.json();
        if(data.documents.length === 0) {
            return dummy;
        }
        return data.documents;
    } catch (error) {
        return dummy;
    }
};

const dummy = [
    {
      name: '한남 빌리지',
      address: '서울특별시 강남구 테헤란로 14길 6 남도빌딩 2층',
      latitude: 37.517185,
      longitude: 126.978394,
    },
    {
      name: '캐피탈 타워',
      address: '서울특별시 강남구 캐피탈 타워',
      latitude: 37.517185,
      longitude: 126.978394,
    },
  ]