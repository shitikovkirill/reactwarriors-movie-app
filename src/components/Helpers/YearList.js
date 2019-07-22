export default function yearList(size = new Date().getFullYear() - 1940, startAt = 1940) {
    return [...Array(size).keys()].map(i => ({'year': (size - i) + startAt}));
}