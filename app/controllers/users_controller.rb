class UsersController < ApplicationController
  before_action :save_my_previous_url, only: [:create]

  def show 
  end

  def create
    @user = User.new(user_params)
    if @user.save
      log_in(@user)
      flash[:success] =  "Thank you for comment!, #{user_params[:email]}"

      play_info = {}
      play_info[:path] = session[:my_previous_url]
      play_info[:level] = play_params[:current_lvl]
      play_info[:score] = play_params[:score]
      play_info[:lives_count] = play_params[:lives_count]

      render json: play_info.to_json 
    else
      render json: "#{user_params[:name]} already exists!" 
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

  def play_params
    params.permit(
      :current_lvl,
      :score,
      :lives_count
    )
  end

  def save_my_previous_url
    session[:my_previous_url] = URI(request.referer || '').path
  end
  
end
