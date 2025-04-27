import { EventType } from '../hooks/useCalendarEvent'; // Assuming the path

export const eventStyleGetter = (event: EventType) => {
    return {
        style: {
            backgroundColor: event.color,
            borderColor: event.borderColor || event.color,
            borderWidth: '2px',
            borderStyle: 'solid',
            borderRadius: '1px',
            opacity: 0.9,
            color: '#fff',
            fontWeight: 500,
            display: 'flex',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            transition: 'all 0.2s ease-in-out',
            padding: '2px 4px',
            fontSize: '90%'
        }
    };
};