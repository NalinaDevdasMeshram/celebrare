function PhotoCard({ photo, isFavorite, onToggleFavorite }) {
  return (
    <article className="overflow-hidden rounded-xl bg-white shadow-md transition hover:shadow-lg">
      <img
        src={`https://picsum.photos/id/${photo.id}/600/400`}
        alt={`Photo by ${photo.author}`}
        className="h-56 w-full object-cover"
        loading="lazy"
      />

      <div className="flex items-center justify-between p-4">
        <p className="truncate pr-3 font-medium text-gray-800">
          {photo.author}
        </p>

        <button
          type="button"
          onClick={() => onToggleFavorite(photo)}
          aria-label={
            isFavorite
              ? `Remove ${photo.author} from favorites`
              : `Add ${photo.author} to favorites`
          }
          aria-pressed={isFavorite}
          className={`shrink-0 text-2xl  cursor-pointer ${
            isFavorite ? "text-red-500" : "text-gray-400"
          }`}
        >
          {isFavorite ? "♥" : "♡"}
        </button>
      </div>
    </article>
  );
}

export default PhotoCard;
