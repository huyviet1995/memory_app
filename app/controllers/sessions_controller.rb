class SessionsController < ApplicationController

  before_action :save_my_previous_url, only: [:create, :new]
  before_action :disable_turbolinks_preview_cache, only: [:create, :new]

  def new
  end

  def create
    user = User.find_by(email: session_params[:email])
    if (user && user.authenticate(session_params[:password])) 
      # Log the user and redirect to the user show page 
      log_in(user) 
      flash.now[:success] = "Welcome, #{current_user}" 
      render json: "#{session[:my_previous_url]}" 
    elsif user.nil?
      render json: "#{session_params[:email]} does not exist. Check your email or sign up!"
    else
      # Create an error message 
      render json: "Wrong password!"
    end 
  end 

  # Render  
  def destroy
    log_out
    redirect_to '/'
  end

  private

  def session_params 
    params.require(:session).permit(
      :user_id,
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
