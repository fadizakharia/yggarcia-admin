import React, { useEffect, useState } from "react";
import {
  Button,
  createStyles,
  FormControl,
  Grid,
  makeStyles,
  Modal,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import CategoriesCategory from "./CategoriesCategory";
interface categoriesProps {
  categories: {
    id: string;
    title: string;
  }[];
  handleDelete: (id: string) => void;
  handleAddition: (title: string) => void;
  handleClose: () => void;
  open: boolean;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      zIndex: theme.zIndex.drawer + 1,
      color: "black",
      backgroundColor: "RGBA(0,0,0,0.5)",

      padding: "50px",
    },
    root: {
      backgroundColor: "white",
      padding: "10px",
    },
    categoriesForm: {
      textAlign: "center",
    },
  })
);
const Categories: React.FC<categoriesProps> = (props) => {
  const styles = useStyles();
  const [categoryTitle, setCategoryTitle] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [categories, setCategories] = useState<
    {
      id: string;
      title: string;
    }[]
  >([]);
  useEffect(() => {
    if (props.categories) {
      setCategories(props.categories);
      setOpen(props.open);
    } else {
      setCategories([]);
    }
    return () => {};
  }, [...props.categories, props.open]);
  return (
    <Modal className={styles.drawer} open={open} onClose={props.handleClose}>
      <Grid className={styles.root} container>
        {categories.length > 0 ? (
          categories.map((cat) => {
            return (
              <Grid item xs={2}>
                <CategoriesCategory
                  category={cat}
                  handleDelete={props.handleDelete}
                />
              </Grid>
            );
          })
        ) : (
          <Typography variant="h4">No Categories!</Typography>
        )}

        <Grid item className={styles.categoriesForm} xs={12}>
          <FormControl>
            <TextField
              style={{ margin: "10px" }}
              value={categoryTitle}
              onChange={(ev) => setCategoryTitle(ev.target.value)}
              label="category title"
              variant="filled"
            />
            <Button
              variant="outlined"
              onClick={() => props.handleAddition(categoryTitle)}
            >
              add
            </Button>
          </FormControl>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default Categories;
