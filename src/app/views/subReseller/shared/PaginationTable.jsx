import { useState } from "react";
import {
  Box,
  Icon,
  Table,
  styled,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  IconButton,
  TablePagination,
  Avatar
} from "@mui/material";
import { Paragraph } from "app/components/Typography";
import { useDispatch, useSelector } from "react-redux";
import {getSubReseller} from '../../../redux/actions/subResellerAction'
import { useEffect } from "react";

// STYLED COMPONENT
const StyledTable = styled(Table)(() => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } }
  },
  "& tbody": {
    "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } }
  }
}));



export default function PaginationTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const dispatch=useDispatch()
  const {subResellerList,total_items}=useSelector((state)=>state.subResellerListReducer)

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(()=>{
    dispatch(getSubReseller())
  },[dispatch,page,rowsPerPage])

  

  return (
    <Box width="100%" overflow="auto">
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell align="left" colSpan={4}>Reseller Name</TableCell>
            <TableCell align="center" colSpan={2}>Balance</TableCell>
            <TableCell align="center" colSpan={2}>Phone</TableCell>
            <TableCell align="right" colSpan={2}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {subResellerList
            .map((subReseller, index) => (
              <TableRow key={index}>
                <TableCell align="left" colSpan={4}>
                  <Box display="flex" alignItems="center" gap={4}>
                    <Avatar src={subReseller.profile_image_url} />
                    <Paragraph>{subReseller.reseller_name}</Paragraph>
                  </Box>
                </TableCell>
                <TableCell align="center" colSpan={2}>{subReseller.balance}</TableCell>
                <TableCell align="center" colSpan={2}>{subReseller.phone}</TableCell>
                <TableCell align="right" colSpan={2}>
                  <IconButton>
                    <Icon color="error">close</Icon>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </StyledTable>

      <TablePagination
        sx={{ px: 2 }}
        page={page}
        component="div"
        rowsPerPage={rowsPerPage}
        count={total_items}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[10, 20, 30]}
        onRowsPerPageChange={handleChangeRowsPerPage}
        nextIconButtonProps={{ "aria-label": "Next Page" }}
        backIconButtonProps={{ "aria-label": "Previous Page" }}
      />
    </Box>
  );
}
