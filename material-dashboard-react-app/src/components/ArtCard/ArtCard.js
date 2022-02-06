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
                        <FavoriteIcon />
                        <CardHeader color="success">
                            {/* <ChartistGraph
                                    className="ct-chart"
                                    data={dailySalesChart.data}
                                    type="Line"
                                    options={dailySalesChart.options}
                                    listener={dailySalesChart.animation}
 
     
                                /> */}
                        </CardHeader>
                    </Badge>

                    <CardBody>
                        <h4 className={classes.cardTitle}>Daily Sales</h4>
                        <p className={classes.cardCategory}>
                            <span className={classes.successText}>
                                <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                            </span>{" "}
                            increase in today sales.
                        </p>
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
