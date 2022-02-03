import React from "react";
import PropTypes from "prop-types";
import axios from "axios";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

// @material-ui/icons
import Email from "@material-ui/icons/Email";
import Check from "@material-ui/icons/Check";
import Face from "@material-ui/icons/Face";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";

// core components
import GridContainer from "./../../components/Grid/GridContainer.jsx";
import GridItem from "./../../components/Grid/GridItem.jsx";
import CustomInput from "./../../components/CustomInput/CustomInput.jsx";
import Button from "./../../components/CustomButtons/Button.jsx";
import Card from "./../../components/Card/Card.jsx";
import CardBody from "./../../components/Card/CardBody.jsx";
import CardHeader from "./../../components/Card/CardHeader.jsx";
import CardFooter from "./../../components/Card/CardFooter.jsx";

import registerPageStyle from "./../../assets/jss/material-dashboard-react/views/registerPageStyle.jsx";
import { useAppDispatch, useAppSelector } from "../../store/hooks.js";
import { signup as signupAPI } from "./thunk.js";
import { selectlogin, selectLoginResponse, selectloginStatus, selectloginError, selectloginResponseMessage } from './slice';
import { showErrorMessage, showSuccessMessage } from './../../utils/message';
import { useHistory } from "react-router";

// const { REACT_APP_SERVER_URL } = process.env;

