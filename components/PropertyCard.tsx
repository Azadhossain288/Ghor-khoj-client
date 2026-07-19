import Link from "next/link";

type Props = {
  property: {
    _id: string;
    title: string;
    shortDescription: string;
    price: number;
    location: string;
    type: string;
    bedrooms?: number;
    images?: string[];
  };
};

export default function PropertyCard({ property }: Props) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
      <img
        src={property.images?.[0] || "https://placehold.co/400x260?text=GhorKhoj"}
        alt={property.title}
        className="h-44 w-full object-cover"
      />
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="line-clamp-1 font-semibold text-primary">{property.title}</h3>
        <p className="line-clamp-2 text-sm text-slate-500">{property.shortDescription}</p>
        <div className="mt-auto flex items-center justify-between pt-2 text-sm text-slate-600">
          <span>{property.location}</span>
          <span className="font-bold text-accent">৳{property.price.toLocaleString()}</span>
        </div>
        <Link
          href={`/properties/${property._id}`}
          className="mt-2 rounded-full bg-primary py-2 text-center text-sm text-white transition hover:bg-primary/90"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
