import { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Container from "../components/container";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton, Pagination, TextField } from "@mui/material";
import { useAppDispatch } from "../hooks/useAppDispatch";
import {
  deleteProductAsync,
  fetchAllProductAsync,
} from "../redux/product/productOperations";
import ModalText from "../components/modals/modalText";
import AdminForm from "../components/adminForm";
import { fetchUsersAsync } from "../redux/user/userOperations";
import { Colors } from "../styles";
import { dataFields } from "../utils/dataFields";
import usePagination from "../hooks/usePagination";
import {
  fetchCategoriesAsync,
  fetchDeleteCategoryAsync,
} from "../redux/category/categoryOperations";
import { useDebounce } from "../hooks/useDebounce";

const DashboardPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("categories");
  const [uptadeId, setUptadeId] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [action, setAction] = useState("");
  const [searchText, setSearchText] = useState("");
  const debouncedSearchQuery = useDebounce(searchText);
  const dispatch = useAppDispatch();
  const { currentPage, displayedItems, count, onChange } = usePagination(
    selectedCategory,
    debouncedSearchQuery
  );

  useEffect(() => {
    switch (selectedCategory) {
      case "categories":
        dispatch(fetchCategoriesAsync());
        break;
      case "products":
        dispatch(fetchAllProductAsync());
        break;
      case "users":
        dispatch(fetchUsersAsync());
        break;

      default:
        break;
    }
  }, [dispatch, selectedCategory]);

  return (
    <Container>
      <CssBaseline />
      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        marginTop="90px"
      >
        <Box
          flexBasis={{ xs: "100%", md: "20%" }}
          flexGrow={1}
          borderRight={`1px solid ${Colors.borderRight}`}
          padding="16px"
        >
          <Typography variant="h5" gutterBottom>
            {selectedCategory.charAt(0).toUpperCase() +
              selectedCategory.slice(1)}
          </Typography>
          <List>
            {["categories", "users", "products"].map((category) => (
              <ListItem
                key={category}
                button
                onClick={() => setSelectedCategory(category)}
                selected={selectedCategory === category}
              >
                <ListItemText primary={category} />
                {selectedCategory === category && (
                  <IconButton
                    aria-label="Add"
                    onClick={() => {
                      switch (selectedCategory) {
                        case "categories":
                          setAction("add category");
                          break;
                        case "products":
                          setAction("add product");
                          break;
                        case "users":
                          setAction("add user");
                          break;
                        default:
                          break;
                      }
                      setOpenModal(true);
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                )}
              </ListItem>
            ))}
          </List>
        </Box>
        <Box flexBasis={{ xs: "100%", md: "80%" }} flexGrow={1} padding="16px">
          <Paper>
            <TextField
              label="Search by name"
              size="small"
              variant="standard"
              value={debouncedSearchQuery}
              onChange={(e) => setSearchText(e.target.value)}
              sx={{ marginBottom: "10px", marginLeft: "15px" }}
            />
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    {selectedCategory === "products" && (
                      <TableCell>Description</TableCell>
                    )}
                    {selectedCategory === "users" && (
                      <TableCell>Email</TableCell>
                    )}
                    {selectedCategory === "products" && (
                      <TableCell>Price</TableCell>
                    )}
                    <TableCell>Photo</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(() => {
                    switch (selectedCategory) {
                      case "categories":
                        return (
                          <>
                            {displayedItems.map(({ id, name, image }) => (
                              <TableRow key={id}>
                                <TableCell>{name}</TableCell>
                                <TableCell>
                                  <Box
                                    component="img"
                                    sx={{
                                      height: 50,
                                      width: 50,
                                      borderRadius: "5px",
                                    }}
                                    alt={name}
                                    src={
                                      image ||
                                      "https://via.placeholder.com/50x50"
                                    }
                                    onError={(e) => {
                                      const target =
                                        e.target as HTMLImageElement;
                                      target.src =
                                        "https://demofree.sirv.com/nope-not-here.jpg";
                                    }}
                                  />
                                </TableCell>
                                <TableCell>
                                  <Box>
                                    <IconButton
                                      aria-label="Edit"
                                      onClick={() => {
                                        setAction("update category");
                                        setUptadeId(id);
                                        setOpenModal(true);
                                      }}
                                    >
                                      <EditIcon />{" "}
                                    </IconButton>
                                    <IconButton
                                      aria-label="Delete"
                                      onClick={() => {
                                        dispatch(fetchDeleteCategoryAsync(id));
                                      }}
                                    >
                                      <DeleteIcon />{" "}
                                    </IconButton>
                                  </Box>
                                </TableCell>
                              </TableRow>
                            ))}
                          </>
                        );
                      case "products":
                        return (
                          <>
                            {displayedItems.map(
                              ({ id, title, category, price, description }) => (
                                <TableRow key={id}>
                                  <TableCell>{title}</TableCell>
                                  <TableCell>{description}</TableCell>
                                  <TableCell>{price}$</TableCell>
                                  <TableCell>
                                    <Box
                                      component="img"
                                      sx={{
                                        height: 50,
                                        width: 50,
                                        borderRadius: "5px",
                                      }}
                                      alt={category && category.name}
                                      src={
                                        (category && category.image) ||
                                        "https://via.placeholder.com/50x50"
                                      }
                                      onError={(e) => {
                                        const target =
                                          e.target as HTMLImageElement;
                                        target.src =
                                          "https://demofree.sirv.com/nope-not-here.jpg";
                                      }}
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <Box>
                                      <IconButton
                                        aria-label="Edit"
                                        onClick={() => {
                                          setAction("update product");
                                          setUptadeId(id);
                                          setOpenModal(true);
                                        }}
                                      >
                                        <EditIcon />{" "}
                                      </IconButton>
                                      <IconButton
                                        aria-label="Delete"
                                        onClick={() => {
                                          dispatch(deleteProductAsync(id));
                                        }}
                                      >
                                        <DeleteIcon />{" "}
                                      </IconButton>
                                    </Box>
                                  </TableCell>
                                </TableRow>
                              )
                            )}
                          </>
                        );
                      case "users":
                        return (
                          <>
                            {displayedItems.map(
                              ({ id, name, email, avatar, role }) => (
                                <TableRow key={id}>
                                  <TableCell>{name}</TableCell>
                                  <TableCell>{email}</TableCell>
                                  <TableCell>{role}</TableCell>
                                  <TableCell>
                                    <Box
                                      component="img"
                                      sx={{
                                        height: 50,
                                        width: 50,
                                        borderRadius: "5px",
                                      }}
                                      alt={name}
                                      src={
                                        avatar ||
                                        "https://via.placeholder.com/50x50"
                                      }
                                      onError={(e) => {
                                        const target =
                                          e.target as HTMLImageElement;
                                        target.src =
                                          "https://demofree.sirv.com/nope-not-here.jpg";
                                      }}
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <Box>
                                      <IconButton
                                        aria-label="Edit"
                                        onClick={() => {
                                          setAction("update user");
                                          setUptadeId(id);
                                          setOpenModal(true);
                                        }}
                                      >
                                        <EditIcon />{" "}
                                      </IconButton>
                                    </Box>
                                  </TableCell>
                                </TableRow>
                              )
                            )}
                          </>
                        );
                      default:
                        break;
                    }
                  })()}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          {debouncedSearchQuery === "" && (
            <Pagination
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "30px",
              }}
              count={count}
              page={currentPage}
              onChange={onChange}
            />
          )}
        </Box>
      </Box>
      <ModalText
        text="Choose the fields"
        openModal={openModal}
        handleCloseModal={() => setOpenModal(false)}
      >
        <AdminForm
          formCategoriesFields={dataFields.formCategoriesFields}
          formProductsFields={dataFields.formProductsFields}
          formUsersFields={dataFields.formUsersFields}
          handleCloseModal={() => setOpenModal(false)}
          action={action}
          uptadeId={uptadeId}
          selectedCategory={selectedCategory}
        />
      </ModalText>
    </Container>
  );
};

export default DashboardPage;
