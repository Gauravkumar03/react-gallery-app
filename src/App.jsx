// Importing necessary modules and components
import "./index.css";
import PhotoList from "./components/PhotoList";
import NotFound from "./components/NotFound";
import Layout from "./components/Layout";
import Loading from "./components/Loading";
import {
  Route,
  Routes,
  Navigate,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import apiKey from "../config";

function App() {
  //setting up states
  const [catsImagesArray, setCatsImagesArray] = useState([]);
  const [dogsImagesArray, setDogsImagesArray] = useState([]);
  const [computersImagesArray, setComputersImagesArray] = useState([]);
  const [imagesArray, setImagesArray] = useState([]);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const location = useLocation()
  console.log(location)

  // Dynamic photolist component for any random query results which returns a photolist component
  const DynamicPhotoList = ({ imagesArray }) => {
    const { query } = useParams() // Correctly using `useParams` in a functional component
    return <PhotoList photoArray={imagesArray} title={query} />;
  };

  //creating an async function to fetch images from flickr
  async function fetchImages(query) {
    setLoading(true);
    try {
      const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`;
      const response = await fetch(url);
      const data = await response.json();
      const photoArr = data.photos.photo;
      const urlArr = photoArr.map(
        (obj) =>
          `https://live.staticflickr.com/${obj.server}/${obj.id}_${obj.secret}.jpg`
      );
      if (query === "cats") {
        setCatsImagesArray(urlArr);
      } else if (query === "dogs") {
        setDogsImagesArray(urlArr);
      } else if (query === "computers") {
        setComputersImagesArray(urlArr);
      } else {
        setImagesArray(urlArr);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  }

  //handleSubmit function to be executed when search button is clicked and navigated to corresponding page
  const handleSubmit = function (string) {
    fetchImages(string);
    navigate(`/search/${string}`);
  };

  //cats, dogs and computers is loaded everytime by default using effect hooks
  const query = location.pathname.split('/')[2]
  useEffect(() => {
    fetchImages("cats");
    fetchImages("dogs");
    fetchImages("computers");
    if (query !== undefined) {
      fetchImages(query)
    }
  }, [query]);

  return (
    <>
      <Routes>
        {/* by default route is navigated to cats component page */}
        <Route path="/" element={<Navigate to="/cats" />} />
        {/* Layout component rendered on / route which consists of nav and search component */}
        <Route path="/" element={<Layout submit={handleSubmit} />}>
          {/* Outlet used to render cats, dogs and computers components inside layout component */}
          <Route
            path="cats"
            element={<PhotoList photoArray={catsImagesArray} title="Cat" />}
          />
          <Route
            path="dogs"
            element={<PhotoList photoArray={dogsImagesArray} title="Dog" />}
          />
          <Route
            path="computers"
            element={
              <PhotoList photoArray={computersImagesArray} title="Computer" />
            }
          />
          {/* Loading component rendered is loading state is true and as soon as loading state is false photolist component is rendered. */}
          <Route
            path="search/:query"
            element={
              loading ? (
                <Loading />
              ) : (
                <DynamicPhotoList imagesArray={imagesArray} />
              )
            }
          />
          {/* NotFount component rendered if route doesn't match any path */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
