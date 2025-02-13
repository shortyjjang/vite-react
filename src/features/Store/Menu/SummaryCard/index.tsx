import BackHeader from "../../../../components/BackHeader";

export default function SummaryCard({
  onBack,
  image,
  name,
  reviewCount = 0,
  description = "",
}: {
  onBack: () => void;
  image: string;
  name: string;
  reviewCount?: number;
  description?: string;
}) {
  return (
    <>
      <BackHeader onBack={onBack} />
      <div className="-mx-4 w-screen">
        <img
          src={image}
          alt={name}
          className="w-full object-cover aspect-[39/16]"
        />
      </div>
      <h1 className="text-2xl font-semibold pt-4">{name}</h1>
      <div className="flex items-center gap-2 pt-1 text-gray-800">
        <span className="cursor-pointer text-gray-500">리뷰{reviewCount.toLocaleString()}개 보기 &gt;</span>
      </div>

      {description && <div className="text-sm pt-2 text-gray-500">{description}</div>}
    </>
  );
}
