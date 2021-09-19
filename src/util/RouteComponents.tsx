import React from "react";

export const Books = React.lazy(() => import("../components/Books"));
export const Character = React.lazy(() => import("../components/Character"));
export const Blog = React.lazy(() => import("../components/Blog"));
export const AddBlog = React.lazy(() => import("../components/AddBlog"));
export const AddBooks = React.lazy(() => import("../components/AddBooks"));
export const AddCharacter = React.lazy(
  () => import("../components/AddCharacter")
);
export const UpdateBlog = React.lazy(() => import("../components/UpdateBlog"));
export const UpdateBooks = React.lazy(
  () => import("../components/UpdateBooks")
);
export const UpdateCharacter = React.lazy(
  () => import("../components/UpdateCharacter")
);
