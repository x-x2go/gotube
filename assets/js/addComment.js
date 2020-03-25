import axios from "axios";

const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNum = document.getElementById("jsCommentNum");
const deleteComment = document.querySelectorAll("#deleteComment");

const increaseNumber = () => {
  commentNum.innerHTML = parseInt(commentNum.innerHTML, 10) + 1;
};

const decreaseNumber = () => {
  commentNum.innerHTML = parseInt(commentNum.innerHTML, 10) - 1;
};

const addComment = comment => {
  const newComment = document.createElement("span");
  newComment.className = "my__comment";
  const li = document.createElement("li");
  li.className = "my__comment-text";
  const span = document.createElement("span");
  span.innerHTML = comment;
  newComment.appendChild(li);
  li.appendChild(span);
  commentList.prepend(newComment);
  increaseNumber();
};

const sendComment = async comment => {
  const videoID = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoID}/comment`,
    method: "POST",
    data: {
      comment
    }
  });
  if (response.status === 200) {
    console.log(response);
    addComment(comment);
  }
};

const handleSubmit = event => {
  event.preventDefault();
  const commentInput = addCommentForm.querySelector("input");
  const comment = commentInput.value;
  sendComment(comment);
  commentInput.value = "";
};

const handleDelete = async e => {
  console.log("delete1!");
  console.log(e.target.parentElement.className);
  const targetComment = e.target.parentElement;
  const commentID = targetComment.getAttribute("comment_id");
  const response = await axios({
    url: `/api/${commentID}/delete`,
    method: "DELETE"
  });
  if (response.status === 200) {
    console.log(response);
    targetComment.parentElement.remove();
    decreaseNumber();
  }
};

function init() {
  addCommentForm.addEventListener("submit", handleSubmit);
  deleteComment.forEach(commentElement => {
    commentElement.addEventListener("click", handleDelete);
  });
}
if (addCommentForm) {
  init();
}
