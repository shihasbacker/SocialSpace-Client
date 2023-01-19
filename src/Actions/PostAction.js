import * as PostApi from "../Api/PostRequest";

export const getTimelinePosts = (id) => async (dispatch) => {
  dispatch({ type: "RETREIVING_START" });
  try {
    const { data } = await PostApi.getTimelinePosts(id);
    dispatch({ type: "RETREIVING_SUCCESS", data: data });
  } catch (error) {
    dispatch({ type: "RETREIVING_FAIL" });
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

export const deletePosts = (id, data) => {
  return async (dispatch) => {
    await PostApi.deletePost(id, data);
    dispatch({ type: "POST_DELETE", postId : id });
  };
};
