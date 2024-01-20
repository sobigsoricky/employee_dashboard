import React from "react";
import Timeline from "react-calendar-timeline";
import moment from "moment";
import { Box } from "@mui/material";

export default function CalendarTimeline({ groups, items }) {
  const startDate = moment().subtract(7, "days");
  const endDate = moment().add(7, "days");

  return (
    <Box>
      <Timeline
        groups={groups}
        items={items}
        defaultTimeStart={startDate}
        defaultTimeEnd={endDate}
        visibleTimeStart={startDate}
        visibleTimeEnd={endDate}
        minUnit="day"
        maxUnit="day"
        sidebarWidth={180}
        lineHeight={60}
        headerLabel={{
          day: "MM/DD",
          month: "MM/YYYY",
          year: "YYYY",
        }}
      />
    </Box>
  );
}
