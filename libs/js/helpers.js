const getTimestamp = () => Math.round(new Date().getTime()/1000);
const getToken = (length = 12) => Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, length);

module.exports = {
    getTimestamp,
    getToken,
};
