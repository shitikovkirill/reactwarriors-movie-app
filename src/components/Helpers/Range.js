export default function range(size, startAt = 0) {
    return [...Array(size).keys()].map(i => ({ 'year': (size - i) + startAt }));
}