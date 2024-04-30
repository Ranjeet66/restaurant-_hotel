const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: 'dlqjbnrqk',
    api_key: '792375176357873',
    api_secret: '7MhD3CtCTt2h_dSPdHmbZglqEOQ'
});

module.exports = {
    uploadImage: async (image) => {
        try {
            let upload = await cloudinary.uploader.upload(image);
            return upload.secure_url;
        } catch (error) {
            return res.send({ responseCode: 501, responseMessage: "Something went wrong !", responseResult: error.message });
        }
    },
}