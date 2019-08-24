class UsersController < ApplicationController

  def show 
  end

  def create
    @user = User.new(user_params)
    if @user.save
      log_in(@user)
      render json: "Thank you for comment!, #{user_params[:email]}"
    else
      flash.now[:danger] = 'Your login might be incorrect!' 
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
      :first_name,
      :last_name,
      :email,
      :password,
      :password_confirmation
    )
  end
  
end
