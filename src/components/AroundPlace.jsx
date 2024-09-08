import { string } from 'prop-types';

AroundPlace.propTypes = {
  title: string,
  distance: string,
  location: string,
  phoneNumber: string,
  imageUrl: string,
};

function AroundPlace({ title, distance, location, phoneNumber, imageUrl }) {
  return (
    <div className="flex justify-between items-center p-4 border-y">
      <div className="flex flex-col">
        <h2 className="text-base font-bold my-0.5">{title}</h2>
        <p className="text-gray-300 text-sm my-0.5">
          {distance} | {location}
        </p>
        <p className="text-blue-500 text-sm my-0.5">{phoneNumber}</p>
      </div>
      <div className="ml-4">
        <img
          src={imageUrl}
          alt={title}
          className="w-20 h-20 rounded-md object-cover"
        />
      </div>
    </div>
  );
}

export default AroundPlace;
