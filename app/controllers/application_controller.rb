class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  # handle 404 errors with a friendly page
  rescue_from ActiveRecord::RecordNotFound do |exception|
    flash[:error] = "We apologize, but this information could not be found."
    redirect_to home_path
  end

  rescue_from CanCan::AccessDenied do |exception|
    flash[:error] = "You are not authorized to take this action."
    redirect_to home_path
  end

  private
  def current_user
    @current_user ||= Officer.find(session[:officer_id]) if session[:officer_id]
  end
  helper_method :current_user

  def logged_in?
    current_user
  end
  helper_method :logged_in?

  def login_status
    redirect_to login_path, alert: "You need to log in to view this page." if current_user.nil?
  end
  
end
