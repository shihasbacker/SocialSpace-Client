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

export const deletePosts = (id,data) => {
  console.log("inside",data)
  return (
      async (dispatch) => {
      console.log("this is working")
      const datas = await PostApi.deletePost(id,data);
      const actionData = datas.data
      console.log(actionData,"deleted post")
      dispatch({type:"POST_DELETE",actionData})
  })
}