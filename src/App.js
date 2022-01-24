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
    // Check comma separated list of other dependencies if each is url
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
      overflow: "auto",
      background: "#0ed2f7",
    },
  };

  const onSubmit = (fields, { setSubmitting }) => {
    setSubmitting(false);
    console.log(fields);
    alert(JSON.stringify(fields, null, 2));
  };

  const [width, setWidth] = React.useState(window.innerWidth);

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 768;

  return (
    <div style={styles.root}>
      {/* Add a heading and a link in menu */}
      {/* <AppBar position="static" color="primary">
        <h2 style={{ marginLeft: "10px" }}>Stag Maintainer Application</h2>
      </AppBar> */}
      <div
        style={{
          textAlign: "center",
          margin: "40px 0",
          fontSize: "2rem",
          color: "white",
          fontWeight: "600",
          // textShadow:
          // "-0.4px -0.4px 0 #000, 0.4px -0.4px 0 #000, -0.4px 0.4px 0 #000, 0.4px 0.4px 0 #000",
        }}
      >
        Stag Maintainer Application
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // margin: isMobile ? "0" : "40px 0",
          marginBottom: isMobile ? "10px" : "40px",
        }}
      >
        <Formik
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
                minWidth: isMobile ? "100vw" : "800px",
                padding: "20px",
                boxShadow:
                  "rgba(255, 255, 255, 0.4) -5px 5px, rgba(255, 255, 255, 0.3) -10px 10px, rgba(255, 255, 255, 0.2) -15px 15px, rgba(255, 255, 255, 0.1) -20px 20px, rgba(255, 255, 255, 0.05) -25px 25px",
                boxSizing: "border-box",
                background: "white",
              }}
            >
              <TextField
                // style={{ width: "50%" }}
                id="name"
                label="Name"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.name ? errors.name : ""}
                error={touched.name && Boolean(errors.name)}
                margin="normal"
              />
              <TextField
                // style={{ width: "50%" }}
                id="tg_username"
                label="Telegram Username"
                name="tg_username"
                value={values.tg_username}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.tg_username ? errors.tg_username : ""}
                error={touched.tg_username && Boolean(errors.tg_username)}
                margin="normal"
              />
              <TextField
                // style={{ width: "50%" }}
                id="email"
                label="Email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.email ? errors.email : ""}
                error={touched.email && Boolean(errors.email)}
                margin="normal"
              />
              <TextField
                // style={{ width: "50%" }}
                id="github_username"
                label="Github Username"
                name="github_username"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.github_username}
                helperText={
                  touched.github_username ? errors.github_username : ""
                }
                error={
                  touched.github_username && Boolean(errors.github_username)
                }
                variant="outlined"
                margin="normal"
              />
              <TextField
                // style={{ width: "50%" }}
                id="device_name"
                label="Device Name"
                name="device_name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.device_name}
                helperText={touched.device_name ? errors.device_name : ""}
                error={touched.device_name && Boolean(errors.device_name)}
                variant="outlined"
                margin="normal"
              />
              <Autocomplete
                id="device_company_autoaomplete"
                options={options}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    // style={{ width: "50%" }}
                    id="device_company"
                    label="Device Company"
                    name="device_company"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.device_company}
                    helperText={
                      touched.device_company ? errors.device_company : ""
                    }
                    error={
                      touched.device_company && Boolean(errors.device_company)
                    }
                    variant="outlined"
                    margin="normal"
                  />
                )}
              />
              <TextField
                // style={{ width: "50%" }}
                id="device_codename"
                label="Device Codename"
                name="device_codename"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.device_codename}
                helperText={
                  touched.device_codename ? errors.device_codename : ""
                }
                error={
                  touched.device_codename && Boolean(errors.device_codename)
                }
                variant="outlined"
                margin="normal"
              />
              <TextField
                // style={{ width: "50%" }}
                id="device_tree"
                label="Device Tree"
                name="device_tree"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.device_tree}
                helperText={touched.device_tree ? errors.device_tree : ""}
                error={touched.device_tree && Boolean(errors.device_tree)}
                variant="outlined"
                margin="normal"
              />
              <TextField
                // style={{ width: "50%" }}
                id="kernel"
                label="Kernel"
                name="kernel"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.kernel}
                helperText={touched.kernel ? errors.kernel : ""}
                error={touched.kernel && Boolean(errors.kernel)}
                variant="outlined"
                margin="normal"
              />
              <TextField
                // style={{ width: "50%" }}
                id="vendor"
                label="Vendor"
                name="vendor"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.vendor}
                helperText={touched.vendor ? errors.vendor : ""}
                error={touched.vendor && Boolean(errors.vendor)}
                variant="outlined"
                margin="normal"
              />
              <TextField
                // style={{ width: "50%" }}
                id="common_tree"
                label="Common Tree (Optional)"
                name="common_tree"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.common_tree}
                helperText={touched.common_tree ? errors.common_tree : ""}
                error={touched.common_tree && Boolean(errors.common_tree)}
                variant="outlined"
                margin="normal"
              />
              <TextField
                // style={{ width: "50%" }}
                id="common_vendor"
                label="Common Vendor (Optional)"
                name="common_vendor"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.common_vendor}
                helperText={touched.common_vendor ? errors.common_vendor : ""}
                error={touched.common_vendor && Boolean(errors.common_vendor)}
                variant="outlined"
                margin="normal"
              />
              {/* Take , separated links and store as array */}
              <TextField
                // style={{ width: "50%" }}
                id="other_dependencies"
                label="Other Dependencies (Optional)"
                name="other_dependencies"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.other_dependencies}
                helperText={
                  touched.other_dependencies ? errors.other_dependencies : ""
                }
                error={
                  touched.other_dependencies &&
                  Boolean(errors.other_dependencies)
                }
                variant="outlined"
                margin="normal"
              />
              {/* Select field with Enforcing and Permissive for selinux_status */}
              <FormControl
                variant="outlined"
                // style={{ width: "50%" }}
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
              {/* Submit Button */}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default App;
