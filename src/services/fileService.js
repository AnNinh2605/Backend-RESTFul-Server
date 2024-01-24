const path = require('path');
const uploadSingleFile = async (fileObject) => {
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let uploadPath = path.resolve(__dirname, '../public/picture/upload');

    //get extname
    let extName = path.extname(fileObject.name);
    //get filename (exclude extName)
    let baseName = path.basename(fileObject.name, extName);

    //create final filename and path
    let finalName = `${baseName}-${Date.now()}${extName}`;
    let finalPath = `${uploadPath}/${finalName}`;

    try {
        await fileObject.mv(finalPath);
        return {
            status: "Upload Successfull",
            path: finalName,
            error: null

        }
    } catch (error) {
        return {
            status: 'failed',
            path: null,
            error: JSON.stringify(error)
        }
    }
}

const uploadMultipleFile = async (fileArray) => {
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let uploadPath = path.resolve(__dirname, '../public/picture/upload');
    let countSuccessful = 0;
    let resultArray = [];
    for (let i = 0; i < fileArray.length; i++) {
        //get extname
        let extName = path.extname(fileArray[i].name);
        //get filename (exclude extName)
        let baseName = path.basename(fileArray[i].name, extName);

        //create final filename and path
        let finalName = `${baseName}-${Date.now()}${extName}`;
        let finalPath = `${uploadPath}/${finalName}`;

        try {
            await fileArray[i].mv(finalPath);
            resultArray.push({
                status: "Upload Successfull",
                path: finalName,
                error: null,
                fileName: fileArray[i].name
            })
            countSuccessful++;
        } catch (error) {
            resultArray.push({
                status: 'failed',
                path: null,
                error: JSON.stringify(error),
                fileName: fileArray[i].name
            })
        }
    }
    return {
        countSuccessful: countSuccessful,
        results: resultArray
    }
}

module.exports = { uploadSingleFile, uploadMultipleFile }