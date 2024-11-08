const ImageKit =  require("imagekit");

var imagekita = new ImageKit({
  publicKey: "public_PEf5tylXhTZeQxVfcLlEgiE2",
  privateKey: "private_HWsUP5m+IQnPiNKb7zBCFC+dMrg=",
  urlEndpoint: "https://ik.imagekit.io/ancorporation",
});

const uploadImage = async (imageBuffer, imageName) =>{
    imageBuffer = imageBuffer.toString('base64');
    let urlData = undefined;
    // let data = undefined;[]
    await imagekita.upload({
        file: imageBuffer,
        fileName: imageName 
    }).then((res)=>{
        urlData = res.url;
    }).catch(err=>{
        console.log(err);
    })
    return urlData;
}

module.exports = uploadImage;

