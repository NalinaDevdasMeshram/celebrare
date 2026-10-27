import { useCallback, useEffect, useMemo, useReducer, useState } from "react";

import favortiveReducers from "../reducers/favoritesReducers";
import PhotoCard from "./PhotoCard";
import useFetchPhotos from "../hooks/useFetchPhotos";
import SearchBar from "./SearchBar";

function Gallery() {
  const { photos, loading, error } = useFetchPhotos();

  const [search, setSearch] = useState("");

  const [favorites, dispatch] = useReducer(favortiveReducers, [], () => {
    try {
      return JSON.parse(localStorage.getItem("favorites") || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleSearch = useCallback((event) => {
    setSearch(event.target.value);
  }, []);

  const filteredPhotos = useMemo(() => {
    const query = search.trim().toLowerCase();

    return photos.filter((photo) => photo.author.toLowerCase().includes(query));
  }, [photos, search]);

  const favoriteIds = useMemo(
    () => new Set(favorites.map((photo) => photo.id)),
    [favorites],
  );

  const handleToggleFavorite = useCallback((photo) => {
    dispatch({
      type: "TOGGLE_FAVORITE",
      payload: photo,
    });
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 text-center">
          <h1 className="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl">
            Photo Gallery
          </h1>

          <p className="text-gray-600">
            Explore photos and save your favourites.
          </p>
        </header>

        <div className="mx-auto mb-8 max-w-xl">
          <SearchBar search={search} onSearchChange={handleSearch} />
        </div>

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">All Photos</h2>

          <p className="text-sm text-gray-600">{favorites.length} favourites</p>
        </div>

        {loading && (
          <div
            className="flex flex-col items-center justify-center py-16"
            role="status"
          >
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />

            <p className="mt-4 text-gray-600">Loading photos...</p>
          </div>
        )}

        {!loading && error && (
          <div
            className="rounded-lg bg-red-50 p-4 text-center text-red-700"
            role="alert"
          >
            {error}
          </div>
        )}

        {!loading && !error && filteredPhotos.length === 0 && (
          <p className="py-12 text-center text-gray-500">
            No photos found. Try another author name.
          </p>
        )}

        {!loading && !error && filteredPhotos.length > 0 && (
          <section
            aria-label="Photo gallery"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {filteredPhotos.map((photo) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                isFavorite={favoriteIds.has(photo.id)}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </section>
        )}
      </div>
    </main>
  );
}

export default Gallery;
