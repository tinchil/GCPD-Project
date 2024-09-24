class SessionsController < ApplicationController

  def new

  end

  def create
    officer = Officer.find_by_username(params[:username])
    if officer && officer.authenticate(params[:password])
        session[:officer_id] = officer.id
        flash[:notice] = "Logged in!"
        redirect_to home_path
    else
        flash.now[:alert] = "Username and/or password is invalid"
        render action: 'new'
    end

  end

  def destroy
    session[:officer_id] = nil
    flash[:notice] = "Logged out!"
    redirect_to home_path
  end

end