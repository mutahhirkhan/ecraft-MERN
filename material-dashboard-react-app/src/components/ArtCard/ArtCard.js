import React from "react";
import Card from "../Card/Card";
import CardBody from "../Card/CardBody";
import CardFooter from "../Card/CardFooter";
import CardHeader from "../Card/CardHeader";
import GridItem from "../Grid/GridItem";
import FavoriteIcon from "@material-ui/icons/Favorite";
// import { Badge } from "antd";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import { Badge } from "@material-ui/core";

const ArtCard = ({ classes }) => {
    return (
        <>
            <GridItem xs={12} sm={12} md={4}>
                <Card chart>
                    <Badge
                        color="secondary"
                        badgeContent={99}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}>
                        <CardHeader>
                            <img src="https://firebasestorage.googleapis.com/v0/b/onlinelect.appspot.com/o/cards%2Fimg-0cbd386d-42c5-4046-a088-7ff351b06233?alt=media&token=e037d7a5-c9ff-42e3-9c70-19598afd4457" height={300} width={400} />
                        </CardHeader>
                    </Badge>

                    <CardBody>
                        <h1 className={classes.cardTitle}>First Art</h1>
                        <div style={{display:'flex' ,justifyContent:'space-between'}}>
                            <FavoriteIcon />
                            <h4>Cost : <span>$20000</span></h4>
                        </div>
                        <p className={classes.cardCategory}>
                            <span className={classes.successText}>
                                <ArrowUpward className={classes.upArrowCardCategory} /> 1
                            </span>{" "}
                            No of Likes
                        </p>
                        <div>
                            <h1>Revie</h1>
                        </div>
                    </CardBody>
                    <CardFooter chart>
                        <div className={classes.stats}>
                            <AccessTime /> updated 4 minutes ago
                        </div>
                    </CardFooter>
                </Card>
            </GridItem>
        </>
    );
};

export default ArtCard;
