import { useState, useEffect, MouseEvent, ChangeEvent } from "react";
import { createPortal } from "react-dom";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Typography,
  TableHead,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  Paper,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";

import { Container } from "@mui/material";
import { SiteModal } from "../SiteModal";
import { getImageName } from "../../utils/getImageName";

interface Row {
  appId: string;
  appName: string;
  appSources: string[];
  category: string;
}

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

type Data = {
  appRows: Row[];
  totalCount: number;
};

export default function SiteTable() {
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState(false);
  const [total, setTotal] = useState<null | number>(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState<string | null>(null);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = total
    ? page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - total)
      : 0
    : 0;

  const handleOpenModal = (id: string) => {
    setId(id);
    window.location.hash = `appId-${id}`;
    document.body.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    setShowModal(false);
    window.history.replaceState(null, "", window.location.href.split("#")[0]);
    setId(null);
    document.body.style.overflow = "";
  };

  const handleChangePage = (
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
    getInventory(newPage);
  };

  const handleChangeRowsPerPage = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    getInventory(0, parseInt(event.target.value, 10));
  };

  const getInventory = async (currenPage = 0, perPage = 25) => {
    try {
      const response = await fetch("/api/v1/app-service/get-apps", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pageNumber: currenPage,
          pageSize: perPage,
        }),
      });

      if (!response.ok) {
        setError(true);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
      setTotal(result.totalCount);
    } catch (error) {
      setError(true);
      console.log("Something went wrong: ", error);
      return null;
    }
  };

  useEffect(() => {
    getInventory();
  }, [total]);

  useEffect(() => {
    if (window.location.hash.includes("appId-")) {
      setShowModal(true);
      setId(window.location.hash.replace("#appId-", ""));
    }
  }, [id]);

  return (
    <Box
      component={"section"}
      bgcolor={"#F9FAFC"}
      padding={"100px 0 30px"}
      minHeight={"calc(100vh - 130px)"}
    >
      <Container maxWidth="lg">
        <Typography
          component="h1"
          variant="h4"
          mb={4}
          sx={{ color: "#4C4C4C" }}
        >
          App Inventory
        </Typography>

        {error ? (
          <Typography color="error">
            Something went wrong! Please refresh the page...
          </Typography>
        ) : (
          data && (
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 500 }}
                aria-label="custom pagination table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell component="th">Name</TableCell>
                    <TableCell component="th">Category</TableCell>
                    <TableCell component="th">Connector</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.appRows?.map((row: Row) => (
                    <TableRow
                      key={row.appId}
                      hover
                      sx={{ cursor: "pointer" }}
                      onClick={() => handleOpenModal(row.appId)}
                    >
                      <TableCell>
                        <Box display={"flex"} alignItems={"center"} gap={1}>
                          <Box
                            component={"img"}
                            src={`https://cdn.brandfetch.io/${row.appId}`}
                            width={40}
                            height={40}
                            borderRadius={"50%"}
                            border={"1px solid gray"}
                            loading="lazy"
                          ></Box>
                          {row.appName}
                        </Box>
                      </TableCell>
                      <TableCell align="left">{row.category}</TableCell>
                      <TableCell>
                        <Box display={"flex"} alignItems={"center"} gap={1}>
                          {row.appSources.map((item, index) => {
                            const name = getImageName(item);

                            return (
                              <Box
                                key={index}
                                component={"img"}
                                src={`https://cdn.brandfetch.io/${name}`}
                                width={40}
                                height={40}
                                borderRadius={"50%"}
                                border={"1px solid gray"}
                                loading="lazy"
                              ></Box>
                            );
                          })}
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[25, 50]}
                      colSpan={3}
                      count={total ?? 0}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      slotProps={{
                        select: {
                          inputProps: {
                            "aria-label": "rows per page",
                          },
                          native: true,
                        },
                      }}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      ActionsComponent={TablePaginationActions}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          )
        )}
      </Container>
      {showModal &&
        createPortal(
          <SiteModal id={id} closeFunctional={handleCloseModal} />,
          document.body
        )}
    </Box>
  );
}
