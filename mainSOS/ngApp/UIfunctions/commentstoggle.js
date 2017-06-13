$(document).on("click", ".replyButton", function() {
  console.log('clicked');
  $(this).parent('.question').find(".discussionContainer").slideToggle(300);
});
