
const TypeHandler = (target, navigate) => {
  const id = target.getAttribute("id");
  const type = target.getAttribute("type");
  switch (type) {
    case "album":
      navigate(`/album/${id}`);
      break
    case "playlist":
      navigate(`/playlist/${id}`);
      break
    case "song":
      navigate(`/song/${id}`);
      break
    case "artist":
      navigate(`/artist/${id}`);
      break
    case "radio":
      navigate(`/radio/${encodeURIComponent(id)}`);
      break
    default:
      navigate('/');
      break;
  }
}

export default TypeHandler