namespace mainsos.Controllers{

  export class SearchController{
    private questions = [];
    private answers;
    private searchString;

    constructor(private questionService, private answerService, private $stateParams, private $state) {
      this.searchString = $stateParams.search;
      this.searchQuestionContent();
      this.searchAnswers();
      this.searchString = '';
    }

    public searchAgain(){
      this.searchQuestionContent();
      this.searchAnswers();
      this.searchString = '';
    }

    public searchQuestionContent() {
      this.questions = this.questionService.searchQuestionContent(this.searchString);
    }

  public searchAnswers() {
       this.answerService.searchAnswerContent(this.searchString).then((data) => {
         this.answers = data;
         this.addtoQuestions();
       });
    }

    public addtoQuestions() {
      for(let i = 0; i < this.answers.length; i++){
        this.questionService.getOne(this.answers[i].questionId).then((data) => {
          let tempQuestion = data;
          let pushThis = true;
          for(let j = 0; j < this.questions.length; j++) {
            if(this.questions[j]._id == tempQuestion._id){
              pushThis = false;
            }
          }
          if(pushThis){
            this.questions.push(tempQuestion);
          }
        });
      }
    }

    public redirectToAnswers(questionID) {
      this.$state.go('answers', {id: questionID});
    }

  }
  angular.module('mainsos').controller('searchController', SearchController);
}
