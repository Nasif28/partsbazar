import React from "react";

export function DateFormatter({
  date,
  showAgo = true,
  showTime = true,
  showDate = true,
  textColor = "muted-foreground",
}) {
  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    const now = new Date();
    const diffSeconds = Math.floor((now - dateObj) / 1000);

    // Calculate time differences
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);

    // Generate relative time string
    let agoText = "";
    if (showAgo) {
      if (diffYears > 0) {
        agoText = `${diffYears}y ago`;
      } else if (diffMonths > 0) {
        agoText = `${diffMonths}m ago`;
      } else if (diffWeeks > 0) {
        agoText = `${diffWeeks}w ago`;
      } else if (diffDays > 0) {
        agoText = `${diffDays}d ago`;
      } else if (diffHours > 0) {
        agoText = `${diffHours}h ago`;
      } else if (diffMinutes > 0) {
        agoText = `${diffMinutes}m ago`;
      } else {
        agoText = `${diffSeconds}s ago`;
      }
    }

    // Format time
    const timeText = showTime
      ? dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      : null;

    // Format date
    const dateText = showDate
      ? dateObj.toLocaleDateString([], {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
      : null;

    return { agoText, timeText, dateText };
  };

  const { agoText, timeText, dateText } = formatDate(date);

  return (
    <div className="flex flex-col">
      {agoText && (
        <span className={`text-xs font-medium text-${textColor}`}>
          {agoText}
        </span>
      )}
      {timeText && (
        <span className={`text-xs text-${textColor}`}>{timeText}</span>
      )}
      {dateText && (
        <span className={`text-xs text-${textColor}`}>{dateText}</span>
      )}
    </div>
  );
}
