export const formatDateTime = (datetime?: Date) => {
    return new Intl.DateTimeFormat(
        'en-US',
        {
            year: 'numeric',
            month: 'long',
            day: '2-digit',
            weekday: 'long'
        }
    ).format(datetime)
}