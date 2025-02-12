export const getMenuItem = async (storeId: string, menuId: string) => {
  console.log(storeId, menuId);
  //   const response = await fetch(`/api/stores/${storeId}/menus/${menuId}`);
  //   return response.json();
  return {
    id:1,
    name: "토마토 샐러드",
    price: 7600,
    isBest: true,
    image: "https://placehold.co/600x400",
    ingredient: ["계란", "옥수수", "양파", "올리브", "베이컨", "시저드레싱"],
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
  };
};
