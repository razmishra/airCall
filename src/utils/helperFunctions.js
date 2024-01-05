// Function to calculate the number of days from today
export const calculateDaysFromToday = (createdAt) => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
  
    const callDate = new Date(createdAt);
    callDate.setHours(0, 0, 0, 0);
  
    const timeDifference = currentDate - callDate;
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  
    return daysDifference;
  };
  
  // calculet number of week, months and year
  
  export const calculatePeriod = (day) => {
    if (day == 0) {
      return "Today";
    } else if (day > 0 && day < 6) {
      if (day == 1) {
        return `${day} day ago`;
      } else {
        return `${day} days ago`;
      }
    } else if (day > 6 && day < 31) {
      let week = Math.ceil(day / 7);
      if (week == 1) {
        return `${week} week ago`;
      } else {
        return `${week} weeks ago`;
      }
    } else if (day > 31 && day < 366) {
      let month = Math.ceil(day / 30);
      if (month == 1) {
        return `${month} month ago`;
      } else {
        return `${month} months ago`;
      }
    } else if (day > 365) {
      let year = Math.floor(day / 365);
      if (year == 1) {
        return `${year} year ago`;
      } else {
        return `${year} year ago`;
      }
    } else {
      return `${day} day ago`;
    }
  };