const RegisterPage = (props) =>  {
  const { classes } = props;
  const [checked, setCheck] = React.useState([]);
  const [errors, setErrors] = React.useState({});
  const [role, setRole] = React.useState("");
  //role state
  const history = useHistory()
  const dispatch = useAppDispatch();  
  const userProfile = useAppSelector(selectLoginResponse)
  const loginStatusString = useAppSelector(selectloginStatus)
  const loginStatus = useAppSelector(selectlogin)
  const loginError = useAppSelector(selectloginError)
  const loginErrorMessage = useAppSelector(selectloginResponseMessage)
  // constructor(props) {
  //   super(props);
  //   state = {
  //     checked: [],
  //     errors: {}
  //   };
  // }

  React.useEffect(() => {
    console.log("userProfile", userProfile);
  }, [userProfile]);

  const handleChange = event => {
    setRole(event.target.value);
  };


  
  React.useEffect(() => {
    localStorage.getItem("token") && history.push("/dashboard");
    console.log("loginError)_____", loginError);
    if(loginError)  showErrorMessage(loginErrorMessage) 

    if(loginStatus) {
      showSuccessMessage("Login Successful")
      localStorage.setItem("token", userProfile.token);
      history.push("/dashboard");
    }
  } , [loginStatus, loginError])

  const register = async e => {
    e.preventDefault();
    console.log("e");
    console.log(["username","email", "getPassword", "confirmPassword","role"].map(el => e.target.elements.namedItem(el).value));


    const fields = ["username","email", "getPassword", "confirmPassword","role"];
    const formElements = e.target.elements;

    const formValues = fields
      .map(field => ({
        [field]: formElements.namedItem(field).value
      }))
      .reduce((current, next) => ({ ...current, ...next }));

      /**
       * "username": "user2",
    "email": "user2@gmail.com",
    "password": "pass123pass123",
    "confirmPassword": "pass123pass123",
    "role": "buyer"
       */
    let registerRequest;
    try {
      const {getPassword, ...restProps} = formValues
      const payload = {
        ...restProps,
        password: getPassword,
      }
      
      console.log(payload);
      dispatch(signupAPI(payload));
      // registerRequest = await axios.post(`http://${REACT_APP_SERVER_URL}/register`, {...formValues});

    } catch ({ response }) {
      registerRequest = response;
    }
    const { data: registerRequestData } = registerRequest;
    if (registerRequestData.success) {
      return history.push("/login");
    }
    setErrors(registerRequestData.messages.errors)
    // setState({
    //   errors:
    //     registerRequestData.messages && registerRequestData.messages.errors
    // });
  };
  const handleToggle = value => {
    // const { checked } = state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setCheck(newChecked);
    // setState({
    //   checked: newChecked
    // });
  };

    return (
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={6} md={4}>
            <form onSubmit={register}>
              <Card className={classes["state.cardAnimaton"]}>
                <CardHeader
                  className={`${classes.cardHeader} ${classes.textCenter}`}
                  color="primary"
                >
                  <h4 className={classes.cardTitle}>Register</h4>
                  <div className={classes.socialLine}>
                    {[
                      "fa fa-facebook-square",
                      "fa fa-twitter",
                      "fa fa-google-plus"
                    ].map((prop, key) => {
                      return (
                        <Button
                          color="transparent"
                          justIcon
                          key={key}
                          className={classes.customButtonClass}
                        >
                          <i className={prop} />
                        </Button>
                      );
                    })}
                  </div>
                </CardHeader>
                <CardBody>
                  <p className={classes.cardDescription}>Or Be Classical</p>
                  {/* username */}
                  <CustomInput
                    labelText="Username..."
                    id="name"
                    formControlProps={{
                      fullWidth: true,
                      className: classes.formControlClassName
                    }}
                    inputProps={{
                      required: true,
                      name: "username",
                      type: "text",
                      endAdornment: (
                        <InputAdornment position="end">
                          <Face className={classes.inputAdornmentIcon} />
                        </InputAdornment>
                      )
                    }}
                  />
                  {/* email */}
                  <CustomInput
                    labelText="Email..."
                    id="email"
                    formControlProps={{
                      fullWidth: true,
                      className: classes.formControlClassName
                    }}
                    error={errors.username}
                    inputProps={{
                      required: true,
                      type: "email",
                      name: "email",
                      endAdornment: (
                        <InputAdornment position="end">
                          <Email className={classes.inputAdornmentIcon} />
                        </InputAdornment>
                      )
                    }}
                  />
                  {/* password */}
                  <CustomInput
                    labelText="Password..."
                    id="password"
                    formControlProps={{
                      fullWidth: true,
                      className: classes.formControlClassName
                    }}
                    error={errors.password}
                    inputProps={{
                      required: true,
                      name: "getPassword",
                      type: "password",
                      endAdornment: (
                        <InputAdornment position="end">
                          <Icon className={classes.inputAdornmentIcon}>
                            lock_outline
                          </Icon>
                        </InputAdornment>
                      )
                    }}
                  />
                  {/*confirm  password */}
                  <CustomInput
                    labelText="Confirm Password..."
                    id="password"
                    formControlProps={{
                      fullWidth: true,
                      className: classes.formControlClassName
                    }}
                    error={errors.password}
                    inputProps={{
                      required: true,
                      name: "confirmPassword",
                      type: "password",
                      endAdornment: (
                        <InputAdornment position="end">
                          <Icon className={classes.inputAdornmentIcon}>
                            lock_outline
                          </Icon>
                        </InputAdornment>
                      )
                    }}
                  />
                  {/* role */}
                  <FormControl
                    fullWidth
                    className={classes.selectFormControl}
                  >
                    <InputLabel htmlFor="simple-select" className={classes.selectLabel}>
                      Role
                    </InputLabel>
                    <Select
                      MenuProps={{className: classes.selectMenu}}
                      classes={{select: classes.select}}
                      value={role}
                      onChange={handleChange}
                      inputProps={{name: "role",id: "simple-select"}}
                    >
                      <MenuItem
                        disabled
                        classes={{ root: classes.selectMenuItem}}
                      >
                        Role
                      </MenuItem>
                      <MenuItem
                        classes={{
                          root: classes.selectMenuItem,
                          selected: classes.selectMenuItemSelected
                        }}
                        value="buyer"
                      >
                        Buyer
                      </MenuItem>
                      <MenuItem
                        classes={{
                          root: classes.selectMenuItem,
                          selected: classes.selectMenuItemSelected
                        }}
                        value="artist"
                      >
                        Artist
                      </MenuItem>
                    </Select>
                  </FormControl>
                  {/* terms and conditions */}
                  <FormControlLabel
                    classes={{
                      root:
                        classes.checkboxLabelControl +
                        " " +
                        classes.checkboxLabelControlClassName,
                      label: classes.checkboxLabel
                    }}
                    control={
                      <Checkbox
                        tabIndex={-1}
                        onClick={() => handleToggle(1)}
                        checkedIcon={<Check className={classes.checkedIcon} />}
                        icon={<Check className={classes.uncheckedIcon} />}
                        required
                        classes={{
                          checked: classes.checked,
                          root: classes.checkRoot
                        }}
                      />
                    }
                    label={
                      <span>
                        I agree with the <a href="#pablo">Privacy Policy</a>.
                      </span>
                    }
                  />
                </CardBody>
                <CardFooter className={classes.justifyContentCenter}>
                  <Button type="submit" color="primary" simple size="lg" block>
                    Let's Go
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </GridItem>
        </GridContainer>
      </div>
    );
}

RegisterPage.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object
};

export default withStyles(registerPageStyle)(RegisterPage);
