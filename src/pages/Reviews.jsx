import { useProducts } from "@/hooks/useProducts";
import { useEffect, useState } from "react";
import { apiUrl } from "@/api";
import { useNavigate } from "react-router-dom";
import Button from "@/components/Button";

const Reviews = () => {
  const { pendingReview } = useProducts();
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  console.log(reviews);

  useEffect(() => {
    getPendingReview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPendingReview = async () => {
    try {
      const res = await pendingReview();
      setReviews(res.data);
    } catch (error) {
      console.error("Error fetching pending reviews:", error);
    }
  };
  const handleNavigate = (reference, size, productId) => {
    if (size) {
      navigate(
        `/profile/reviews/rating/${productId}?reference=${reference}&size=${size}`
      );
    } else {
      navigate(`/profile/reviews/rating/${productId}?reference=${reference}`);
    }
  };

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
              src={`${apiUrl}${review.product_image}`}
              alt={review.product_name}
              className="w-20 h-20 object-cover rounded-md"
            />

            {/* Details */}
            <div className="flex-1 ml-4">
              <h3 className="text-sm font-semibold text-gray-800">
                {review.product_name}
              </h3>
              <p className="text-xs text-gray-600 mt-1">
                <span className="font-semibold">Order nº:</span>{" "}
                {review.reference}
              </p>
              <p className="text-xs text-green-600 mt-1">
                Delivered on{" "}
                {new Date(review.delivered_date).toLocaleDateString()}
              </p>
            </div>

            {/* Rate Button */}
            <Button
              onClick={() =>
                handleNavigate(review.reference, review.size, review.product)
              }
              className="text-orange-500 text-sm font-semibold"
            >
              Rate this product
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
