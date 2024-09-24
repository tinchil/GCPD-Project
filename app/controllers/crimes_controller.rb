class CrimesController < ApplicationController

  before_action :set_crime, only: [:edit, :update]
  before_action :login_status
  authorize_resource

  def index
      @active_crimes = Crime.active
      @inactive_crimes = Crime.inactive
  end
  
  def new
      @crime = Crime.new
  end


  def create
      @crime = Crime.new(crime_params)
      if @crime.save
          flash[:notice] = "Successfully added " + @crime.name + " to GCPD."
          redirect_to crimes_path
      else
          render action: 'new'
      end
  end

  def edit
  
  end

  def update
      if @crime.update(crime_params)
          redirect_to crimes_path
      else
          render action: 'edit'
      end
  end


  
  private
  def set_crime
      @crime = Crime.find(params[:id])
  end

  def crime_params
      params.require(:crime).permit(:name, :active)
  end


end