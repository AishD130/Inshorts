import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import Footer from "./components/Footer/Footer";
import NavInshort from "./components/NavInshort";
import NewsContent from "./components/NewsContent/NewsContent.js";

function App() {
  const [newsArray, setNewsArray] = useState([]);
  const [newsResults, setNewsResults] = useState();
  const [loadMore, setLoadMore] = useState(10);
  const [category, setCategory] = useState("general");


  const newsApi = async () => {
    try {

      const news = await axios.get(
        `https://gnews.io/api/v4/search?lang=en&country=in&q=${category}&page=${loadMore}&token=2290429339d54d4a1712418c61bd2485`
      );
      console.log(news.data.articles);
      setNewsArray(news.data.articles);
      setNewsResults(news.data.totalArticles);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    newsApi();
  }, [newsResults, loadMore, category]);

  return (
    <div className="App" id="#home">
      <NavInshort setCategory={setCategory} />
      {newsResults && (
        <NewsContent
          newsArray={newsArray}
          newsResults={newsResults}
          loadMore={loadMore}
          setLoadMore={setLoadMore}
        />
      )}
      <Footer />
    </div>
  );
}

export default App;
