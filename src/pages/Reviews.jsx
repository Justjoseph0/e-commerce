import { useEffect, useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import { apiUrl } from "@/api";
import { useNavigate } from "react-router-dom";
import Button from "@/components/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Reviews = () => {
  const { pendingReview } = useProducts();
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getPendingReview(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const getPendingReview = async (page) => {
    try {
      setLoading(true);
      const res = await pendingReview(page);
      setReviews(res.data.results);
      setTotalPages(Math.ceil(res.data.count / 8));
    } catch (error) {
      console.error("Error fetching pending reviews:", error);
    } finally {
      setLoading(false);
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

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-custom-brown">
        Pending Reviews ({reviews.length})
      </h2>

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-custom-brown"></div>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="flex items-start bg-white rounded-md p-4 border border-gray-300"
              >
                <img
                  src={`${apiUrl}${review.product_image}`}
                  alt={review.product_name}
                  className="w-20 h-20 object-cover rounded-md"
                />

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

                <Button
                  onClick={() =>
                    handleNavigate(
                      review.reference,
                      review.size,
                      review.product
                    )
                  }
                  className="text-orange-500 text-sm font-semibold"
                >
                  Rate this product
                </Button>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-4 mt-6">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex items-center space-x-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-8 h-8 rounded-full ${
                        currentPage === page
                          ? "bg-custom-brown text-white"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Reviews;
