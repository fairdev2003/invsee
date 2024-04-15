interface CardProps {
  key: string;
  value: string | undefined | null;
}

const Card = ({ key, value }: CardProps) => {
  return (
    <div>
      <div className="bg-[#252222] h-full flex items-center w-full row-span-1 rounded-xl p-2">
        <h3 className="font-bold">{ key }</h3>
        {/* @ts-ignore */}

        

        <p className="text-[#AAA3A3] font-medium">
          { value?.replace("__", ":") }
        </p>
      </div>
    </div>
  );
};

export default Card;
