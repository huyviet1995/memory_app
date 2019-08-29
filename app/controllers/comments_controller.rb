class CommentsController < ApplicationController
  def create
    comment = Comment.new(comment_params)
    if comment.save
      render json: "Your comment has been saved!" 
    else
      render json: "Your comment failed to be saved!" 
    end 
  end

  private
  def comment_params
    params.permit(
      :content,
      :user_id
    )
  end
end 