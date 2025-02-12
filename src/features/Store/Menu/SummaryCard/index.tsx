import IconArrow from "../../../../assets/images/icon-arrow";

export default function SummaryCard({
  onBack,
  image,
  name,
  reviewCount = 0,
}: {
  onBack: () => void;
  image: string;
  name: string;
  reviewCount?: number;
}) {
  return (
    <>
      <button
        onClick={onBack}
        className="sticky top-0 z-10 py-4 px-2 -mt-4 -ml-4"
      >
        <IconArrow className="w-6 h-6 rotate-180" />
      </button>
      <div className="-mx-4 w-[calc(100vw+2rem)]">
        <img
          src={image}
          alt={name}
          className="w-full object-cover aspect-[39/16]"
        />
      </div>
      <h1 className="text-2xl font-semibold pt-4">{name}</h1>
      <div className="flex items-center gap-2 pt-1 text-gray-800">
        <span>리뷰{reviewCount.toLocaleString()}개 보기 &gt;</span>
      </div>
    </>
  );
}
