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
  padding: "8px", // reduced padding to make the card smaller
  background: theme.palette.background.paper,
}));

const ContentBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  "& .icon": {
    width: "40px", // reduced size for smaller appearance
    height: "40px",
    borderRadius: "50%",
    background: theme.palette.primary.main,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "4px" // reduced margin for smaller spacing
  },
  "& small": { color: theme.palette.text.secondary, fontSize: "0.75rem" } // smaller font size for the text
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
    <Box sx={{ marginTop: "24px" }}>
      {/* Unified service cards */}
      {['nonsocial', 'social'].map((type) => (
        <Box key={type}>
          {Object.keys(categorizedServices[type] || {}).map((groupName) => (
            <Box key={groupName} sx={{ marginBottom: "16px" }}>
              <h6 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "8px" }}>
                {type === 'nonsocial' ? `${groupName} Network` : groupName}
              </h6>
              <Grid container spacing={2}>
                {categorizedServices[type][groupName].companies.map((company) => (
                  <Grid item xs={6} sm={4} md={2} key={company.companyId}>
                    <StyledCard elevation={3}>
                      <ContentBox>
                        <Box className="icon">
                          {/* Display company or country image with reduced size */}
                          <img
                            src={type === 'nonsocial' ? categorizedServices[type][groupName].countryImage : company.companyLogo}
                            alt={company.companyName}
                            style={{ width: "100%", height: "100%", borderRadius: "50%" }}
                          />
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
      ))}
    </Box>
  );
}
