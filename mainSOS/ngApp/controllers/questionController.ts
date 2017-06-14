namespace mainsos.Controllers {

  export class QuestionController {
    private lesson;
    private questions;
    public newQuestion = {
      qTitle: '',
      qContent: '',
      qDate: new Date(),
      lessonID: this.lesson,
      clickCount: 0,
      userId: '',
      qCodeLink: ''
    }

    constructor(private lessonServices, private questionService, private $stateParams, private $state, private $uibModal) {
      console.log($stateParams.id);
      lessonServices.getOne($stateParams.id).then((data) => {
          this.lesson = data;
          this.listQuestions();
          console.log(this.questions);
        })
    }

    public listQuestions() {
      console.log(this.lesson._id);
      this.questions = this.questionService.getAllByLesson(this.lesson._id);
    }

    public redirectToAnswers(questionId) {
      this.$state.go('answers', {id: questionId});
    }

    public addQuestions(questions) {
        this.newQuestion =
           this.questionService.add({
            lessonID: this.$stateParams.id,
             qTitle: this.newQuestion.qTitle,
             qContent: this.newQuestion.qContent,
             qDate: this.newQuestion.qDate,
             userId: this.newQuestion.userId,
             clickCount: this.newQuestion.clickCount,
             qCodeLink: this.newQuestion.qCodeLink
           }).then(()  =>
           this.listQuestions());
         }

    public deleteQuestion(id) {
       this.questionService.delete(id)
       .then((data) => {
         this.questions = this.questionService.showAllQuestions();
       }).catch((err) => console.log(err));
     }

    public delete(ID) {
      this.questionService.delete(ID).then(() => this.listQuestions());
    }

    public countUpTick(question) {
  question.clickCount += 1;
  this.questionService.update({
    _id: question._id,
    qTitle: question.qTitle,
    qContent: question.qContent,
    qDate: question.qDate,
    lessonID: question.lessonID,
    clickCount: question.clickCount,
    userId: question.userId,
    qCodeLink: question.qCodeLink
  })//.then(() => {this.listQuestions()});
}


}
}
