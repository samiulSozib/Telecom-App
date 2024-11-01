import { DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Icon,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  styled
} from "@mui/material";
import { Span } from "app/components/Typography";
import { useRef } from "react";
import { useEffect, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";

const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px"
}));

const AddForm = () => {
  const [state, setState] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef();

  const handleSubmit = (event) => {
    //console.log(state);
  };

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleDateChange = (date) => setState({ ...state, date });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const {
    reseller_name,
    contact_name,
    email,
    phone,
    country_id,
    province_id,
    districts_id,
    currency_preference_id
  } = state;

  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <Grid container justifyContent="center" sx={{ mb: 4 }}>
          {profileImage ? (
            <img
              src={profileImage}
              alt="Profile Preview"
              style={{ width: 100, height: 100, borderRadius: "50%" }}
            />
          ) : (
            <Button
              variant="outlined"
              component="label"
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "relative",
              }}
            >
              <Box sx={{ position: "relative", display: "inline-flex" }}>
                <Avatar
                  src={profileImage}
                  alt="Profile Preview"
                  sx={{ width: 100, height: 100 }}
                />
                {!profileImage && (
                  <Icon
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      fontSize: 24,
                      color: "primary.main",
                    }}
                  >
                    add
                  </Icon>
                )}
              </Box>
              <input
                type="file"
                accept="image/*"
                hidden
                ref={fileInputRef}
                onChange={handleImageChange}
              />
            </Button>
          )}
        </Grid>

        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField
              type="text"
              name="reseller_name"
              id="standard-basic"
              value={reseller_name || ""}
              onChange={handleChange}
              errorMessages={["this field is required"]}
              label="Reseller"
              validators={["required", "minStringLength: 4"]}
            />

            <TextField
              type="text"
              name="contact_name"
              label="Contact Name"
              onChange={handleChange}
              value={contact_name || ""}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />

            <TextField
              type="email"
              name="email"
              label="Email"
              value={email || ""}
              onChange={handleChange}
              validators={["required", "isEmail"]}
              errorMessages={["this field is required", "email is not valid"]}
            />

            <TextField
              sx={{ mb: 4 }}
              type="number"
              name="phone"
              label="Phone Number"
              onChange={handleChange}
              value={phone || ""}
              errorMessages={["this field is required"]}
              validators={["required"]}
            />
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <Select
              name="country_id"
              value={country_id || ""}
              onChange={handleChange}
              displayEmpty
              fullWidth
              sx={{ mb: "16px" }}
            >
              <MenuItem value="">Select Country</MenuItem>
              <MenuItem value="option1">Option 1</MenuItem>
              <MenuItem value="option2">Option 2</MenuItem>
              <MenuItem value="option3">Option 3</MenuItem>
            </Select>
            
            <Select
              name="province_id"
              value={province_id || ""}
              onChange={handleChange}
              displayEmpty
              fullWidth
              sx={{ mb: "16px" }}
            >
              <MenuItem value="">Select Province</MenuItem>
              <MenuItem value="option1">Option 1</MenuItem>
              <MenuItem value="option2">Option 2</MenuItem>
              <MenuItem value="option3">Option 3</MenuItem>
            </Select>

            <Select
              name="districts_id"
              value={districts_id || ""}
              onChange={handleChange}
              displayEmpty
              fullWidth
              sx={{ mb: "16px" }}
            >
              <MenuItem value="">Select District</MenuItem>
              <MenuItem value="option1">Option 1</MenuItem>
              <MenuItem value="option2">Option 2</MenuItem>
              <MenuItem value="option3">Option 3</MenuItem>
            </Select>

            <Select
              name="currency_preference_id"
              value={currency_preference_id || "option1"}
              onChange={handleChange}
              displayEmpty
              fullWidth
              sx={{ mb: "16px" }}
            >
              <MenuItem value="option1">Option 1</MenuItem>
            </Select>
          </Grid>
        </Grid>

        <Button color="primary" variant="contained" type="submit">
          <Icon>send</Icon>
          <Span sx={{ pl: 1, textTransform: "capitalize" }}>Submit</Span>
        </Button>
      </ValidatorForm>
    </div>
  );
};

export default AddForm;
