import { Fragment, useEffect, useState } from "react";
import { Card, Grid, styled, useTheme } from "@mui/material";
import StatCards from "../dashboard/shared/StatCards";
import TopSellingTable from "../dashboard/shared/TopSellingTable";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import {dashboardData} from '../../redux/actions/dashboardAction'
import { useDispatch, useSelector } from "react-redux";
import { Breadcrumb, SimpleCard } from "app/components";
import { useLocation } from "react-router-dom";
import Bundle from "./shared/Bundle";
import SocialBundle from "./shared/SocialBundle";




// STYLED COMPONENTS
const ContentBox = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" }
}));



export default function Recharge() {
  const { palette } = useTheme();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get('type');

  return (
    <Fragment>
      <ContentBox className="analytics">
      {type == 'nonsocial' ? <Bundle /> : <SocialBundle/>}
      </ContentBox>
    </Fragment>
  );
}
