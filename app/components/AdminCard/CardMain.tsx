import Image from "next/image";

type CardMainProps = {
  categoryName: string | undefined;
  userText: string | undefined;
  imgUrl: string | undefined;
  address: string | undefined;
};
const CardMain: React.FC<CardMainProps> = ({
  categoryName,
  userText,
  imgUrl,
  address,
}) => {
  return (
    <main className="px-4 flex flex-col gap-4 items-center my-6">
      <p className="text-left w-full">
        <span className="font-bold pl-2">Category: </span>
        {categoryName}
      </p>
      <Image
        src={imgUrl ? imgUrl : ""}
        alt={(categoryName ?? "") + userText}
        width={600}
        height={200}
        sizes="(max-width: 768px) 100vw, 33vw"
      />
      <p className="text-left w-full">
        <span className="font-bold">{address}</span>
      </p>
      <p className="text-left w-full">{userText}</p>
    </main>
  );
};

export default CardMain;
