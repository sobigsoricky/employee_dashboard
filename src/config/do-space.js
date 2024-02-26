import AWS from 'aws-sdk';

const spacesEndpoint = new AWS.Endpoint(process.env.DO_SPACE_URL)

const s3 = new AWS.S3({
    endpoint: spacesEndpoint,
    credentials: {
        accessKeyId: process.env.DO_SPACE_ID,
        secretAccessKey: process.env.DO_SPACE_SECRET
    }
})

export default s3