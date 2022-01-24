import {
  AppBar,
  Autocomplete,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
function App() {
  const [options, setOptions] = React.useState([]);
  // Run once on mount
  React.useEffect(() => {
    // Get request using axios to get all the companies
    // url: https://api.stag-os.org/maintainers/companies
    // method: GET
    // if status is 200, then set the options to the response.companies
    // else set the options to an empty array
    axios
      .get("https://api.stag-os.org/maintainers/companies")
      .then((response) => {
        if (response.status === 200) {
          setOptions(response.data.companies);
        } else {
          setOptions([]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const initialValues = {
    github_username: "",
    email: "",
    device_name: "",
    device_company: "",
    device_codename: "",
    device_tree: "",
    kernel: "",
    vendor: "",
    common_tree: "",
    common_vendor: "",
    other_dependencies: "",
    selinux_status: "permissive",
    status: "Applied",
    name: "",
    tg_username: "",
  };

  const validationSchema = Yup.object({
    github_username: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    device_name: Yup.string().required("Required"),
    device_company: Yup.string().required("Required"),
    device_codename: Yup.string().required("Required"),
    // Check if device_tree, kernel, vendor, common_tree, common_vendor is a url
    device_tree: Yup.string().url("Invalid URL").required("Required"),
    kernel: Yup.string().url("Invalid URL").required("Required"),
    vendor: Yup.string().url("Invalid URL").required("Required"),
    common_tree: Yup.string().url("Invalid URL"),
    common_vendor: Yup.string().url("Invalid URL"),
    // Checl comma separated list of other dependencies if each is url
    other_dependencies: Yup.string(),
    // selinux_status enforcing or permissive
    selinux_status: Yup.string().required("Required"),
    name: Yup.string().required("Required"),
    tg_username: Yup.string().required("Required"),
  });

  const styles = {
    root: {
      // alignItems: "center",
      // justifyContent: "center",
      margin: 0,
      padding: 0,
      width: "100vw",
      height: "120vh",
    },
  };

  const onSubmit = (fields, { setSubmitting }) => {
    setSubmitting(false);
    console.log(fields);
    alert(JSON.stringify(fields, null, 2));
  };

  return (
    <div style={styles.root}>
      {/* Add a heading and a link in menu */}
      <AppBar position="static" color="primary">
        <h2 style={{ marginLeft: "10px" }}>Stag Maintainer Application</h2>
      </AppBar>
      <Formik
        style={{ marginTop: "10px", backgroundColor: "gray" }}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({
          values,
          errors,
          touched,
          isSubmitting,
          handleChange,
          handleBlur,
        }) => (
          <Form
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "10px",
              marginLeft: "10px",
            }}
          >
            <div>
              <TextField
                style={{ width: "50%" }}
                id="name"
                label="Name"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={
                  touched.name ? errors.name : "Please enter your name"
                }
                error={touched.name && Boolean(errors.name)}
                margin="normal"
              />
            </div>
            <div>
              <TextField
                style={{ width: "50%" }}
                id="tg_username"
                label="Telegram Username"
                name="tg_username"
                value={values.tg_username}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={
                  touched.tg_username
                    ? errors.tg_username
                    : "Please enter your Telegram username"
                }
                error={touched.tg_username && Boolean(errors.tg_username)}
                margin="normal"
              />
            </div>
            <div>
              <TextField
                style={{ width: "50%" }}
                id="email"
                label="Email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={
                  touched.email ? errors.email : "Please enter your email"
                }
                error={touched.email && Boolean(errors.email)}
                margin="normal"
              />
            </div>
            <div>
              <TextField
                style={{ width: "50%" }}
                id="github_username"
                label="Github Username"
                name="github_username"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.github_username}
                helperText={
                  touched.github_username
                    ? errors.github_username
                    : "Please enter your github username"
                }
                error={
                  touched.github_username && Boolean(errors.github_username)
                }
                variant="outlined"
                margin="normal"
              />
            </div>
            <div>
              <TextField
                style={{ width: "50%" }}
                id="device_name"
                label="Device Name"
                name="device_name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.device_name}
                helperText={
                  touched.device_name
                    ? errors.device_name
                    : "Please enter your device name (For Ex: OnePlus 9 Pro)"
                }
                error={touched.device_name && Boolean(errors.device_name)}
                variant="outlined"
                margin="normal"
              />
            </div>
            <div>
              <Autocomplete
                id="device_company_autoaomplete"
                options={options}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    style={{ width: "50%" }}
                    id="device_company"
                    label="Device Company"
                    name="device_company"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.device_company}
                    helperText={
                      touched.device_company
                        ? errors.device_company
                        : "Please enter your device company (For Ex: Google)"
                    }
                    error={
                      touched.device_company && Boolean(errors.device_company)
                    }
                    variant="outlined"
                    margin="normal"
                  />
                )}
              />
            </div>
            <div>
              <TextField
                style={{ width: "50%" }}
                id="device_codename"
                label="Device Codename"
                name="device_codename"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.device_codename}
                helperText={
                  touched.device_codename
                    ? errors.device_codename
                    : "Please enter your device codename (For Ex: lemonadep)"
                }
                error={
                  touched.device_codename && Boolean(errors.device_codename)
                }
                variant="outlined"
                margin="normal"
              />
            </div>
            <div>
              <TextField
                style={{ width: "50%" }}
                id="device_tree"
                label="Device Tree"
                name="device_tree"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.device_tree}
                helperText={
                  touched.device_tree
                    ? errors.device_tree
                    : "Please enter your device tree url"
                }
                error={touched.device_tree && Boolean(errors.device_tree)}
                variant="outlined"
                margin="normal"
              />
            </div>
            <div>
              <TextField
                style={{ width: "50%" }}
                id="kernel"
                label="Kernel"
                name="kernel"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.kernel}
                helperText={
                  touched.kernel
                    ? errors.kernel
                    : "Please enter your kernel tree link"
                }
                error={touched.kernel && Boolean(errors.kernel)}
                variant="outlined"
                margin="normal"
              />
            </div>
            <div>
              <TextField
                style={{ width: "50%" }}
                id="vendor"
                label="Vendor"
                name="vendor"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.vendor}
                helperText={
                  touched.vendor
                    ? errors.vendor
                    : "Please enter your vendor github link"
                }
                error={touched.vendor && Boolean(errors.vendor)}
                variant="outlined"
                margin="normal"
              />
            </div>
            <div>
              <TextField
                style={{ width: "50%" }}
                id="common_tree"
                label="Common Tree (Optional)"
                name="common_tree"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.common_tree}
                helperText={
                  touched.common_tree
                    ? errors.common_tree
                    : "Please enter your common tree link"
                }
                error={touched.common_tree && Boolean(errors.common_tree)}
                variant="outlined"
                margin="normal"
              />
            </div>
            <div>
              <TextField
                style={{ width: "50%" }}
                id="common_vendor"
                label="Common Vendor (Optional)"
                name="common_vendor"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.common_vendor}
                helperText={
                  touched.common_vendor
                    ? errors.common_vendor
                    : "Please enter your common vendor link"
                }
                error={touched.common_vendor && Boolean(errors.common_vendor)}
                variant="outlined"
                margin="normal"
              />
            </div>
            <div>
              {/* Take , separated links and store as array */}
              <TextField
                style={{ width: "50%" }}
                id="other_dependencies"
                label="Other Dependencies (Optional)"
                name="other_dependencies"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.other_dependencies}
                helperText={
                  touched.other_dependencies
                    ? errors.other_dependencies
                    : "Please enter your other dependencies"
                }
                error={
                  touched.other_dependencies &&
                  Boolean(errors.other_dependencies)
                }
                variant="outlined"
                margin="normal"
              />
            </div>
            <div>
              {/* Select field with Enforcing and Permissive for selinux_status */}
              <FormControl
                variant="outlined"
                style={{ width: "50%" }}
                margin="normal"
              >
                <InputLabel id="selinux_status">SELinux Status</InputLabel>
                <Select
                  labelId="selinux_status"
                  id="selinux_status"
                  name="selinux_status"
                  value={values.selinux_status}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <MenuItem value="enforcing">Enforcing</MenuItem>
                  <MenuItem value="permissive">Permissive</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div>
              {/* Submit Button */}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                Submit
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default App;
