import { useQuery } from "@apollo/client";
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
import moment from "moment";
import React from "react";
import { ObjectSchema } from "yup";
import { getCategoriesQuery } from "../api/Graphql/Queries";
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
interface characterProps {
  character?: characterState;
  handler: (values: any) => void;
  validationSchema: ObjectSchema<any, any>;
}
const CharacterForm: React.FC<characterProps> = (props) => {
  console.log(props.character);
  const catQuery = useQuery(getCategoriesQuery);
  console.log(props.character?.date_of_birth);

  const styles = useStyles();
  return (
    <Formik
      initialValues={{
        name:
          props.character && props.character.name ? props.character.name : "",
        gender:
          props.character && props.character.gender
            ? props.character.gender
            : "",
        color:
          props.character && props.character.color ? props.character.color : "",
        ethnicity:
          props.character && props.character.ethnicity
            ? props.character.ethnicity
            : "",
        bio: props.character && props.character.bio ? props.character.bio : "",
        date_of_birth:
          props.character && props.character.date_of_birth
            ? moment(props.character.date_of_birth).format("YYYY-MM-DD")
            : moment(moment.now()).format("YYYY-MM-DD"),
        category:
          props.character && props.character.category
            ? props.character.category.id
            : "none",
      }}
      onSubmit={(values, { validateForm }) => {
        console.log(values);

        if (props.character?.id) {
          props.handler({
            ...values,
            id: props.character.id,
          });
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
          handleChange,
          handleBlur,
          handleSubmit,
        } = props;

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
                  label="Full Name *"
                  name="name"
                  variant="standard"
                  value={values.name}
                  placeholder={initialValues.name}
                  InputLabelProps={{
                    className: styles.TextFieldLabel,
                  }}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={styles.TextField}
                  helperText={errors.name && touched.name && errors.name}
                  FormHelperTextProps={{
                    style: { color: "red", opacity: 0.5 },
                  }}
                  error={errors.name ? true : false}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Gender *"
                  name="gender"
                  value={values.gender}
                  placeholder={initialValues.gender}
                  variant="standard"
                  InputLabelProps={{ className: styles.TextFieldLabel }}
                  className={styles.TextField}
                  FormHelperTextProps={{
                    style: { color: "red", opacity: 0.5 },
                  }}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={errors.gender && touched.gender && errors.gender}
                  error={errors.gender && touched.gender ? true : false}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Ethnicity *"
                  name="ethnicity"
                  value={values.ethnicity}
                  variant="standard"
                  placeholder={initialValues.ethnicity}
                  InputLabelProps={{ className: styles.TextFieldLabel }}
                  className={styles.TextField}
                  FormHelperTextProps={{
                    style: { color: "red", opacity: 0.5 },
                  }}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    errors.ethnicity && touched.ethnicity && errors.ethnicity
                  }
                  error={errors.ethnicity && touched.ethnicity ? true : false}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Color *"
                  name="color"
                  value={values.color}
                  variant="standard"
                  placeholder={initialValues.color}
                  InputLabelProps={{ className: styles.TextFieldLabel }}
                  className={styles.TextField}
                  FormHelperTextProps={{
                    style: { color: "red", opacity: 0.5 },
                  }}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={errors.color && touched.color && errors.color}
                  error={errors.color && touched.color ? true : false}
                  margin="normal"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Bio *"
                  name="bio"
                  multiline
                  minRows={15}
                  maxRows={50}
                  value={values.bio}
                  variant="outlined"
                  placeholder={initialValues.bio}
                  InputLabelProps={{
                    className: styles.TextFieldLabel,
                  }}
                  className={styles.TextArea}
                  FormHelperTextProps={{
                    style: { color: "red", opacity: 0.5 },
                  }}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={errors.bio && touched.bio && errors.bio}
                  error={errors.bio && touched.bio ? true : false}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="date"
                  label="Birthday"
                  type="date"
                  defaultValue={initialValues.date_of_birth}
                  onChange={(value) =>
                    props.setFieldValue("date_of_birth", value.target.value)
                  }
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  className={styles.TextField}
                  variant="standard"
                  name="category"
                  color="primary"
                  SelectProps={{
                    className: styles.select,
                  }}
                  onChange={handleChange}
                  select
                  label="category"
                  value={values.category}
                >
                  <MenuItem key={"none"} value={"none"}>
                    none
                  </MenuItem>
                  {catQuery.data &&
                    catQuery.data.getCategories &&
                    catQuery.data.getCategories.map((cat: any) => {
                      return (
                        <MenuItem key={cat.title} value={cat.id}>
                          {cat.title}
                        </MenuItem>
                      );
                    })}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <Button
                  className={styles.buttonAction}
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={
                    !!errors.name ||
                    !!errors.bio ||
                    !!errors.color ||
                    !!errors.ethnicity ||
                    !!errors.date_of_birth ||
                    !!errors.gender
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

export default CharacterForm;
