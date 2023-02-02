exports.truncateString = (str = '', limit=0) => {
    return str.length < limit ? `${str.substring(0, limit)}...`: str;
}