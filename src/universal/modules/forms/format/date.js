import moment from 'moment';

const dateFormat = date => moment(date).format('MMMM DD, YYYY');

export default dateFormat;
