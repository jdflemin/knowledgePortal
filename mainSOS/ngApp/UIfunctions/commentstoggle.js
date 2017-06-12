$(document).on("click", ".replyButton", function() {
  $(this).parent(".answerLI").find(".discussionContainer").slideToggle(300);
});
