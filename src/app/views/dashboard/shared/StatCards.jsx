import { Box, Card, Grid, styled } from "@mui/material";
import { Small } from "app/components/Typography";
import { serviceCategories } from '../../../redux/actions/serviceCategoriesAction';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { categorizeServices } from '../../../utils/utils';

// STYLED COMPONENTS
const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "16px",
  background: theme.palette.background.paper,
 
}));

const ContentBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  "& .icon": {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    background: theme.palette.primary.main,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "8px"
  },
  "& small": { color: theme.palette.text.secondary }
}));

export default function StatCards() {
  const dispatch = useDispatch();
  const { serviceCategoryList } = useSelector((state) => state.serviceCategoriesReducer);
  const [categorizedServices, setCategorizedServices] = useState({});

  useEffect(() => {
    dispatch(serviceCategories());
  }, [dispatch]);

  useEffect(() => {
    if (serviceCategoryList) {
      const categorized = categorizeServices(serviceCategoryList);
      setCategorizedServices(categorized);
    }
  }, [serviceCategoryList]);

  return (
    <Box>
      {/* Country-based services */}
      {Object.keys(categorizedServices.nonsocial || {}).map((country) => (
        <Box key={country}>
          <h6 style={{ margin: "16px 0", fontSize: "18px", fontWeight: "bold" }}>{country} Network</h6>
          <Grid container spacing={2}>
            {categorizedServices.nonsocial[country].companies.map((company) => (
              <Grid item xs={6} sm={4} md={3} key={company.companyId}>
                <StyledCard elevation={3}>
                  <ContentBox>
                    <Box >
                      {/* Here you can replace with the actual image/logo */}
                      <img src={categorizedServices.nonsocial[country].countryImage} alt={country} style={{ width: "100%", borderRadius: "20%" }} />
                    </Box>
                    <Small>{company.companyName}</Small>
                  </ContentBox>
                </StyledCard>
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}

      {/* Social services */}
      <Box sx={{ marginTop: "24px" }}>
        {Object.keys(categorizedServices.social || {}).map((categoryName) => (
          <Box key={categoryName} sx={{ marginBottom: "16px" }}>
            <h6 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "8px" }}>{categoryName}</h6>
            <Grid container spacing={2}>
              {categorizedServices.social[categoryName].companies.map((company) => (
                <Grid item xs={6} sm={4} md={3} key={company.companyId}>
                  <StyledCard elevation={3}>
                    <ContentBox>
                      <Box className="icon">
                        {/* Company logo image */}
                        <img src={company.companyLogo} alt={company.companyName} style={{ width: "100%", borderRadius: "50%" }} />
                      </Box>
                      <Small>{company.companyName}</Small>
                    </ContentBox>
                  </StyledCard>
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
