import React,{useState} from "react";
import axios from "axios";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "./../../components/Grid/GridItem.jsx";
import GridContainer from "./../../components/Grid/GridContainer.jsx";
import CustomInput from "./../../components/CustomInput/CustomInput.jsx";
import Button from "./../../components/CustomButtons/Button.jsx";
import Card from "./../../components/Card/Card.jsx";
import CardHeader from "./../../components/Card/CardHeader.jsx";
import CardAvatar from "./../../components/Card/CardAvatar.jsx";
import CardBody from "./../../components/Card/CardBody.jsx";
import CardFooter from "./../../components/Card/CardFooter.jsx";

import avatar from "./../../assets/img/faces/marc.jpg";
import { useAppSelector } from "../../store/hooks.js";
import { selectLoginResponse } from './../Pages/slice';
import { useAppDispatch } from './../../store/hooks';
import { updateProfileAPI } from "./service.js";
import { updateProfile as updateProfileSlice } from "./../Pages/slice";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const { REACT_APP_SERVER_URL } = process.env;

const UserProfile= ({ classes, name, email }) => {
  // const { classes, name, email } = this.props;
  const [errors, setError] = useState({});
  const userProfile = useAppSelector(selectLoginResponse)
  const dispatch = useAppDispatch();

  async function updateProfile(e) {
    e.preventDefault();

    const fields = ["username", "email", "title", "description"];
    const formElements = e.target.elements;
    const formValues = fields
      .map(field => ({
        [field]: formElements.namedItem(field).value
      }))
      .reduce((current, next) => ({ ...current, ...next }));

    let registerRequest;
    try {
      const {data = {}} = await updateProfileAPI(`${userProfile.userId}`,formValues)
      dispatch(updateProfileSlice(data.userProfile))
    } catch ({ response }) {
      registerRequest = response;
    }
    const { data: registerRequestData } = registerRequest;

    if (!registerRequestData.success) 
      registerRequestData.messages && setError( registerRequestData.messages.errors);
  }

    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <form onSubmit={updateProfile}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
                  {/* <p className={classes.cardCategoryWhite}>
                    Complete your profile
                  </p> */}
                </CardHeader>
                <CardBody>
                  
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={3}>
                      <CustomInput
                        labelText="Username"
                        id="username"
                        error={errors.name}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          // required: true,
                          defaultValue: userProfile?.username,
                          name: "username"
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <CustomInput
                        labelText="Email address"
                        id="email"
                        error={errors.username}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          // required: true,
                          defaultValue: userProfile?.email,
                          name: "email"
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <CustomInput
                        labelText="Title"
                        id="title"
                        error={errors.title}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          // required: true,
                          defaultValue: userProfile.title,
                          name: "title"
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <CustomInput
                        labelText="Description"
                        id="description"
                        error={errors.description}
                        formControlProps={{
                          // fullWidth: true
                        }}
                        inputProps={{
                          // required: true,
                          defaultValue: userProfile.description,
                          name: "description"
                        }}
                      />
                    </GridItem>
                  </GridContainer>

                </CardBody>
                <CardFooter>
                  <Button type="submit" color="primary">
                    Update Profile
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card profile>
              <CardAvatar profile>
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  <img src={"https://firebasestorage.googleapis.com/v0/b/onlinelect.appspot.com/o/legendaryCards%2F42?alt=media&token=37041022-f70d-4b32-a60b-8e687a2eeaf7"} alt="..." />
                </a>
              </CardAvatar>
              <CardBody profile>
                <h6 className={classes.cardCategory}>{userProfile.title ?  userProfile.title : "Your Good Title"}</h6>
                <h4 className={classes.cardTitle}>{userProfile.username ? userProfile.username : "Alec Thompson"}</h4>
                <p className={classes.description}>
                  {userProfile.description 
                  ? 
                  userProfile.description 
                  : 
                  `Don't be scared of the truth because we need to restart the 
                  human foundation in truth And I love you like Kanye loves
                  Kanye I love Rick Owens’ bed design but the back is...`}
                  
                </p>
                {/* <Button color="primary" round>
                  Follow
                </Button> */}
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
}

UserProfile.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string,
  email: PropTypes.string,
  description: PropTypes.string,
  title: PropTypes.string,
};

export default withStyles(styles)(UserProfile);
