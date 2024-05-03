export const formatDateTime = (datetime?: Date) => {
    return new Intl.DateTimeFormat(
        'en-US',
        {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }
    ).format(datetime)
}