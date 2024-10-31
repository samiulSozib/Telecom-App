import { Visibility, VisibilityOff } from "@mui/icons-material";
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
  TableHead,
  IconButton,
  TablePagination
} from "@mui/material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { Paragraph } from "app/components/Typography";
import { useLocation } from "react-router-dom";
import {getServices} from '../../../redux/actions/serviceAction'
import {getBundles} from '../../../redux/actions/bundleAction'
import { useDispatch, useSelector } from "react-redux";
import { useEffect,useState } from "react";

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

const ImageListContainer = styled(Box)(() => ({
  display: "flex",
  overflowX: "auto",
  padding: "8px 0",
  gap: "16px", // spacing between each image card
  "& > div": {
    padding: "8px", // padding inside each Card
  },
  "& img": {
    height: "60px",
    borderRadius: "4px",
    objectFit: "cover",
  },
  
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function Bundle() {
  const { palette } = useTheme();
  const bgError = palette.error.main;
  const bgPrimary = palette.primary.main;
  const bgSecondary = palette.secondary.main;

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const countryId = queryParams.get('countryId');
  const categoryId = queryParams.get('categoryId');

  //console.log('Country ID:', countryId);
  //console.log('Category ID:', categoryId);

  const dispatch=useDispatch()
  const {serviceList}=useSelector((state)=>state.serviceListReducer)
  const {bundleList}=useSelector((state)=>state.bundleListReducer)
  const [visibleRows, setVisibleRows] = useState({});


  useEffect(()=>{
    dispatch(getServices(categoryId,countryId))
    dispatch(getBundles(1,10,countryId,"",'',categoryId,""))
  },[dispatch])

  const handleVisibilityToggle = (index) => {
    setVisibleRows((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <Card elevation={3} sx={{ pt: "20px", mb: 3 }}>
      <CardHeader>
        <Title>Recharge</Title>
        <Select size="small" defaultValue="all">
          <MenuItem value="all">ALL</MenuItem>
          <MenuItem value="unlimited">UNLIMITED</MenuItem>
          <MenuItem value="monthly">MONTHLY</MenuItem>
          <MenuItem value="weekly">WEEKLY</MenuItem>
          <MenuItem value="daily">DAILY</MenuItem>
          <MenuItem value="hourly">HOURLY</MenuItem>
          <MenuItem value="nightly">NIGHTLY</MenuItem>
        </Select>
      </CardHeader>

      <CardHeader>
      <Title></Title>
        <ImageListContainer>
          {serviceList.map((service, index) => (
            <Card levation={3} key={index}>
              <img src={service.company.company_logo} alt={service.company.company_name} />
            </Card>
          ))}
        </ImageListContainer>
        <Title></Title>
      </CardHeader>

      

      <Box overflow="auto">
      <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              <StyledTableCell colSpan={3} sx={{ px: 3 }}>
                Bundle Name
              </StyledTableCell>

              <StyledTableCell colSpan={3} sx={{ px: 0 }}>
                Selling Price
              </StyledTableCell>

              <StyledTableCell colSpan={3} sx={{ px: 0 }}>
                Validity
              </StyledTableCell>


              <StyledTableCell colSpan={2} sx={{ px: 0 }}>
                Buying Price
              </StyledTableCell>

              <StyledTableCell colSpan={1} sx={{ px: 0 }}>
                Action
              </StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {bundleList.map((bundle, index) => (
              <StyledTableRow key={index} hover>
                <StyledTableCell colSpan={3} align="left" sx={{ px: 0, textTransform: "capitalize" }}>
                  <Box display="flex" alignItems="center" gap={4}>
                    <Avatar src={bundle.service.company.company_logo} />
                    <Paragraph>{bundle.bundle_title}</Paragraph>
                  </Box>
                </StyledTableCell>

                <StyledTableCell align="left" colSpan={3} sx={{ px: 0, textTransform: "capitalize" }}>
                  {bundle.selling_price}
                </StyledTableCell>

                <StyledTableCell sx={{ px: 0 }} align="left" colSpan={3}>
                {bundle.validity_type.charAt(0).toUpperCase() + bundle.validity_type.slice(1)}
                </StyledTableCell>

                <StyledTableCell align="left" colSpan={2} sx={{ px: 0, textTransform: "capitalize" }}>
                {visibleRows[index] ? bundle.buying_price : "****"}
                </StyledTableCell>

                <StyledTableCell sx={{ px: 0 }} colSpan={1}>
                  <IconButton onClick={() => handleVisibilityToggle(index)}>
                    {visibleRows[index] ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Card>
  );
}

