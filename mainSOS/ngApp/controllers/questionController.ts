namespace mainsos.Controllers {

  export class QuestionController {
    private lesson;
    private questions;
    //private clickCount = 0;
    //public question;
    public newQuestion = {
      qTitle: '',
      qContent: '',
      qDate: Date.now(),
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
           this.questionService.add({
            lessonID: this.$stateParams.id,
             qTitle: this.newQuestion.qTitle,
             qContent: this.newQuestion.qContent,
             qDate: this.newQuestion.qDate,
             userId: this.newQuestion.userId,
             clickCount: this.newQuestion.clickCount,
             qCodeLink: this.newQuestion.qCodeLink
           }).then((data)  => {
             this.questionService.lessonID = '';
             this.questionService.qTitle = '';
             this.questionService.qContent = '';
             this.questionService.qDate = Date.now();
             this.questionService.userId;
             this.questionService.clickCount;
             this.questionService.qCodeLink = '';
             this.questions.push(data);
           })
           this.listQuestions();
         }

     deleteQuestion(id) {
       this.questionService.delete(id)
       .then((data) => {
         this.questions = this.questionService.showAllQuestions();
       }).catch((err) => console.log(err));
     }


//////////////upTick Section for questions

    countUpTick(question) {
      console.log("this is the question clickCount is " + question.clickCount);
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

//////////////////


    public delete(ID) {
      this.questionService.delete(ID).then(() => this.listQuestions());
    }
}
}
