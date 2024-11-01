import { Fragment, useEffect, useState } from "react";
import { Card, Grid, styled, useTheme } from "@mui/material";
import StatCards from "../dashboard/shared/StatCards";
import TopSellingTable from "../dashboard/shared/TopSellingTable";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import {dashboardData} from '../../redux/actions/dashboardAction'
import { useDispatch, useSelector } from "react-redux";
import PaginationTable from "./shared/PaginationTable";
import { Breadcrumb, SimpleCard } from "app/components";
import AddForm from "./shared/AddForm";




// STYLED COMPONENTS
const ContentBox = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" }
}));



export default function AddSubReseller() {
  const { palette } = useTheme();


  


  return (
    <Fragment>
      <ContentBox className="analytics">
      <SimpleCard title="Add Sub Reseller">
        <AddForm/>
      </SimpleCard>
      </ContentBox>
    </Fragment>
  );
}
