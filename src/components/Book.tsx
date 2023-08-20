import { useState } from "react";
import { useAppSelector } from "../redux/hooks";
import BookForm from "./BookForm";
import BookList from "./BookList";
import { FaPlus } from "react-icons/fa";

const Book = ()=> {
    const [showForm, setShowForm] = useState(false);
const {accessToken} = useAppSelector((state)=> state.user);
const handleAdd = () => {
    setShowForm(true);
};

const handleFormCancel = () => {
    setShowForm(false)
}


    return (
        <div>
          {!showForm && accessToken && (
            <div className="mb-4 flex justify-end">
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleAdd}
              >
                <span className="flex items-center">
                  <FaPlus className="mr-2" />
                  ADD
                </span>
              </button>
            </div>
          )}
          {showForm ? <BookForm onCancel={handleFormCancel} /> : <BookList />}
        </div>
      );
};

export default Book;