import { ArrowBigLeft, ArrowBigRight } from "lucide-react";

export default function Image({images, alt, index, setIndex}) {
    const last = images.length - 1;

    function changeImage(direction) {
    if (direction === "left") {
      setIndex((prev) => (prev === 0 ? last : prev - 1));
    } else {
      setIndex((prev) => (prev === last ? 0 : prev + 1));
    }
  }

  return (
    <div className="relative group mx-auto aspect-square max-h-70 md:w-2/5 lg:w-2/6 flex md:m-5 justify-center bg-gray-200 overflow-hidden">
      <img
        src={images[index]}
        alt={alt}
        className="aspect-square object-contain"
      />
      {images.length > 1 && (
        <div>
          <button onClick={() => changeImage("left")} className="absolute w-1/9 flex justify-center items-center left-0 h-full backdrop-brightness-80 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
            <ArrowBigLeft />
          </button>
          <button onClick={() => changeImage("right")} className="absolute w-1/9 flex justify-center items-center right-0 h-full backdrop-brightness-80 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
            <ArrowBigRight />
          </button>
        </div>
      )}
    </div>
  );
}
