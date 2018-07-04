/* eslint-disable no-process-env */

// localhost:8081 is the sewing-kit default
const ip = process.env.IP || 'localhost';
const port = process.env.PORT || '8081';
const cdnHost = `${ip}:${port}`;
const cdnBucketPath = 'build/';
const cdnUrl = `${cdnHost}/${cdnBucketPath}`;

module.exports = {
  ip,
  port,
  cdnUrl,
};
