

const Header = () => {
  return (
    <div className="max-w-7xl mx-auto flex flex-col items-center justify-center lg:h-[600px] h-[313px] bg-[url('bg-image.png')] bg-cover bg-center">
      <div className="flex flex-col items-center text-center lg:text-start gap-y-8">
        <h2 className="text-custom-beige lg:text-5xl text-2xl font-semibold">
          Elevate Your Wardrobe with Timeless Essentials
        </h2>
        <p className="lg:text-xl text-sm text-custom-beige font-medium">
          Discover the Perfect Plain Shirt for Every Occasion. Quality, Comfort,
          and Style in Every Stitch.
        </p>
        <button className="px-8 py-2 bg-custom-beige text-custom-brown rounded font-black text-sm hover:bg-custom-brown hover:text-custom-beige transition duration-300 ease-in-out transform hover:scale-105">Shop Now</button>
      </div>
    </div>
  );
};

export default Header;
