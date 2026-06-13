// Star removed from review cards to simplify layout

interface ReviewCardProps {
  title: string;
  rating: number;
  text: string;
  date: string;
}

export default function ReviewCard({
  title,
  rating,
  text,
  date,
}: ReviewCardProps) {
  return (
    <div className="rounded-[1.75rem] border border-white/10 bg-black/40 p-6 sm:p-6 md:p-8 overflow-visible w-full box-border">
      <div className="flex flex-col gap-3">
        <div>
          <p className="text-base font-semibold text-white">{title}</p>
          <p className="text-sm text-textSecondary">
            Usuario verificado · {rating.toFixed(1)}
          </p>
        </div>
        <div>
          <p className="text-base leading-7 text-white">{text}</p>
          <p className="mt-3 text-sm text-textSecondary">{date}</p>
        </div>
      </div>
    </div>
  );
}
