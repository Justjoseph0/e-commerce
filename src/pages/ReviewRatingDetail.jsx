import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Star, ArrowLeft, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useProducts } from "@/hooks/useProducts";
import { apiUrl } from "@/api";
import toast from "react-hot-toast";

const ReviewRatingDetail = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const { search } = useLocation();
  const { fetchPendingReviewDetail, reviewProduct, isLoading } = useProducts();

  // const [isLoading, setIsLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [formData, setFormData] = useState({
    title: "",
    name: "",
    review: "",
  });
  const [error, setError] = useState("");
  const [product, setProduct] = useState({});

  const queryParams = new URLSearchParams(search);
  const size = queryParams.get('size');
  const reference = queryParams.get('reference');

  console.log(reference,size);
  

  const fetchPendingReview = async () => {
    try {
      const res = await fetchPendingReviewDetail(reference,size);
      // console.log(res);
      setProduct(res.data);
    } catch (error) {
      setError("Failed to load product details");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setError("");
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (rating === 0) {
      setError("Please select a rating");
      return;
    }
    if (!formData.title.trim()) {
      setError("Please add a title for your review");
      return;
    }
    if (!formData.name.trim()) {
      setError("Please enter your name");
      return;
    }
    if (!formData.review.trim()) {
      setError("Please write your review");
      return;
    }

    const res = await reviewProduct(productId,reference, rating, formData.review);
    if (res.status === 201) {
      toast.success('Product Reviewed Successfully')
      navigate("/profile/reviews");
    }




    // Handle submission logic here
    // console.log({ rating, ...formData });
  };

  const { product_name, product_image } = product;

  useEffect(() => {
    fetchPendingReview();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
      </div>
    );
  }

  return (
    <Card className="shadow-none border-none">
      <CardHeader className="space-y-4">
        <Button
          variant="ghost"
          className="w-fit p-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="text-2xl font-bold text-gray-800">Rate & Review</h2>
      </CardHeader>

      <CardContent className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="flex items-center gap-4 pb-6 border-b">
          <img
            src={`${apiUrl}${product_image}`}
            alt={product_name}
            className="w-24 h-24 object-cover rounded-lg border"
          />
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-800">
              {product_name}
            </h3>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="focus:outline-none transition-colors duration-200"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                >
                  <Star
                    className={`w-8 h-8 transition-colors duration-200 ${
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

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="title"
                className="text-sm font-medium text-gray-700"
              >
                Review Title
              </label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g. Great product!"
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-700"
              >
                Your Name
              </label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
                className="w-full"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="review"
              className="text-sm font-medium text-gray-700"
            >
              Detailed Review
            </label>
            <Textarea
              id="review"
              name="review"
              value={formData.review}
              onChange={handleInputChange}
              placeholder="Share your experience with this product..."
              rows={4}
              className="w-full"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white"
          >
            {isLoading ? "Submitting....." : " Submit Review"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ReviewRatingDetail;
