import { useLocation, useNavigate } from "react-router-dom";
import { categories } from "../../features/Category/categories";
import StoreItem, { StoreItemProps } from "../../features/Store/StoreItem";
import { useQuery } from "@tanstack/react-query";
import { getStoreLists } from "../../lib/getStoreLists";
import BackHeader from "../../components/BackHeader";
import Title from "../../components/TItle";

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
      <BackHeader onBack={() => navigate(-1)} />
      <Title title={categoryName || "카테고리"} element="h1" className="pt-10" />
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
