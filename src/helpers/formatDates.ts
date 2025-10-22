import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

export const formatRelativeDate = (isoString: Date): string => {
    return formatDistanceToNow(new Date(isoString), {
        addSuffix: true,
        locale: es,
    });
};

export const formatDate = (isoString: Date): string => {
    const date = new Date(isoString);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
};