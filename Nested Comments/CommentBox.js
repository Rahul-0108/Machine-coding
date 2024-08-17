const CommentBox = ({ data }) => {
    return data.map((comment, index) => (
      <div className="" key={index}>
        <div style= {{display: "flex", flexDirection: "row"}}>
          <div>
            <img
              style= {{height: "22px"}}
              src="https://www.redditstatic.com/avatars/defaults/v2/avatar_default_1.png"
              alt="user"
            />
          </div>
          <div style= {{marginLeft: "22px", marginTop: "-12px"}}>
            <p className="">{comment.username}</p>
            <p className="">{comment.comment}</p>
          </div>
        </div>
        <div style= {{marginLeft: "47px"}}>{comment?.replies && <CommentBox data={comment.replies} />}</div>
      </div>
    ));
  };
  export default CommentBox;