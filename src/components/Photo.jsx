import "../index.css";

//Individual photo component contained in PhotoList component

function Photo(props) {
  return (
    <>
      <li>
        <img src={props.url} alt={props.alt} />
      </li>
    </>
  );
}

export default Photo;
