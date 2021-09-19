import { Chip } from "@material-ui/core";
import React from "react";
interface categoryProps {
  category: {
    id: string;
    title: string;
  };
  handleDelete: (id: string) => void;
}
const CategoriesCategory: React.FC<categoryProps> = (props) => {
  return (
    <Chip
      label={props.category.title}
      onDelete={() => props.handleDelete(props.category.id)}
    />
  );
};

export default CategoriesCategory;
