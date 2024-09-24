class AssignmentsController < ApplicationController

  before_action :set_assignment, only: [:show, :edit, :update, :destroy]
  before_action :login_status
  authorize_resource

  def new
    @officer = Officer.find(params[:officer_id])
    @assignment = Assignment.new
    @officer_investigations = Investigation.all - @officer.investigations
  end

  def create
    @assignment = Assignment.new(assignment_params)
    @assignment.start_date = Date.current
    if @assignment.save
      flash[:notice] = "Successfully added assignment."
      redirect_to officer_path(@assignment.officer)
    else
      render action: 'new', locals: { officer: @assignment.officer}
    end
  end

  def terminate
    @assignment = Assignment.find(params[:id])
    @assignment.update_attribute(:end_date, Date.current)
    flash[:notice] = "Successfully terminated assignment."
    redirect_to officer_path(@assignment.officer)
  end

  private

  def set_assignment
    @assignment = Assignment.find(params[:id])
  end

  def assignment_params
    params.require(:assignment).permit(:officer_id, :investigation_id)
  end


end