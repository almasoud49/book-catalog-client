/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from "react-router-dom";
import {
  useSingleBookQuery,
  useUpdateBookMutation,
} from "../redux/features/books/booksApi";
import { useAppSelector } from "../redux/hooks";
import { IBook, IReview } from "../shared/globalTypes";
import { toast } from "react-toastify";

const BookDetails = () => {
  const [updateBook] = useUpdateBookMutation();
  const navigate = useNavigate();
  const param = useParams();

  const { data, isLoading } = useSingleBookQuery(param.id!, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 10000,
  });

  const { userId } = useAppSelector((state) => state.user);
  const isBookCreatedByUser = data?.data?.createdBy === userId;
  let reviewList: IReview[] = [];
  reviewList = data?.data?.reviews || [];

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const formObject: IBook = {
      title: "",
      author: "",
      genre: "",
      publicationDate: "",
    };

    formData.forEach((defaultValue, key) => {
      formObject[key as keyof IBook] = defaultValue as any;
    });
    console.log("Form data:", formObject);
    try {
      const response = await updateBook({ id: param.id!, data: formObject });
      if ("error" in response) {
        toast.error("Failed to Updated Book", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        toast.success("Successfully book updated!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        navigate("/home");
      }
    } catch (error) {
      console.log("err", error);
    }
  };

  const handleReviewSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const review: IReview = {
      text: formData.get("review") as string,
    };

    const formObject = {
      ...data.data,
      reviews: [...data.data.reviews, review],
    };

    try {
      const response = await updateBook({ id: param.id!, data: formObject });
      console.log("Review Response:", response);
      if ("error" in response) {
        toast.error("Failed to Updated Review", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        toast.success("Successfully Book Updated Review!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.log("err", error);
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 mt-4">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-4">Book Details</h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <div className="mb-4">
                <label htmlFor="title" className="block font-bold mb-2">
                  Title:
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  defaultValue={data?.data?.title}
                  disabled={!isBookCreatedByUser}
                  className="w-full border border-gray-400 p-2 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="author" className="block font-bold mb-2">
                  Author:
                </label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  defaultValue={data?.data?.author}
                  disabled={!isBookCreatedByUser}
                  className="w-full border border-gray-400 p-2 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="genre" className="block font-bold mb-2">
                  Genre:
                </label>
                <input
                  type="text"
                  id="genre"
                  name="genre"
                  defaultValue={data?.data?.genre}
                  disabled={!isBookCreatedByUser}
                  className="w-full border border-gray-400 p-2 rounded"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="publicationDate"
                  className="block font-bold mb-2"
                >
                  Publication Date:
                </label>
                <input
                  type="date"
                  id="publicationDate"
                  name="publicationDate"
                  defaultValue={data?.data?.publicationDate}
                  disabled={!isBookCreatedByUser}
                  className="w-full border border-gray-400 p-2 rounded"
                  required
                />
              </div>
              {isBookCreatedByUser && (
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Update Book
                </button>
              )}
            </form>
          </>
        )}
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Reviews</h2>
        <div>
          {reviewList.map((review, index: number) => (
            <div key={index} className="flex gap-3 items-center mb-5">
              <div className="default-avatar w-10 h-10 rounded-full flex items-center justify-center bg-gray-400 text-white">
                User
              </div>
              <p>{review.text}</p>
            </div>
          ))}
        </div>
        {userId && (
          <form onSubmit={handleReviewSubmit} className="mt-4">
            <input
              type="text"
              id="review"
              name="review"
              className="w-full border border-gray-400 p-2 rounded"
              placeholder="Write a review..."
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
            >
              Submit Review
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default BookDetails;
