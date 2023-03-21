import { parseISO, format } from 'date-fns';

const Date = ({ dateString }) => {
  const date = parseISO(dateString);
  return (
    <>{format(date, 'yyyy.MM.dd')}</>
  );
}

export default Date;