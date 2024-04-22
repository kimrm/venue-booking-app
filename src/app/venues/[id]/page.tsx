import fetcher from "@/utils/fetcher";
import ImageLoader from "@/components/ImageLoader";
import Venue from "@/app/types/Venue";
import Image from "next/image";

interface Props {
  params: { id: string };
}

interface VenueData {
  data: Venue;
}

async function getData(id: string) {
  const data = await fetcher(`http://localhost:3000/api/venues/${id}`);
  return data;
}

export default async function VenuePage({ params }: Props) {
  const data: VenueData = await getData(params.id);
  const venue = data.data;

  if (!venue) {
    return <div>Could not find anything here. </div>;
  }
  return (
    venue &&
    venue.media && (
      <div>
        <ImageLoader
          url={venue.media[0].url}
          description={venue.media[0].alt}
          width={800}
          height={800}
          className="h-auto lg:h-96 w-full object-cover"
        />
        <div className="grid grid-cols-3">
          <div className="col-span-2">
            <h1 className="font-serif text-5xl font-bold my-4">{venue.name}</h1>
            <p className="max-w-prose">{venue.description}</p>
            <div>
              <div className="flex gap-5 my-10 items-center">
                <div className=" w-12 h-12 flex rounded-full">
                  {venue.owner?.avatar && (
                    <Image
                      src={venue.owner.avatar.url ?? ""}
                      alt={venue.owner.avatar.alt ?? ""}
                      className="rounded-full object-cover object-center w-auto h-auto"
                      width={50}
                      height={50}
                    />
                  )}
                </div>
                <div>
                  <strong>{venue.owner?.name}</strong> is your host
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 mt-10 ">
            <div className="grid grid-flow-col gap-2">
              {venue.media.map((media) => {
                return (
                  <ImageLoader
                    key={media.url}
                    url={media.url}
                    description={media.alt}
                    width={200}
                    height={200}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    )
  );
}
