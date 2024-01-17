import React from "react";
import Timeline from "react-calendar-timeline";
import "react-calendar-timeline/lib/Timeline.css";
import moment from "moment";
import randomColor from "randomcolor";
import { Avatar, Box, Grid, Typography } from "@mui/material";

export default function CalendarTimeline({ groups, items }) {
  const startDate = moment().subtract(1, "days");
  const endDate = moment().add(1, "days");

  return (
    <Box style={{ overflowX: "auto", width: "100rem" }}>
      <Grid container>
        {/* <Typography variant="h3" className="fw-semibold" gutterBottom>
          Project Timeline
        </Typography> */}

        <Timeline
          groups={groups}
          items={items}
          defaultTimeStart={startDate}
          defaultTimeEnd={endDate}
          visibleTimeStart={startDate}
          visibleTimeEnd={endDate}
          minUnit="day"
          maxUnit="day"
          sidebarWidth={150}
          headerLabel={{
            day: "MM/DD",
            month: "MM/YYYY",
            year: "YYYY",
          }}
        />
      </Grid>
    </Box>
  );
}
