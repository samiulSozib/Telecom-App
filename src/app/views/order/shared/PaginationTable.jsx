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
  useTheme
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import { Paragraph } from "app/components/Typography";
import { useDispatch, useSelector } from "react-redux";
import {getOrders} from '../../../redux/actions/orderAction'
import { useEffect } from "react";
import { format } from 'date-fns';

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

const Small = styled("small")(({ bgcolor }) => ({
  width: 50,
  height: 15,
  color: "#fff",
  padding: "2px 8px",
  borderRadius: "4px",
  overflow: "hidden",
  background: bgcolor,
  boxShadow: "0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)"
}));

const subscribarList = [
  {
    name: "john doe",
    date: "18 january, 2019",
    amount: 1000,
    status: "close",
    company: "ABC Fintech LTD."
  },
  {
    name: "kessy bryan",
    date: "10 january, 2019",
    amount: 9000,
    status: "open",
    company: "My Fintech LTD."
  },
  {
    name: "kessy bryan",
    date: "10 january, 2019",
    amount: 9000,
    status: "open",
    company: "My Fintech LTD."
  },
  {
    name: "james cassegne",
    date: "8 january, 2019",
    amount: 5000,
    status: "close",
    company: "Collboy Tech LTD."
  },
  {
    name: "lucy brown",
    date: "1 january, 2019",
    amount: 89000,
    status: "open",
    company: "ABC Fintech LTD."
  },
  {
    name: "lucy brown",
    date: "1 january, 2019",
    amount: 89000,
    status: "open",
    company: "ABC Fintech LTD."
  },
  {
    name: "lucy brown",
    date: "1 january, 2019",
    amount: 89000,
    status: "open",
    company: "ABC Fintech LTD."
  },
  {
    name: "lucy brown",
    date: "1 january, 2019",
    amount: 89000,
    status: "open",
    company: "ABC Fintech LTD."
  },
  {
    name: "lucy brown",
    date: "1 january, 2019",
    amount: 89000,
    status: "open",
    company: "ABC Fintech LTD."
  }
];

export default function PaginationTable() {
  const { palette } = useTheme();
  const bgError = palette.error.main;
  const bgPrimary = palette.primary.main;
  const bgSecondary = palette.secondary.main;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const dispatch=useDispatch()
  const {orderList,total_items}=useSelector((state)=>state.orderListReducer)

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(()=>{
    dispatch(getOrders(page+1,rowsPerPage))
  },[dispatch,page,rowsPerPage])

  

  return (
    <Box width="100%" overflow="auto">
      <StyledTable>
        <TableHead>
        <TableRow>
              <TableCell colSpan={4} sx={{ px: 3 }}>
                Account
              </TableCell>

              <TableCell colSpan={2} sx={{ px: 0 }}>
                Title
              </TableCell>

              <TableCell colSpan={2} sx={{ px: 0 }}>
                Sale
              </TableCell>

              <TableCell colSpan={2} sx={{ px: 0 }}>
                Buy
              </TableCell>

              <TableCell colSpan={2} sx={{ px: 0 }}>
                Validity
              </TableCell>


              <TableCell colSpan={2} sx={{ px: 0 }}>
                Date
              </TableCell>

              <TableCell colSpan={2} sx={{ px: 0 }}>
                Status
              </TableCell>

              <TableCell colSpan={1} sx={{ px: 0 }}>
                Action
              </TableCell>
              
            </TableRow>
        </TableHead>
        <TableBody>
        {orderList.map((order, index) => (
              <TableRow key={index} hover>
                <TableCell colSpan={4} align="left" sx={{ px: 0, textTransform: "capitalize" }}>
                  <Box display="flex" alignItems="center" gap={4}>
                    <Paragraph>{order.rechargeble_account}</Paragraph>
                  </Box>
                </TableCell>

                <TableCell align="left" colSpan={2} sx={{ px: 0, textTransform: "capitalize" }}>
                  {order.bundle.bundle_title}
                </TableCell>

                <TableCell align="left" colSpan={2} sx={{ px: 0, textTransform: "capitalize" }}>
                  {order.bundle.selling_price}
                </TableCell>

                <TableCell align="left" colSpan={2} sx={{ px: 0, textTransform: "capitalize" }}>
                  {order.bundle.buying_price}
                </TableCell>

                <TableCell align="left" colSpan={2} sx={{ px: 0, textTransform: "capitalize" }}>
                  {order.bundle.validity_type}
                </TableCell>

                <TableCell align="left" colSpan={2} sx={{ px: 0, textTransform: "capitalize" }}>
                {format(new Date(order.created_at), 'dd-MM-yyyy')}
                </TableCell>

                <TableCell sx={{ px: 0 }} align="left" colSpan={2}>
                  {order.status === 0 ? (
                    <Small bgcolor={bgSecondary}>Pending</Small>
                  ) : order.status === 1 ? (
                    <Small bgcolor={bgPrimary}>Confirm</Small>
                  ) : (
                    <Small bgcolor={bgError}>Rejected</Small>
                  )}
                </TableCell>

                <TableCell sx={{ px: 0 }} colSpan={1}>
                  <IconButton>
                    <Edit color="primary" />
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
