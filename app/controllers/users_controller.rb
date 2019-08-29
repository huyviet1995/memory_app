class UsersController < ApplicationController
  before_action :save_my_previous_url, only: [:create]

  def show 
  end

  def create
    @user = User.new(user_params)
    if @user.save
      log_in(@user)
      flash[:success] =  "Thank you for comment!, #{user_params[:email]}"
      redirect_to session[:my_previous_url]
    else
      flash[:error] = 'Your login might be incorrect!' 
      redirect_to session[:my_previous_url]
    end
  end

  def create_comment
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

  def save_my_previous_url
    session[:my_previous_url] = URI(request.referer || '').path
  end
  
end
