const useDateFormat = (date) => {
    const dateObject = new Date(date);

    if (!isNaN(dateObject.getTime())) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };

        const formattedDate = new Intl.DateTimeFormat('en-US', options).format(dateObject);
        return formattedDate;
    }
    else {
        return "Not valid date";
    }
}

export default useDateFormat;