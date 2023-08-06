import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../store/bookmarkSlice";
import { getQuotes, getTags } from "../store/quoteSlice";
import loadingImg from "../assets/Infinity-0.7s-68px.gif";
import { selectUser } from "../store/userSlice";
import { Link } from "react-router-dom";

const Quote = () => {
  const dispatch = useDispatch();
  const { quotes } = useSelector((state) => state.quotes);
  const user = useSelector(selectUser);
  const tags = useSelector((state) => state.quotes.tags);
  console.log(tags);
  const bookmark = useSelector((state) => state.bookmark);
  const [selectedTag, setSelectedTag] = useState([]);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    dispatch(getQuotes());
    dispatch(getTags());
  }, []);

  const checkBookmark = () => {
    if (!quotes[0]) {
      return;
    }
    const bookmarked = bookmark.filter((item) => item.id === quotes[0]._id);
    if (bookmarked.length > 0) {
      setIsBookmarked(true);
    } else {
      setIsBookmarked(false);
    }
  };

  useEffect(() => {
    checkBookmark();
  }, [quotes, bookmark]);

  const generateQuote = () => {
    if (selectedTag) {
      dispatch(getQuotes(selectedTag));
    } else {
      dispatch(getQuotes());
    }
  };

  const addToBookmark = (quote) => {
    const payload = {
      id: quote._id,
      content: quote.content,
      author: quote.author,
    };
    dispatch(add(payload));
  };

  const handleTagChange = (e) => {
    const selectedTag = e.target.value;
    setSelectedTag(selectedTag);
  };

  return (
    <div>
      <h1 className="text-2xl text-white font-bold mt-6">Quotify</h1>

      <div>
        {quotes.length > 0 ? (
          quotes.map((quote) => (
            <div key={quote._id}>
              <div
                className={
                  "bg-blue-500 bg-opacity-40 rounded-2xl min-h-[8rem] flex flex-col justify-center items-center gap-8 text-white font-semibold mx-auto w-3/4 px-4 py-2  mt-6"
                }
              >
                <p>
                  {quote.content}
                </p>
                <h4 className="text-sm font-bold">
                  ~{quote.author}
                </h4>
               {
                user ? 
                  <>
                   <button
                  onClick={() => {
                    addToBookmark(quote);
                  }}
                  className={
                    isBookmarked
                      ? "bg-blue-700 px-4 py-2 rounded-lg hover:bg-blue-400 hover:font-bold"
                      : "bg-red-700 px-4 py-2 rounded-lg hover:bg-red-400 hover:font-bold"
                  }
                >
                  Add Bookmark
                </button>
                  </>
                  :
                  <>
                   <button
                  
                  className={
                    isBookmarked
                      ? "bg-blue-700 px-4 py-2 rounded-lg hover:bg-blue-400 hover:font-bold"
                      : "bg-red-700 px-4 py-2 rounded-lg hover:bg-red-400 hover:font-bold"
                  }
                >
                 <Link to="/login"> Add Bookmark</Link>
                </button>
                  </>
               }
              </div>
            </div>
          ))
        ) : (
          <div className="mt-6 bg-blue-500 bg-opacity-40 rounded-2xl min-h-[8rem]  justify-center items-center  mx-auto w-3/4 relative">
            <img
              className="absolute right-[30rem] top-[2rem]"
              src={loadingImg}
            />
          </div>
        )}
      </div>

      <div className="mt-7">
        {tags.length > 0 && (
          <div
            className="text-md
              font-semibold
              "
          >
            <select
              className="rounded-lg
                px-3
                py-2"
              onChange={handleTagChange}
              value={selectedTag}
            >
              <option value="">Select Tag</option>
              {tags.map((tags) => (
                <option key={tags._id} value={tags.slug}>
                  {tags.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <button
        onClick={generateQuote}
        className="mt-8"
      >
        <span className="text-white bg-green-600 rounded-md px-6 py-2 hover:bg-green-300 hover:text-black hover:font-bold ">
          Next Quote
        </span>
      </button>
    </div>
  );
};

export default Quote;
