import React from "react";
import {
  Autocomplete,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Container,
  Paper,
  ThemeProvider,
  createTheme,
  Box,
  Grid,
} from "@mui/material";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0077be",
    },
    secondary: {
      main: "#00a86b",
    },
    background: {
      default: "#e0f7fa",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
      color: "#00558b",
    },
  },
});

const OceanBackground = () => (
  <Box
    sx={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: -1,
      background: "linear-gradient(to bottom, #e0f7fa 0%, #80deea 100%)",
      overflow: "hidden",
    }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 320"
      style={{
        position: "absolute",
        bottom: 0,
      }}
    >
      <path
        fill="#0099ff"
        fillOpacity="0.5"
        d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,213.3C1248,235,1344,213,1392,202.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
      >
        <animate
          attributeName="d"
          dur="10s"
          repeatCount="indefinite"
          values="
            M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,213.3C1248,235,1344,213,1392,202.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
            M0,64L48,96C96,128,192,192,288,192C384,192,480,128,576,122.7C672,117,768,171,864,181.3C960,192,1056,160,1152,149.3C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
            M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,213.3C1248,235,1344,213,1392,202.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
      </path>
    </svg>
  </Box>
);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <HashRouter>
        <OceanBackground />
        <Box sx={{ position: "relative", minHeight: "100vh" }}>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="status" element={<Status />} />
          </Routes>
        </Box>
      </HashRouter>
    </ThemeProvider>
  );
}

function Status() {
  const [id, setId] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [review, setReview] = React.useState("");

  const handleGetStatus = () => {
    setStatus("Loading...");
    axios
      .get(`https://api.stag-os.org/maintainers/status/${id}`)
      .then((res) => {
        if (res.data.maintainer) {
          setStatus(res.data.maintainer[0].status);
          setReview(res.data.maintainer[0].review || "");
        } else setStatus(res.data.message);
      })
      .catch(() => {
        setStatus("User not found");
      });
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          textAlign: "center",
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: "100%" }}>
          <Typography variant="h4" gutterBottom>
            Check Application Status
          </Typography>
          <TextField
            fullWidth
            label="ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleGetStatus}
            sx={{ mt: 2, mb: 3 }}
          >
            Get Status
          </Button>
          <Typography variant="h5" gutterBottom>
            {status}
          </Typography>
          <Typography variant="body1">{review}</Typography>
        </Paper>
      </Box>
    </Container>
  );
}

function Main() {
  const [options, setOptions] = React.useState([]);
  React.useEffect(() => {
    axios
      .get("https://api.stag-os.org/maintainers/companies")
      .then((response) => {
        if (response.status === 200) {
          setOptions(response.data.companies);
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
    device_tree: Yup.string().url("Invalid URL").required("Required"),
    kernel: Yup.string().url("Invalid URL").required("Required"),
    vendor: Yup.string().url("Invalid URL").required("Required"),
    common_tree: Yup.string().url("Invalid URL"),
    common_vendor: Yup.string().url("Invalid URL"),
    other_dependencies: Yup.string(),
    selinux_status: Yup.string().required("Required"),
    name: Yup.string().required("Required"),
    tg_username: Yup.string().required("Required"),
  });

  const onSubmit = (fields, { setSubmitting }) => {
    setSubmitting(false);
    fields.other_dependencies = fields.other_dependencies.split(/[, ]+/);
    axios
      .post("https://api.stag-os.org/maintainers/apply", fields)
      .then((response) => {
        if (response.status === 403 || response.data?.status === 403) {
          alert(response.data.message);
        } else {
          alert(
            "Form submitted successfully, please check your email\nIf not received please check your spam folder"
          );
        }
      })
      .catch((error) => {
        if (error.response.status === 403) {
          alert(error.response.data.message);
        }
      });
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ textAlign: "center", my: 4 }}>
        <Typography variant="h4" gutterBottom>
          StagOS 14 Maintainer Application
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            window.location.href = "/#/status";
          }}
          sx={{ mt: 2 }}
        >
          Check Existing Application
        </Button>
      </Box>

      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
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
            <Form>
              <Grid container spacing={3}>
                {[
                  { name: "name", label: "Name" },
                  { name: "tg_username", label: "Telegram Username" },
                  { name: "email", label: "Email" },
                  { name: "github_username", label: "Github Username" },
                  { name: "device_name", label: "Device Name" },
                  { name: "device_codename", label: "Device Codename" },
                  { name: "device_tree", label: "Device Tree" },
                  { name: "kernel", label: "Kernel" },
                  { name: "vendor", label: "Vendor" },
                  { name: "common_tree", label: "Common Tree (Optional)" },
                  { name: "common_vendor", label: "Common Vendor (Optional)" },
                  {
                    name: "other_dependencies",
                    label: "Other Dependencies (Optional)",
                  },
                ].map((field) => (
                  <Grid item xs={12} sm={6} key={field.name}>
                    <TextField
                      fullWidth
                      id={field.name}
                      name={field.name}
                      label={field.label}
                      value={values[field.name]}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched[field.name] && Boolean(errors[field.name])}
                      helperText={touched[field.name] && errors[field.name]}
                    />
                  </Grid>
                ))}

                <Grid item xs={12} sm={6}>
                  <Autocomplete
                    freeSolo
                    id="device_company_autocomplete"
                    options={options}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="device_company"
                        label="Device Company"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          touched.device_company &&
                          Boolean(errors.device_company)
                        }
                        helperText={
                          touched.device_company && errors.device_company
                        }
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
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
                </Grid>
              </Grid>

              <Box sx={{ mt: 3, textAlign: "center" }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  size="large"
                >
                  Submit Application
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
}

export default App;
