const Reviews = () => {
  const reviews = [
    {
      id: 1,
      title: "Gold Plated Stainless Steel Spoon & Fork//12Pcs",
      orderNumber: "1977584792",
      deliveryDate: "23-12-23",
      image: "https://via.placeholder.com/100", // Replace with the actual image URL
    },
    {
      id: 2,
      title: "3Lits Industrial 8000W Food Crusher Blender, 2 In 1 JAR",
      orderNumber: "1567247492",
      deliveryDate: "06-10-23",
      image: "https://via.placeholder.com/100", // Replace with the actual image URL
    },
    {
      id: 3,
      title: "Surrounded By Idiots: The Four Types Of Human Behaviour",
      orderNumber: "1121235262",
      deliveryDate: "15-04-23",
      image: "https://via.placeholder.com/100", // Replace with the actual image URL
    },
    {
      id: 4,
      title: "Exotic BLACK LEATHER Perfume For Men EDP 100ml",
      orderNumber: "1121235262",
      deliveryDate: "15-04-23",
      image: "https://via.placeholder.com/100", // Replace with the actual image URL
    },
  ];
  return (
    <div>
      <h2 className="text-xl font-bold text-custom-brown mb-4">
        Pending Reviews ({reviews.length})
      </h2>
      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="flex items-start bg-white rounded-md p-4 border border-gray-300"
          >
            {/* Image */}
            <img
              src={review.image}
              alt={review.title}
              className="w-20 h-20 object-cover rounded-md"
            />

            {/* Details */}
            <div className="flex-1 ml-4">
              <h3 className="text-sm font-semibold text-gray-800">
                {review.title}
              </h3>
              <p className="text-xs text-gray-600 mt-1">
                <span className="font-semibold">Order nº:</span>{" "}
                {review.orderNumber}
              </p>
              <p className="text-xs text-green-600 mt-1">
                Delivered on {review.deliveryDate}
              </p>
            </div>

            {/* Rate Button */}
            <button className="text-orange-500 text-sm font-semibold">
              Rate this product
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
