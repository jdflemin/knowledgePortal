namespace mainsos.Controllers {

  export class AnswerController {
    private question;
    private answers;
    private answer;
    private comments;
    private Modal;
    public newAnswer = {
      aDate: new Date(),
      questionId: this.question,
      aContent: '',
      userId: '',  //this to be updated when we see what token will be as it will auto populate with who is logged in
      usefulCount: 0,
      bestAnswer: false,
      aCodeLink: '',
    };
    public administrator = false;

    constructor(private questionService, private answerService, private commentService, private $stateParams, private $state, private $uibModal, private lessonServices, private courseServices) {
      this.checkAccess();
      this.getQuestion($stateParams.id);
      }

    public getQuestion(id) {
      this.questionService.getOne(id).then((data) => {
          this.question = data;
          this.listAnswers();
          this.getSideInformation();
          this.question.qCodeLink = this.checklink(this.question.qCodeLink);/////
      });
    }

    public checkAccess(){
      let x = sessionStorage.getItem('role');
      if( x == 'admin'){
        this.administrator = true;
      }
    }

    public listAnswers() {
      this.answers = this.answerService.getAllbyQuestion(this.question._id);
    }

    /////
    public checklink(link) {
      var result;
      var startingurl = 'http://';
      var httpStartingurl = 'https://';
      if (link==''){
        result = link
      } else if(link.startsWith(startingurl) || link.startsWith(httpStartingurl)) {
        result = link
      } else {
        result = startingurl + link;
      }
      return result
    }
  //////


    public addAnswer(answers) {
      this.newAnswer = this.answerService.add({
        aDate: new Date(),
        questionId: this.$stateParams.id,
        aContent: this.newAnswer.aContent,
        userId: this.$stateParams.id,
        usefulCount: this.newAnswer.usefulCount,
        bestAnswer: this.newAnswer.bestAnswer,
        aCodeLink: this.newAnswer.aCodeLink,
      }).then(() => {
        this.listAnswers();
      });
    }

    public deleteAnswer(id) {
      this.answerService.delete(id)
      .then(() => {
        this.listAnswers();
      });
    }

    public showEditAnswerModal(answer) {
      let modal = this.$uibModal.open({
        templateUrl: '/ngApp/views/editAnswer.html',
        controller: editModalAnswerController,
        controllerAs: 'controller',
        resolve: {
          answer: () => answer
        },
        size: 'md'
      });
      modal.closed.then(() => {this.listAnswers()});
    }

    public showEditQuestionModal(question) {
        let modal = this.$uibModal.open({
        templateUrl: '/ngApp/views/editQuestion.html',
        controller: editModalQuestionController,
        controllerAs: 'controller',
        resolve: {
          question: () => question
        },
        size: 'md'
      });

      modal.closed.then(() => {this.getQuestion(this.question._id)});
    }

    ////////////////upTick section for answers
      private countUpTickAnswer(answer) {
        answer.usefulCount += 1;
        this.answerService.update({
          _id: answer._id,
          aDate: answer.aDate,
          questionId: answer.questionId,
          aContent: answer.aContent,
          userId: answer.userId,
          usefulCount: answer.usefulCount,
          bestAnswer: answer.bestAnswer,
          aCodeLink: answer.aCodeLink,
        })
      }

      //for side lessons list.---
      private sideLesson;
      private sideLessons;
      private sideCourse;

      private getSideInformation(){
        this.lessonServices.getOne(this.question.lessonID).then((data) => {
          this.sideLesson = data;
          this.getSideCourse();
        });
      }

      private getSideCourse(){
        this.courseServices.getOne(this.sideLesson.courseId).then((data) => {
          this.sideCourse = data;
          this.getSideLessons();
        });
      }

      private getSideLessons(){
        this.sideLessons = this.lessonServices.getAllCourseLessons(this.sideCourse._id);
      }

      public redirectToQuestions(lessonId){
        this.$state.go('questions', {id: lessonId});
      }
     //end for side lessons list.--

     //for comments sections.---
     public newComment = {
       cDate: new Date(),
       answerId: this.answer,
       cContent: '',
       userId: '',   //this to be updated when we see what token will be as it will auto populate with who is logged in
       likeCount: 0
     };

     public answerComments(id) {
       this.commentService.getAllbyAnswer(id).then((data) => {
         this.comments = data;
       });
     }

     public addComment(id){
       console.log(id);
       this.commentService.add({
         cContent: this.newComment.cContent,
         cDate: Date.now(),
         answerId: id,
         userId: this.newComment.userId,
         likeCount: this.newComment.likeCount
       }).then(() => {
         this.answerComments(id);
         this.newComment.cContent = '';
       });
     }
     public deleteComment(ID, id){
       this.commentService.delete(ID).then(() => this.answerComments(id));
     }

     public updateLikeCount(comment, id){
       comment++;
       this.commentService.add({
         _id: comment._id,
         cDate: comment.cDate,
         answerId: comment.answerId,
         cContent: comment.cContent,
         userId: comment.userId,
         likeCount: comment.likeCount
       }).then(() => this.answerComments(id));
     }

     public updateComment(comment, id){
       let modal = this.$uibModal.open({
         templateUrl: '/ngApp/views/updateCommentsModal.html',
         controller: mainsos.Controllers.updateCommentsController,
         controllerAs: 'controller',
         size: 'md',
         resolve: {
           comment: () => comment
         }
       });

       modal.closed.then(() => this.answerComments(id));
     }

}


///////////////Answer Modal for editing the answers
  export class editModalAnswerController {
    public answers;

    constructor(answer, private answerService, private $uibModalInstance, private $stateParams) {
      this.answerService.getOne(answer._id).then((foundAnswer) => {
        this.answers = foundAnswer
      })
      }

    public editAnswer() {
      this.answerService.update({
        _id: this.answers._id,
        aDate: this.answers.aDate,
        questionId: this.answers.questionId,
        aContent: this.answers.aContent,
        userId: this.answers.userId,
        usefulCount: this.answers.usefulCount,
        bestAnswer: this.answers.bestAnswer,
        aCodeLink: this.answers.aCodeLink
      }).then(() => {this.close()});

    }

    public close() {
      this.$uibModalInstance.close();
    }

  }
///////////////////////


///////////////////the question modal for editing the questions
  export class editModalQuestionController {
    public questions;

    constructor(question, private $uibModalInstance, private questionService, private $stateParams){
      this.questionService.getOne($stateParams.id).then((foundQuestion) => {
        this.questions = foundQuestion
      })
    }

    public editQuestion() {
      this.questionService.update({
        _id: this.questions._id,
        qTitle: this.questions.qTitle,
        qContent: this.questions.qContent,
        qDate:this.questions.qDate,
        userID: this.questions.userID,
        lessonID: this.questions.lessonID,
        clickCount: this.questions.clickCount,
        qCodeLink: this.questions.qCodeLink
      }).then(() => {this.close()});
    }

    public close() {
      this.$uibModalInstance.close();
    }

  }

  export class updateCommentsController {
      private comment;

      constructor(comment, private commentService, private $uibModalInstance){
        commentService.getOne(comment._id).then((data) => {
          this.comment = data;
        });
      }

      public updateComment(){
        this.commentService.update({
          _id: this.comment._id,
          cDate: this.comment.cDate,
          answerId: this.comment.answerId,
          cContent: this.comment.cContent,
          userId: this.comment.userId,
          likeCount: this.comment.likeCount
        }).then(() => this.$uibModalInstance.close());
      }

      public close(){
        this.$uibModalInstance.close();
      }
  }
}
