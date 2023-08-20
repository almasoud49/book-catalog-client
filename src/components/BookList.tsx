import { useState } from "react";
import { useAppSelector } from "../redux/hooks";
import { useGetBooksQuery, useRemoveBookMutation } from "../redux/features/books/booksApi";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaTrash } from "react-icons/fa";
import { IBook } from "../shared/globalTypes";


const BookList = () => {
const {accessToken, userId} = useAppSelector((state)=> state.user);
const [removeBook] = useRemoveBookMutation();

  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const { data, isLoading } = useGetBooksQuery({
    page: currentPage,
    searchTerm: searchTerm,
    limit: itemsPerPage,
    genre: selectedGenre,
    publicationYear: selectedYear,
  });

  console.log("Data:", data);
  const totalItems = data?.meta?.total ?? 1;
  const totalPages = Math.ceil(totalItems/itemsPerPage);

  const handleChangePage = (page: number)=> {
    setCurrentPage(page);
  };
  const handleView = (id?: string)=>{
    if(id){
        navigate(`/book/${id}`);
    }
  };

const handleDelete = async(id?:string)=> {
    const shouldDelete = window.confirm('Are You Want to Delete This Book?');

    if(shouldDelete && id){
        const response = await removeBook(id);
        if("error" in response ){
            console.log(response.error);
            toast.error("Failed to Delete Book", {
                position:toast.POSITION.TOP_CENTER,
            });
        }else{
            console.log("Book Deleted Successfully");
            toast.success("Book Deleted Successfully", {
                position: toast.POSITION.TOP_CENTER,
            });
        }
    }
}


    return (
        <div>
          <div className="flex justify-between mb-4">
            <div>
              <input
                type="text"
                placeholder="Search..."
                className="px-4 py-2 border border-gray-300 rounded"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <label className="mr-2">Genre:</label>
              <input
                type="text"
                className="px-4 py-2 border border-gray-300 rounded"
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <label className="mr-2">Publication Year:</label>
              <input
                type="text"
                className="px-4 py-2 border border-gray-300 rounded"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              />
            </div>
          </div>
    
          {isLoading && <p>Loading...</p>}
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Author</th>
                <th className="px-4 py-2">Genre</th>
                <th className="px-4 py-2">Publication Date</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {!isLoading &&
                data?.data &&
                data?.data.map((book: IBook) => (
                  <tr key={book._id}>
                    <td className="border px-4 py-2">{book.title}</td>
                    <td className="border px-4 py-2">{book.author}</td>
                    <td className="border px-4 py-2">{book.genre}</td>
                    <td className="border px-4 py-2">{book.publicationDate}</td>
                    <td className="border px-4 py-2 text-right">
                      <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                        onClick={() => handleView(book?._id)}
                      >
                        <FaEye />
                      </button>
                      {accessToken && (
                        <button
                        className={`${
                          book.createdBy == userId
                            ? "bg-red-500 hover:bg-red-700"
                            : "bg-red-300 cursor-not-allowed"
                        } text-white font-bold py-2 px-4 rounded`}
                          disabled = {book.createdBy != userId}
                          onClick={() => handleDelete(book?._id)}
                        >
                          <FaTrash />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
    
          <div className="mt-4">
            {Array.from(Array(totalPages), (_, index) => index + 1).map((page) => (
              <button
                key={page}
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 ${
                  currentPage === page ? "bg-blue-700" : ""
                }`}
                onClick={() => handleChangePage(page)}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      );
};

export default BookList;