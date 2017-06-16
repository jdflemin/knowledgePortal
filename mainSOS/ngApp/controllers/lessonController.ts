namespace mainsos.Controllers{

  export class LessonsController {
    private Course;
    private lesson;
    private lessons;
    public newLesson = {
      title: '',
      courseId: ''
    };
    public administrator = false;

    constructor(private courseServices, private lessonServices, private $stateParams, private $state, private questionService, private answerService, private commentService, private $uibModal){
      this.checkAccess();
      courseServices.getOne($stateParams.id).then((data) => {
        this.Course = data;
        this.listLessons();
        this.getTrendingQuestions();
      })
    }

    public checkAccess(){
      let x = sessionStorage.getItem('role');
      if( x == 'admin'){
        this.administrator = true;
      }
    }

    public listLessons(){
      this.lessons = this.lessonServices.getAllCourseLessons(this.Course._id);
    }

    public redirectToQuestions(lessonId){
      this.$state.go('questions', {id: lessonId});
    }

    public addLesson() {
      this.newLesson = this.lessonServices.add({
        title: this.newLesson.title,
        courseId: this.$stateParams.id,
      }).then(() => this.listLessons());
    }

    public delete(course){
      this.lesson = this.lessonServices.delete(course._id).then(() => this.listLessons());
    }

    public showEditLessonModal(lesson){
      let modal = this.$uibModal.open({
        templateUrl: '/ngApp/views/editLesson.html',
        controller: editModalLessonController,
        controllerAs: 'controller',
        resolve: {
          lesson: () => lesson
        },
        size: 'md',
      });
      modal.closed.then(() => {this.listLessons()});
    }

    //trending Section..................

    private trendComments;
    private trendAnswers;
    private trendQuestions = [];
    private referenceDate;

    public getTrendingQuestions() {
      this.setReferenceDate();
      console.log(this.referenceDate.toJSON());
      this.answerService.getAllbyDate(this.referenceDate.toJSON()).then((data) => {
        console.log(data);
        this.trendAnswers = data || [];
        this.getCommentsbyDate();
      })

    }

    public setReferenceDate() {
      this.referenceDate = new Date();
      this.referenceDate.setHours(this.referenceDate.getHours() - 24);  //this grab everything with a answers or comment posted in the last 24 hours.
    }

    public getCommentsbyDate(){
      this.commentService.getAllbyDate(this.referenceDate.toJSON()).then((data) => {
        this.trendComments = data;
        this.addtoTrendingAnswers();
        this.addtoTrendingQuestions();
      })
    }

    public addtoTrendingAnswers() {
      for(let i = 0; i < this.trendComments.length; i++){
        this.answerService.getOne(this.trendComments[i].answerId).then((data) => {
          let tempAnswer = data;
          let pushThis = true;
          for(let j = 0; j < this.trendAnswers.length; j++) {
            if(this.trendAnswers[j]._id == tempAnswer._id){
              pushThis = false;
            }
          }
          if(pushThis){
            this.trendAnswers.push(tempAnswer);
          }
        });
      }
      this.addtoTrendingQuestions();
      console.log('trendAnswers')
    }


    public addtoTrendingQuestions() {
      for(let i = 0; i < this.trendAnswers.length; i++){
        this.questionService.getOne(this.trendAnswers[i].questionId).then((data) => {
          let tempQuestion = data;
          let pushThis = true;
          for(let j = 0; j < this.trendQuestions.length; j++) {
            if(this.trendQuestions[j]._id == tempQuestion._id){
              pushThis = false;
            }
          }
          if(pushThis){
            this.trendQuestions.push(tempQuestion);
          }
        });
      }
      console.log('trendQuestions');
    }

    public redirectToAnswers(questionId) {
      console.log(questionId)
      this.$state.go('answers', {id: questionId});
    }

  }

  export class editModalLessonController {
    public lessons;

    constructor(lesson, private lessonServices, private $uibModalInstance){
      this.lessonServices.getOne(lesson._id).then((foundLesson) => {
        this.lessons = foundLesson
      });

    }

    public editLesson() {
      this.lessonServices.update({
        _id: this.lessons._id,
        courseId: this.lessons.courseId,
        title: this.lessons.title
      }).then(() => {this.close()});
    }

    public close() {
      this.$uibModalInstance.close();
    }
  }


}
