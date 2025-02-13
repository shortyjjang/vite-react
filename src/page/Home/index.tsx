import { useEffect } from "react";
import { useLayout } from "../../provider/LayoutProvider";
import { categories } from "../../features/Category/categories";
import CategoryItem from "../../features/Category/CategoryItem";
import { useNavigate } from "react-router-dom";
import IconArrow from "../../assets/images/icon-arrow";
import SearchInput from "../../components/SearchInput";
import Title from "../../components/TItle";
import IconNotifyLine from "../../assets/images/icon-notify-line";
import useInfoStore from "../../store/infoStore";

export default function Home() {
  const { setShowHomebar } = useLayout();
  const { address } = useInfoStore();
  const navigate = useNavigate();
  useEffect(() => {
    setShowHomebar(true);
    return () => {
      setShowHomebar(false);
    }
  }, [setShowHomebar]);
  return (
    <div>
      <SearchInput onSearch={() => {}} className="-mt-4 mb-4" />
      <Title title="오늘은 무엇을 먹을까요?" element="h1" />
      <button className="py-2" onClick={() => {
        navigate('/setting/address');
      }}>
        {address}로 배달 &gt;
      </button>
      <div className="flex items-center gap-1 py-2">
        <IconNotifyLine className="text-red-500" />
        <span>현재 주문하는 곳과 배달받는 곳이 멀어요.</span>
      </div>
      <div className="grid grid-cols-3 gap-2 py-4">
        {categories.map((category) => (
          <CategoryItem
            key={category.label}
            label={category.label}
            icon={category.icon}
            onClick={() => {
              navigate(`/categories/${category.path}`);
            }}
          />
        ))}
      </div>
      <button className="font-medium py-4 flex justify-between items-center w-full text-lg">
        실시간 인기 메뉴 TOP10 <IconArrow />
      </button>
      <button className="font-medium py-4 flex justify-between items-center w-full text-lg">
        내 주변 새로운 맛집
        <IconArrow />
      </button>
      <button className="font-medium py-4 flex justify-between items-center w-full text-lg">
        최고 리뷰 맛집 모음 <IconArrow />
      </button>
    </div>
  );
}
