import * as UploadApi from "../Api/UploadRequest.js";

export const uploadImage = (data) => async (dispatch) => {
  try {
    await UploadApi.uploadImage(data);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

export const uploadPost = (data) => async (dispatch) => {
  dispatch({ type: "UPLOAD_START" });
  try {
    const newPost = await UploadApi.uploadPost(data);
    dispatch({ type: "UPLOAD_SUCCESS", data: newPost.data });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    dispatch({ type: "UPLOAD_FAILED" });
  }
};
 