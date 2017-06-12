namespace mainsos.Services {

export class CommentService {
  private COMMENT_RESOURCES;
  private ANSWER_COMMENT_RESOURCES;
  private CRUD_COMMENT_RESOURCE;
  private COMMENT_BYDATE_RESOURCE;

  constructor(private $resource) {
    this.COMMENT_RESOURCES = this.$resource('http://localhost:3002/api/v1/comments/:id');
    this.ANSWER_COMMENT_RESOURCES = this.$resource('http://localhost:3002/api/v1/comments/answers/:id/comments');
    this.CRUD_COMMENT_RESOURCE = this.$resource('http://localhost:3003/api/v1/comments/:id');
    this.COMMENT_BYDATE_RESOURCE = this.$resource('http://localhost:3002/api/v1/comments/:id');
  }

  public getAll() {
    return this.COMMENT_RESOURCES.query();
  }

  public getOne(id) {
    return this.COMMENT_RESOURCES.get({id: id}).$promise;
  }

  public getAllbyAnswer(answerId) {
    return this.ANSWER_COMMENT_RESOURCES.query({id: answerId});
  }

  public add(comment) {
    return this.CRUD_COMMENT_RESOURCE.save(comment).$promise;
  }

  public update(comment) {
    return this.CRUD_COMMENT_RESOURCE.save({id: comment._id}, comment).$promise;
  }

  public delete(id) {
    return this.CRUD_COMMENT_RESOURCE.delete({id: id}).$promise;
  }

  public getAllbyDate(sentDate) {
    return this.COMMENT_BYDATE_RESOURCE.get({Date: sentDate}).$promise;
  }

}

angular.module('mainsos').service('commentService', CommentService);

}
