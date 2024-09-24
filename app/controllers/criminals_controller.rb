class CriminalsController < ApplicationController

  before_action :set_criminal, only: [:show, :edit, :update, :destroy]
  before_action :login_status
  authorize_resource

  def index
      @criminals = Criminal.all
      @enhanced_powers = Criminal.enhanced
  end


  def show
      @suspects = @criminal.suspects
  end


  def new
      @criminal = Criminal.new
  end


  def create
      @criminal = Criminal.new(criminal_params)
      if @criminal.save
          flash[:notice] = "Successfully added " + @criminal.first_name + " " + @criminal.last_name + " to GCPD."
          redirect_to criminal_path(@criminal)
      else
          render action: 'new'
      end
  end


  def edit

  end


  def update
      if @criminal.update(criminal_params)
          redirect_to criminal_path(@criminal)
      else
          render action: 'edit'
      end
  end


  def destroy
      if @criminal.destroy
          flash[:notice] = "Removed " + @criminal.first_name + " " + @criminal.last_name + " from the system."
          redirect_to criminals_path
      end
  end


  private
  def set_criminal
      @criminal = Criminal.find(params[:id])
  end


  def criminal_params
      params.require(:criminal).permit(:first_name, :last_name, :aka, :convicted_felon, :enhanced_powers)
  end

  
end