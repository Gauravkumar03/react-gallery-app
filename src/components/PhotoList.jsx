import "../index.css";
import Photo from "./Photo";

// PhotoList component which contains Photo component

function PhotoList(props) {
  if (props.photoArray.length === 0) {
    return (
      <li className="not-found">
        <h3>No Results Found</h3>
        <p>You search did not return any results. Please try again.</p>
      </li>
    );
  }
  return (
    <div className="photo-container">
      <h2>{`${props.title} Gifs`}</h2>
      <ul>
        {props.photoArray.map((url) => {
          return <Photo url={url} alt="some alt" key={url} />;
        })}
      </ul>
    </div>
  );
}

export default PhotoList;
