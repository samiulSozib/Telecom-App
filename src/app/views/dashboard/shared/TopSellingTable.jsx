import { Edit } from "@mui/icons-material";
import {
  Box,
  Card,
  Table,
  Select,
  Avatar,
  styled,
  TableRow,
  useTheme,
  MenuItem,
  TableBody,
  TableCell,
  TableHead,
  IconButton
} from "@mui/material";
import { Paragraph } from "app/components/Typography";
import { useDispatch, useSelector } from "react-redux";
import {getOrders} from '../../../redux/actions/orderAction'
import { useEffect } from "react";
import { format } from 'date-fns';


// STYLED COMPONENTS
const CardHeader = styled(Box)(() => ({
  display: "flex",
  paddingLeft: "24px",
  paddingRight: "24px",
  marginBottom: "12px",
  alignItems: "center",
  justifyContent: "space-between"
}));

const Title = styled("span")(() => ({
  fontSize: "1rem",
  fontWeight: "500",
  textTransform: "capitalize"
}));

const ProductTable = styled(Table)(() => ({
  minWidth: 400,
  whiteSpace: "pre",
  "& small": {
    width: 50,
    height: 15,
    borderRadius: 500,
    boxShadow: "0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)"
  },
  "& td": { borderBottom: "none" },
  "& td:first-of-type": { paddingLeft: "16px !important" }
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

export default function TopSellingTable() {
  const { palette } = useTheme();
  const bgError = palette.error.main;
  const bgPrimary = palette.primary.main;
  const bgSecondary = palette.secondary.main;
  const dispatch=useDispatch();
  const {orderList}=useSelector((state)=>state.orderListReducer)

  useEffect(()=>{
    dispatch(getOrders())
  },[dispatch])

  useEffect(()=>{
    console.log(orderList)
  },[orderList])

  return (
    <Card elevation={3} sx={{ pt: "20px",marginLeft:"20px" }}>
      <CardHeader>
        <Title>Order List</Title>
        <Select size="small" defaultValue="this_month">
          <MenuItem value="this_month">This Month</MenuItem>
          <MenuItem value="last_month">Last Month</MenuItem>
        </Select>
      </CardHeader>

      <Box overflow="auto">
        <ProductTable sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              <TableCell colSpan={4} sx={{ px: 3 }}>
                Account
              </TableCell>

              <TableCell colSpan={3} sx={{ px: 0 }}>
                Title
              </TableCell>

              <TableCell colSpan={2} sx={{ px: 0 }}>
                Sale
              </TableCell>

              <TableCell colSpan={2} sx={{ px: 0 }}>
                Buy
              </TableCell>

              <TableCell colSpan={3} sx={{ px: 0 }}>
                Validity
              </TableCell>


              <TableCell colSpan={3} sx={{ px: 0 }}>
                Date
              </TableCell>

              <TableCell colSpan={4} sx={{ px: 0 }}>
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

                <TableCell align="left" colSpan={3} sx={{ px: 0, textTransform: "capitalize" }}>
                  {order.bundle.bundle_title}
                </TableCell>

                <TableCell align="left" colSpan={2} sx={{ px: 0, textTransform: "capitalize" }}>
                  {order.bundle.selling_price}
                </TableCell>

                <TableCell align="left" colSpan={2} sx={{ px: 0, textTransform: "capitalize" }}>
                  {order.bundle.buying_price}
                </TableCell>

                <TableCell align="left" colSpan={3} sx={{ px: 0, textTransform: "capitalize" }}>
                  {order.bundle.validity_type}
                </TableCell>

                <TableCell align="left" colSpan={3} sx={{ px: 0, textTransform: "capitalize" }}>
                {format(new Date(order.created_at), 'dd-MM-yyyy')}
                </TableCell>

                <TableCell sx={{ px: 0 }} align="left" colSpan={4}>
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
        </ProductTable>
      </Box>
    </Card>
  );
}


