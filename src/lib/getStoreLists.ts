export const getStoreLists = async (category: string) => {
    try {
        const response = await fetch(`/api/stores?category=${category}`);
        if (response.ok) {
            const data = await response.json();
            if(data.length > 0) {
                return data;
            }
            return dummy;
        }
        return dummy;
    } catch (error) {
        return dummy;
    }
};
const dummy =[
    {
      id: 1,
      name: "샐로리 한남점",
      ranking: 1,
      image: "https://placehold.co/600x400",
      address: "서울특별시 강남구 테헤란로 14길 6 남도빌딩 2층",
      phone: "02-543-2345",
      time: "10:00-20:00",
      paymentMethod: "토스결제만 현장결제 안됨",
      minOrderAmount: 13000,
      menu: ["햄버거", "치즈퐁듀", "치즈퐁듀"],
      score: 4.5,
      reviewCount: 3919,
      lng: 126.978,
      lat: 37.5665,
      categories: [
        {
          name: "샐러드",
          menus: [
            {
              id: 1,
              name: "토마토 샐러드",
              price: 7600,
              isBest: true,
              image: "https://placehold.co/600x400",
              ingredient: [
                "계란",
                "옥수수",
                "양파",
                "올리브",
                "베이컨",
                "시저드레싱",
              ],
              description:
                "계란, 옥수수, 양파, 올리브, 베이컨 등 다채로운 재료에 시저의 고소함까지",
              reviewCount: 100,
              optionGroups: [
                {
                  name: "드레싱 선택",
                  minSelectableCount: 1,
                  maxSelectableCount: 1,
                  options: [
                    {
                      name: "시저드레싱",
                      additionalPrice: 0,
                    },
                  ],
                },
                {
                  name: "베이스 선택",
                  minSelectableCount: 1,
                  maxSelectableCount: 1,
                  options: [
                    {
                      name: "채소볼",
                      additionalPrice: 0,
                    },
                  ],
                },
                {
                  name: "추가",
                  minSelectableCount: 0,
                  maxSelectableCount: 10,
                  options: [
                    {
                      name: "계란 (기본 제공량의 30% 추가)",
                      additionalPrice: 1000,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: "웜 볼",
          menus: [],
        },
        {
          name: "마이 샐러디",
          menus: [],
        },
        {
          name: "샌드위치",
          menus: [],
        },
        {
          name: "쥬스",
          menus: [],
        },
      ],
    },
    {
      id: 2,
      name: "옐로우푸드 샐러드",
      ranking: 2,
      image: "https://placehold.co/600x400",
      address: "서울특별시 강남구 테헤란로 14길 6 남도빌딩 2층",
      phone: "02-543-2345",
      time: "10:00-20:00",
      menu: ["햄버거", "치즈퐁듀", "치즈퐁듀"],
      score: 4.5,
      reviewCount: 3919,
      lng: 126.978,
      lat: 37.5665,
      paymentMethod: "현장결제",
      minOrderAmount: 13000,
    },
  ]