import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import BackHeader from "../../../components/BackHeader";
import { useNavigate } from "react-router-dom";
import Input from "../../../components/Input";
import { getAddressList } from "../../../lib/getAddressList";
import IconCheckMono from "../../../assets/images/icon-check-mono";
import useInfoStore from "../../../store/infoStore";
import { twMerge } from "tailwind-merge";

export default function SearchAddress() {
  const navigate = useNavigate();
  const { address, setAddress, setCoords} = useInfoStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [addressList, setAddressList] = useState<any[]>([]);

  const mutation = useMutation((query: string) => getAddressList(query), {
    onSuccess: (data) => {
      setAddressList(data);
    },
    onError: () => {
      setAddressList([]);
    },
  });

  const onSearchAddress = () => {
    if (searchQuery.trim()) {
      mutation.mutate(searchQuery);
    }
  };

  return (
    <div>
      <BackHeader onBack={() => navigate(-1)} />
      <Input
        placeholder="건물, 지번, 도로명 검색"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSearchAddress();
          }
        }}
      />
      {mutation.isLoading && <div>Loading...</div>}
      {mutation.isError && <div>Error occurred</div>}
      <ul className="mt-4">
        {addressList.map((addr, index) => (
          <li key={index} className="grid grid-cols-[auto_70px] gap-x-2 py-3">
            <b className="font-medium">{addr.name}</b>
            <div className="flex items-center row-span-2">
              <button
                title="선택"
              className={twMerge(
                "w-7 h-7 rounded-full flex items-center justify-center",
                address === addr.address
                  ? "bg-blue-500 text-white"
                  : "border-1 text-gray-200"
              )}
              onClick={() => {
                setAddress(addr.address);
                setCoords({
                  lat: addr.latitude,
                  lng: addr.longitude,
                });
              }}
            >
              <IconCheckMono className="w-5 h-5" />
            </button>
            </div> <address className="not-italic text-gray-500 text-sm">{addr.address}</address>
          </li>
        ))}
      </ul>
    </div>
  );
}
