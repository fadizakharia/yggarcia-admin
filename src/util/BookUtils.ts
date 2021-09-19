export function getBookStatus(status: number) {
  switch (status) {
    case 0:
      return "Coming Soon";
    case 1:
      return "pre-order";
    case 2:
      return "Available";
  }
}
export function getBookReverseStatus(status: string) {
  switch (status) {
    case "Coming Soon":
      return 0;
    case "pre-order":
      return 1;
    case "Available":
      return 2;
  }
}
export function getBookGenres(genres: [{ id: string; title: string }]) {
  let genresStr = "";
  genres.forEach((genre, index) => {
    if (index === 0) {
      genresStr.concat(genre.title);
    } else {
      genresStr.concat(`, ${genre.title}`);
    }
  });
  return genresStr;
}
