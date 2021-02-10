import moment from 'moment';

export const horaMes = (fecha) => {
    const date = moment(fecha);

    return date.format('HH:mm a | MMMM Do')
}