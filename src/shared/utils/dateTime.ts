import moment from 'moment';

export const formatDate = (date: any, format = 'MMMM D, YYYY') =>
  date ? moment(date).format(format) : date;

export const formatDateTime = (date: any, format = 'MMMM D, YYYY, h:mm A') =>
  date ? moment(date).format(format) : date;

export const formatDateTimeForAPI = (date: any) =>
  date ?
    moment(date)
        .utc()
        .format() :
    date;

export const formatDateTimeConversational = (date: any) => (date ? moment(date).fromNow() : date);
