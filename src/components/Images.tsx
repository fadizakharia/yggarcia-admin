import {
  Button,
  Card,
  CardActionArea,
  CardMedia,
  createStyles,
  Grid,
  makeStyles,
  Modal,
  Theme,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      zIndex: theme.zIndex.drawer + 1,
      color: "black",
      backgroundColor: "RGBA(0,0,0,0.5)",
      overflow: "scroll",
      padding: "50px",
    },
    imageList: {
      padding: "10px",
    },
    root: {
      backgroundColor: "white",
      padding: "10px",
      width: "100%",
      height: "100%",
      overflow: "scroll",
    },
    imageItem: {
      overflow: "hidden",

      alignContent: "center",
    },
    image: {
      width: 200,
      height: 200,
      objectFit: "scale-down",
    },
    gridActions: {
      marginTop: "30px",
    },
  })
);
interface ImageProps {
  images: any[];
  handleImageRemoval: (image: any) => void;
  handleImageAddition: (image: any) => void;
  handleClose: () => void;
  open: boolean;
}

const Images: React.FC<ImageProps> = (props) => {
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState<any[]>();
  useEffect(() => {
    setOpen(props.open);
    setImages(props.images);
    return () => {};
  }, [props.open, JSON.stringify(props.images)]);
  console.log(props.images);

  const styles = useStyles();
  return (
    <Modal className={styles.drawer} open={open} onClose={props.handleClose}>
      <div className={styles.root}>
        <Grid container className={styles.imageList} spacing={4}>
          <Grid item key="Subheader" xs={12}>
            <Typography>images</Typography>
          </Grid>
          {props.images.length > 0 && images ? (
            images.map((image) => {
              return (
                <Grid item key={image.key} xs={12} sm={6} md={4} lg={3}>
                  <Card>
                    <CardMedia className={styles.imageItem}>
                      <img className={styles.image} src={image.imageUrl} />
                    </CardMedia>
                    <CardActionArea
                      onClick={() => {
                        props.handleImageRemoval(image.id);
                      }}
                    >
                      <Typography variant="h6" color="primary">
                        Delete
                      </Typography>
                    </CardActionArea>
                  </Card>
                </Grid>
              );
            })
          ) : (
            <Grid xs={12}>
              <Typography>No images found!</Typography>
            </Grid>
          )}
          <Grid className={styles.gridActions} container spacing={4}>
            <Grid style={{ textAlign: "right" }} item xs={6}>
              <Button
                onClick={() => {
                  setOpen((prev) => !prev);
                }}
                variant="text"
                color="primary"
              >
                Close
              </Button>
            </Grid>
            <Grid style={{ textAlign: "left", zIndex: 4 }} item xs={6}>
              <input
                style={{ display: "none" }}
                accept="image/*"
                id="raised-button-file"
                type="file"
                onChange={props.handleImageAddition}
              />
              <label htmlFor="raised-button-file">
                <Button variant="outlined" component="span">
                  Upload Image
                </Button>
              </label>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Modal>
  );
};

export default Images;
