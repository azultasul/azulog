import { parseISO, format } from 'date-fns';

const Date = ({ dateString, className }) => {
  const date = parseISO(dateString);
  return (
    <div className={className}>
      {format(date, 'yyyy.MM.dd')}
    </div>
  );
}

export default Date;