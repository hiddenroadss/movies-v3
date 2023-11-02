import { MovieFromDb } from "@shared/types";

export function createFileFromBlob(selectedPosterBlob: Blob, selected: MovieFromDb) {
    return new File([selectedPosterBlob],
      `${selected.poster_path.split('/').at(-1)}`,
      {
        type: selectedPosterBlob.type,
      });
  }