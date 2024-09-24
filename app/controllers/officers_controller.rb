class OfficersController < ApplicationController

  before_action :set_officer, only: [:show, :edit, :update, :destroy]
  before_action :login_status
  authorize_resource


  def index
    @inactive_officers = Officer.where(active: false).alphabetical.paginate(page: params[:page]).per_page(15)
    @active_officers = Officer.where(active: true).alphabetical.paginate(page: params[:page]).per_page(15)
  end
  
  def show
    @past_assignments = @officer.assignments.where('end_date <= ?', Date.today)
    @current_assignments = @officer.assignments.where('end_date IS NULL OR end_date > ?', Date.today)
  end
  
  def new
    @officer = Officer.new
  end
  
  def create
    @officer = Officer.new(officer_params)
    if @officer.save
        flash[:notice] = "Successfully created " + @officer.proper_name + "."
        redirect_to officer_path(@officer)
    else
        render action: 'new'
    end

  end
  
  def edit

  end
  
  def update
    if @officer.update(officer_params)
        redirect_to officer_path(@officer)
    else
        render action: 'edit'
    end

  end
  
  def destroy
    if @officer.assignments.empty?
        @officer.destroy
        flash[:notice] = "Removed " + @officer.proper_name + " from the system."
        redirect_to officers_path
    else
        render action: 'show'
    end

  end
  
  private
  def set_officer
      @officer = Officer.find(params[:id])
  end
  
  def officer_params
      params.require(:officer).permit(:active, :ssn, :rank, :first_name, :last_name, :unit_id, :username, :role, :password, :password_confirmation)
  end
end