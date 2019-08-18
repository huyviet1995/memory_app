class UsersController < ApplicationController

  def show 
  end

  def create
    @user = User.first_or_create(user_params)
    if @user.save
      render json: "Thank you for comment!, #{user_params[:email]}"
    else
      render json: "Sorry, your comment has not been save!, #{@user.errors.full_messages}" 
    end
  end

  def new
  end

  def update
  end

  def destroy
  end

  def edit
  end

  private
  def user_params 
    params.permit(
      :name,
      :email,
    )
  end
  
end
