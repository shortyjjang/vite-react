import { useLocation, useNavigate } from "react-router-dom";
import IconArrow from "../../assets/images/icon-arrow";
import { categories } from "../../features/Category/categories";
import StoreItem, { StoreItemProps } from "../../features/Store/StoreItem";
import { useQuery } from "@tanstack/react-query";
import { getStoreLists } from "../../lib/getStoreLists";

export default function Category() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const category = ((pathname || "").split("/") || []).at(-1);
  const categoryName = categories.find((c) => c.path === category)?.label;
  const { data: storeLists, isLoading } = useQuery<StoreItemProps[]>(
    ["storeLists"],
    async () => (categoryName ? await getStoreLists(categoryName) : [])
  );
  return (
    <div>
      <button onClick={() => navigate(-1)} className="py-4 px-2 fixed left-0 top-0">
        <IconArrow className="w-6 h-6 rotate-180" />
      </button>
      <h1 className="text-2xl font-semibold pt-16">{categoryName || "카테고리"}</h1>
      {isLoading     ? (
        <div>Loading...</div>
      ) : (
        <div className="flex flex-col gap-6 pt-4">
        {(storeLists || []).map((store) => (
          <StoreItem key={store.id} {...store} />
        ))}
      </div>   )}
    </div>
  );
}
