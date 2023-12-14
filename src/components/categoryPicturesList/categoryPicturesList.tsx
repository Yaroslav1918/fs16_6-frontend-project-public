import {
  Box,
  Container,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import InfoIcon from "@mui/icons-material/Info";
import { AppState } from "../../redux/store";
import { useAppSelector } from "../../hooks/useAppSelector";
import { Colors } from "../../styles";

const CategoryPictureList = () => {
  const navigate = useNavigate();
  const categories = useAppSelector(
    (state: AppState) => state.categorySlice.categories
  );

  return (
    <Box component="section" pt={10}>
      <Container>
        <Typography
          component="h4"
          variant="h4"
          sx={{
            textAlign: "center",
            marginBottom: "30px",
            fontSize: { xs: "25px", md: "30px" },
          }}
        >
          Our Categories
        </Typography>
        <ImageList sx={{ width: "100%", height: "100%" }}>
          <ImageListItem key="Subheader" cols={2}></ImageListItem>
          {categories.map(({ _id, images, name }) => (
            <ImageListItem
              key={_id}
              onClick={() => navigate(`/products/${name}`)}
              sx={{ "&:hover": { cursor: "pointer" } }}
            >
              <img
                srcSet={`${images[0]}?w=248&fit=crop&auto=format&dpr=2 2x`}
                src={`${images[0]}?w=248&fit=crop&auto=format`}
                alt={name}
                loading="lazy"
              />
              <ImageListItemBar
                title={
                  <Typography sx={{ fontSize: "22px", textAlign: "center" }}>
                    {name}
                  </Typography>
                }
                actionIcon={
                  <IconButton
                    sx={{ color: Colors.categoryTitle }}
                    aria-label={`info about ${name}`}
                  >
                    <InfoIcon />
                  </IconButton>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Container>
    </Box>
  );
};

export default CategoryPictureList;
