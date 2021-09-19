import React from "react";
import {
  Button,
  createStyles,
  Grid,
  makeStyles,
  MenuItem,
  TextField,
  Theme,
} from "@material-ui/core";
import { Formik } from "formik";
import { ObjectSchema } from "yup";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    TextField: {
      color: theme.palette.primary.main,
      margin: "10px",
    },
    TextFieldLabel: {
      color: theme.palette.primary.main,
      opacity: 0.5,
    },
    select: {
      margin: "16px 0",
      minWidth: "170px",
      maxWidth: "400px",
      textAlign: "left",
      [theme.breakpoints.down("xs")]: {
        minWidth: "110px",
      },
    },
    buttonAction: {
      display: "block",
      margin: "20px auto",
    },
    TextArea: {
      width: "100%",
    },
    form: {
      width: "50vw",
      margin: "10px auto",
      backgroundColor: theme.palette.background.default,
    },
  })
);
const BookForm: React.FC<{
  id?: string;
  body?: string;
  header?: string;
  status?: number;
  subtitle?: string;
  title?: string;
  genres?: string;
  warning_message?: string;
  validationSchema: ObjectSchema<any, any>;
  handler: (values: {
    id?: string;
    body: string;
    header: string;
    status: number;
    subtitle: string;
    genres?: string;
    title: string;
    warning_message: string;
  }) => void;
}> = (props) => {
  const styles = useStyles();

  return (
    <Formik
      initialValues={{
        body: props && props.body ? props.body : "",
        header: props && props.header ? props.header : "",
        status: props && props.status ? props.status : 0,
        subtitle: props && props.subtitle ? props.subtitle : "",
        title: props && props.title ? props.title : "",
        genres: props && props.genres ? props.genres : "",
        warning_message:
          props && props.warning_message ? props.warning_message : "",
      }}
      onSubmit={(values, { validateForm }) => {
        if (props.id) {
          props.handler({ ...values, id: props.id });
        } else {
          props.handler(values);
        }
      }}
      validationSchema={props.validationSchema}
      validateOnBlur={true}
      validateOnChange={true}
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          initialValues,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
        } = props;
        console.log(initialValues.status);

        return (
          <form
            className={styles.form}
            onSubmit={(event) => {
              event.preventDefault();
              return handleSubmit(event);
            }}
          >
            <Grid container>
              {/* <Grid> */}
              <Grid item xs={6}>
                <TextField
                  label="Title *"
                  name="title"
                  variant="standard"
                  value={values.title}
                  placeholder={initialValues.title}
                  InputLabelProps={{
                    className: styles.TextFieldLabel,
                  }}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={styles.TextField}
                  helperText={errors.title && touched.title && errors.title}
                  FormHelperTextProps={{
                    style: { color: "red", opacity: 0.5 },
                  }}
                  error={errors.title ? true : false}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Subtitle *"
                  name="subtitle"
                  value={values.subtitle}
                  placeholder={initialValues.subtitle}
                  variant="standard"
                  InputLabelProps={{ className: styles.TextFieldLabel }}
                  className={styles.TextField}
                  FormHelperTextProps={{
                    style: { color: "red", opacity: 0.5 },
                  }}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    errors.subtitle && touched.subtitle && errors.subtitle
                  }
                  error={errors.subtitle && touched.subtitle ? true : false}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Header *"
                  name="header"
                  value={values.header}
                  variant="standard"
                  placeholder={initialValues.header}
                  InputLabelProps={{ className: styles.TextFieldLabel }}
                  className={styles.TextField}
                  FormHelperTextProps={{
                    style: { color: "red", opacity: 0.5 },
                  }}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={errors.header && touched.header && errors.header}
                  error={errors.header && touched.header ? true : false}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  className={styles.TextField}
                  variant="standard"
                  name="status"
                  color="primary"
                  SelectProps={{
                    className: styles.select,
                  }}
                  select
                  value={values.status}
                  onChange={handleChange}
                  error={touched.status && Boolean(errors.status)}
                  helperText={touched.status && errors.status}
                >
                  <MenuItem key={"coming_soon"} value={0}>
                    Coming Soon
                  </MenuItem>
                  <MenuItem key={"pre_order"} value={1}>
                    Pre-order
                  </MenuItem>
                  <MenuItem key={"Available"} value={2}>
                    Available
                  </MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Description *"
                  name="body"
                  multiline
                  minRows={15}
                  maxRows={50}
                  value={values.body}
                  variant="outlined"
                  placeholder={initialValues.body}
                  InputLabelProps={{
                    className: styles.TextFieldLabel,
                  }}
                  className={styles.TextArea}
                  FormHelperTextProps={{
                    style: { color: "red", opacity: 0.5 },
                  }}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={errors.body && touched.body && errors.body}
                  error={errors.body && touched.body ? true : false}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Warning text"
                  name="warning_message"
                  placeholder={initialValues.warning_message}
                  value={values.warning_message}
                  variant="standard"
                  fullWidth
                  InputLabelProps={{ className: styles.TextFieldLabel }}
                  className={styles.TextField}
                  FormHelperTextProps={{
                    style: { color: "red", opacity: 0.5 },
                  }}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    errors.warning_message &&
                    touched.warning_message &&
                    errors.warning_message
                  }
                  error={
                    errors.warning_message && touched.warning_message
                      ? true
                      : false
                  }
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="genres"
                  name="genres"
                  placeholder={initialValues.genres}
                  value={values.genres}
                  variant="standard"
                  fullWidth
                  InputLabelProps={{ className: styles.TextFieldLabel }}
                  className={styles.TextField}
                  FormHelperTextProps={{
                    style: { color: "black", opacity: 0.5 },
                  }}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={`please seperate each genre by a ","`}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  className={styles.buttonAction}
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={
                    !!errors.title ||
                    !!errors.subtitle ||
                    !!errors.body ||
                    !!errors.header ||
                    !!errors.status ||
                    !!errors.subtitle ||
                    !!errors.title ||
                    !!errors.warning_message
                  }
                >
                  Submit
                </Button>
              </Grid>
              {/* </Grid> */}
            </Grid>
          </form>
        );
      }}
    </Formik>
  );
};

export default BookForm;
