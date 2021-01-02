export function compare_dates(a, b, criteria = "begin") {
  if (criteria === "begin") {
    return a.date.getTime() - b.date.getTime();
  } else if (criteria === "end") {
    return a.expires.getTime() - b.expires.getTime();
  } else {
    return Error("Invalid 'dateToUse', please use 'begin' or 'end'");
  }
}
