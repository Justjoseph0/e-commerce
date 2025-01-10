import { Star, Image, AlertCircle } from "lucide-react";
import { useState } from "react";

const ReviewRatingDetail = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) {
      setError("Please select a rating");
      return;
    }
    if (title.trim() === "") {
      setError("Please add a title for your review");
      return;
    }
    if (review.trim() === "") {
      setError("Please write your review");
      return;
    }
    // Handle form submission here
    console.log({ rating, title, review, images });
    setError("");
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Rate & Review</h2>

      {/* Product Info */}
      <div className="flex items-center gap-4 border-b pb-4 mb-6">
        <img
          src="https://via.placeholder.com/80"
          alt="Product"
          className="w-20 h-20 object-cover rounded-md border"
        />
        <div className="flex flex-col gap-y-2">
          <h3 className="text-lg font-semibold text-gray-800">
            Gold Plated Stainless Steel Spoon & Fork//12Pcs
          </h3>

          <div className="flex gap-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="focus:outline-none"
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
              >
                <Star
                  className={`w-8 h-8 ${
                    star <= (hoverRating || rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Review Form */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Review Title */}
          <div>
            <label
              htmlFor="review-title"
              className="block text-sm font-medium text-gray-600"
            >
              Review Title
            </label>
            <input
              id="review-title"
              type="text"
              placeholder="e.g. I like it! / I don't like it!"
              className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-orange-300"
            />
          </div>

          {/* Your Name */}
          <div>
            <label
              htmlFor="review-name"
              className="block text-sm font-medium text-gray-600"
            >
              Your Name
            </label>
            <input
              id="review-name"
              type="text"
              placeholder="Your name"
              className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-orange-300"
            />
          </div>
        </div>

        {/* Detailed Review */}
        <div>
          <label
            htmlFor="detailed-review"
            className="block text-sm font-medium text-gray-600"
          >
            Detailed Review
          </label>
          <textarea
            id="detailed-review"
            placeholder="Tell us more about your rating!"
            className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-orange-300"
            rows="4"
          ></textarea>
        </div>
      </div>

      {/* Submit Button */}
      <button className="w-full mt-6 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition duration-300">
        Submit Your Review
      </button>
    </div>
  );
};

export default ReviewRatingDetail;
