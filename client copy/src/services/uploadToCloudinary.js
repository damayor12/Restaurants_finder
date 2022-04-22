import axios from 'axios';

const uploadPic = async (media) => {
  try {
    const form = new FormData();

    form.append('file', media);
    form.append('upload_preset', 'social_media'); // contains our preset_name unsigned
    form.append('cloud_name', 'dlkdaara8');

    //post to cloudinary with optionns
    const res = await axios.post('https://api.cloudinary.com/v1_1/dlkdaara8/image/upload', form);
    return res.data.url;
  } catch (err) {
    return err;
  }
};

export default uploadPic;
