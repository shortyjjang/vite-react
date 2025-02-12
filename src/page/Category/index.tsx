import { useLocation, useNavigate } from "react-router-dom";
import IconArrow from "../../assets/images/icon-arrow";
import { categories } from "../../features/Category/categories";
import { stores } from "../../features/Store/stores";
import StoreItem, { StoreItemProps } from "../../features/Store/StoreItem";
import { useEffect, useState } from "react";

export default function Category() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const category = ((pathname || "").split("/") || []).at(-1);
  const categoryName = categories.find((c) => c.path === category)?.label;
  const [storeLists, setStoreLists] = useState<StoreItemProps[]>(stores);
  const getStoreLists = async (category: string) => {
    if (!category) return;
    try {
      const res = await fetch(`/api/stores?category=${category}`);
      if (res.ok) {
        const data = await res.json();
        setStoreLists(data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getStoreLists(categoryName || "");
  }, [category]);
  return (
    <div>
      <button onClick={() => navigate(-1)} className="py-4 px-2 fixed left-0 top-0">
        <IconArrow className="w-6 h-6 rotate-180" />
      </button>
      <h1 className="text-2xl font-semibold pt-16">{categoryName || "카테고리"}</h1>
      <div className="flex flex-col gap-6 pt-4">
        {storeLists.map((store) => (
          <StoreItem key={store.id} {...store} />
        ))}
      </div>
    </div>
  );
}
