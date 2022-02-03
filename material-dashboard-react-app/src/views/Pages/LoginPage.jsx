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

// core components
import GridContainer from "./../../components/Grid/GridContainer.jsx";
import GridItem from "./../../components/Grid/GridItem.jsx";
import CustomInput from "./../../components/CustomInput/CustomInput.jsx";
import Button from "./../../components/CustomButtons/Button.jsx";
import Card from "./../../components/Card/Card.jsx";
import CardBody from "./../../components/Card/CardBody.jsx";
import CardHeader from "./../../components/Card/CardHeader.jsx";
import CardFooter from "./../../components/Card/CardFooter.jsx";

import loginPageStyle from "./../../assets/jss/material-dashboard-react/views/loginPageStyle.jsx";
import { useHistory } from "react-router";
import { useAppDispatch, useAppSelector } from './../../store/hooks';
import {login as loginAPI } from "./thunk"
import { selectlogin, selectLoginResponse, selectloginStatus, selectloginError, selectloginResponseMessage } from './slice';
import { showErrorMessage, showSuccessMessage } from './../../utils/message';
import { message } from 'antd';
// import "./LoginPage.css";
// import "./../../assets/css/material-dashboard-react.css";
const { REACT_APP_SERVER_URL } = process.env;

const LoginPage = (props) => {
  const { classes } = props;
  const history = useHistory();
  const dispatch = useAppDispatch();
  const userProfile = useAppSelector(selectLoginResponse)
  const loginStatusString = useAppSelector(selectloginStatus)
  const loginStatus = useAppSelector(selectlogin)
  const loginError = useAppSelector(selectloginError)
  const loginErrorMessage = useAppSelector(selectloginResponseMessage)



  // const { errors } = state;
  const [checked, setCheck] = React.useState([]);
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  
  // constructor(props) {
  //   super(props);
  //   state = {
  //     checked: [],
  //     errors: {}
  //   };
  // }
  const login = async e => {
    setLoading(true)
    showErrorMessage()
    e.preventDefault();

    // const { history } = props;

    const fields = ["email", "password"];
    const formElements = e.target.elements;

    const formValues = fields
      .map(field => ({
        [field]: formElements.namedItem(field).value
      }))
      .reduce((current, next) => ({ ...current, ...next }));

    try {
      console.log(formValues);
      dispatch(loginAPI(formValues));
      const {data} = await axios.get("http://localhost:8000/api/v1/arts/testing");
      // console.log(data);
      // console.log(res.json());
    } catch (error) {
        setLoading(false)
        console.log(error);
    }
  };
  React.useEffect(() => {
    console.log("loading");
    console.log(loading);
  },[loading])

  //useeffect
  React.useEffect(() => {
    // console.log("userProfile", userProfile);
    // let token = localStorage.getItem("token") ;
    // if(userProfile.token &&  ( token !== "undefined" || userProfile.token !== undefined))  {
    //   console.log('here');
    //   setLoading(false)
    //   localStorage.setItem("token", userProfile.token);
    //   history.push("/dashboard")
    // }
    // else{
    //   showErrorMessage("We are having some trouble, try Logging in again")

    // }
  }, [userProfile]);
  
  React.useEffect(() => {
    let hide = showErrorMessage("loginErrorMessage",0)
    hide()
    
  },[])

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


  const handleToggle = value => {
    // const { checked } = state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setCheck([...newChecked]);
  };
 
    return (
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={8}>
            <h4 className={classes.textCenter} style={{ marginTop: 0 }}>
              Log in to see how you can speed up your web development with out
              of the box CRUD for #User Management and more.{" "}
            </h4>
          </GridItem>
        </GridContainer>
        <GridContainer justify="center">
          <GridItem xs={12} sm={6} md={4}>
            <form onSubmit={login}>
              <Card className={classes["state.cardAnimaton"]}>
                <CardHeader
                  className={`${classes.cardHeader} ${classes.textCenter}`}
                  color="primary"
                >
                  <h4 className={classes.cardTitle}>Log in</h4>
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
                  <p
                    className={`${classes.textCenter} ${classes.checkboxLabel}`}
                  >
                    Or Sign in with <strong>admin@material.com</strong> and the
                    password <strong>secret</strong>{" "}
                  </p>
                  <CustomInput
                    labelText="Email..."
                    id="email"
                    error={errors.email || errors.invalidEmailOrPassword}
                    formControlProps={{
                      fullWidth: true,
                      className: classes.formControlClassName
                    }}
                    inputProps={{
                      required: true,
                      name: "email",
                      endAdornment: (
                        <InputAdornment position="end">
                          <Email  className={classes.inputAdornmentIcon} />
                        </InputAdornment>
                      )
                    }}
                  />
                  <CustomInput
                    labelText="Password"
                    id="password"
                    error={errors.password || errors.invalidEmailOrPassword}
                    formControlProps={{
                      fullWidth: true,
                      className: classes.formControlClassName
                    }}
                    inputProps={{
                      type: "password",
                      required: true,
                      endAdornment: (
                        <InputAdornment position="end">
                          <Icon className={classes.inputAdornmentIcon}>
                            lock_outline
                          </Icon>
                        </InputAdornment>
                      )
                    }}
                  />
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
                        classes={{
                          checked: classes.checked,
                          root: classes.checkRoot
                        }}
                      />
                    }
                    label={<span>Remember me</span>}
                  />
                </CardBody>
                <CardFooter className={classes.justifyContentCenter}>
                  <Button loading={loading} loadingPosition="start" type="submit" color="primary" simple size="lg" block>
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

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object,
  errors: PropTypes.object
};

export default withStyles(loginPageStyle)(LoginPage);
