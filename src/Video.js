const Video = ({ title, link, rating }) => {
  return (
    <article>
      <h2>{title}</h2>

      <iframe
        width="460"
        height="315"
        src={"https://www.youtube.com/embed/" + link.split("=").slice(-1)}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <p>Rating: {rating}</p>
    </article>
  );
};

export default Video;
