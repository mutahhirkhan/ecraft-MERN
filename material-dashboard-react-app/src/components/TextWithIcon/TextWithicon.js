import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FavoriteIcon from '@mui/icons-material/Favorite';

const useStyles = makeStyles({
  root: {
    position: "relative",
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center"
  },
  icon: {
    fontSize: "2.5em"
  },
  count: {
    position: "absolute",
    lineHeight: 1,
    color: "#fff",
    top: "0.5em",
    fontSize: "1em"
  }
});

function TextWithIcon({ size = 16, count = 0 }) {
  const classes = useStyles();

  return (
    <div className={classes.root} style={{ fontSize: size }}>
      <FavoriteIcon color="primary" className={classes.icon} />
      <Typography component="span" className={classes.count}>
        {count}
      </Typography>
    </div>
  );


}
export default TextWithIcon;