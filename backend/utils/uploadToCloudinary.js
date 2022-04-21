import axios from 'axios';

const uploadPic = async (media) => {
  try {
    const form = new FormData();

    form.append('file', media);
    form.append('upload_preset', 'social_media'); // contains our preset_name unsigned
    form.append('cloud_name', 'dlkdaara8');

    //post to cloudinary with optionns
    const res = await axios.post(process.env.CLOUDINARY_URL, form);
    return res.data.url;
  } catch (err) {
    return err
  }
};

export default uploadPic;
