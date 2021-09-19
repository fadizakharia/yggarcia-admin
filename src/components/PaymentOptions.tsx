import {
  Avatar,
  Backdrop,
  Button,
  createStyles,
  Grid,
  makeStyles,
  Modal,
  TextField,
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

      padding: "50px",
    },
    paymentGrid: {
      backgroundColor: "white",
      padding: "10px",
    },
    paymentInputWrapper: {
      zIndex: theme.zIndex.drawer + 2,
      textAlign: "center",
    },
    paymentInput: {},
    paymentInputUrl: {},
    root: {
      backgroundColor: "white",
      padding: "10px",
      width: "100%",
      height: "100%",
    },
  })
);
function PaymentOptions(props: {
  purchase_options?: {
    id: string;
    title: string;
    url: string;
    iconUrl: string;
  }[];
  popoverState: boolean;
  handleClose: () => void;
  addPaymentOption: (image: File, url: string) => void;
  deletePaymentOption: (id: string) => void;
}) {
  const styles = useStyles();
  const [file, setFile] = useState<File | undefined>();
  const [url, setUrl] = useState<string | undefined>();
  const [open, setOpen] = useState<boolean>(false);
  const [purchaseOptions, setPurchaseOptions] =
    useState<typeof props["purchase_options"]>();
  const handleFileChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    if (ev.target.files && ev.target.files.length > 0) {
      setFile(ev.target.files[0]);
    }
  };
  const handleUrlChange = async (ev: React.ChangeEvent<HTMLInputElement>) => {
    console.log(ev.target.value.toString());

    setUrl(ev.target.value);
  };
  useEffect(() => {
    setOpen(props.popoverState);

    return () => {};
  }, [props.popoverState]);
  useEffect(() => {
    if (props.purchase_options && props.purchase_options.length > 0) {
      setPurchaseOptions(props.purchase_options);
    }

    return () => {};
  }, [
    props.purchase_options &&
      props.purchase_options.length > 0 && [...props.purchase_options],
  ]);
  return (
    <Modal className={styles.drawer} open={open} onClose={props.handleClose}>
      <Grid
        className={styles.paymentGrid}
        container
        spacing={1}
        alignItems="center"
      >
        {props.purchase_options && props.purchase_options.length > 0 ? (
          props.purchase_options.map((option) => {
            return (
              <Grid key={option.title} item>
                <a href={option.url}>
                  <Avatar style={{ margin: "0 auto" }} src={option.iconUrl} />
                </a>
                <Button onClick={() => props.deletePaymentOption(option.id)}>
                  Remove
                </Button>
              </Grid>
            );
          })
        ) : (
          <Typography align="center">No purchase options found</Typography>
        )}
        <Grid className={styles.paymentInputWrapper} container spacing={1}>
          <Grid
            className={styles.paymentInput}
            alignItems="center"
            xs={12}
            item
          >
            <input
              style={{ display: "none" }}
              accept="image/*"
              id="icon-input"
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="icon-input">
              <Button variant="outlined" component="span">
                Upload Icon
              </Button>
            </label>
          </Grid>
          <Grid className={styles.paymentInputUrl} xs={12} item>
            <TextField
              variant="outlined"
              value={url}
              onChange={handleUrlChange}
              id="icon_url"
              label="url"
            />
          </Grid>
          <Grid xs={12} item>
            <Button
              onClick={() => {
                if (file && url) props.addPaymentOption(file, url);
              }}
              variant="contained"
            >
              add option
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Modal>
  );
}

export default PaymentOptions;
