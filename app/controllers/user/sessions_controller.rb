class User::SessionsController < Devise::SessionsController
# before_filter :configure_sign_in_params, only: [:create]
prepend_before_filter :require_no_authentication, only: [:cancel ]
  # GET /resource/sign_in
  # def new
  #   super
  # end

  # POST /resource/sign_in
  def create
    @user = User.find_by(email: params[:user][:email])
    if @user.nil?
      render json: ["You must sign-up first"]
    elsif params[:user][:password] != nil && @user.valid_password?(params[:user][:password])
      render json: ["good", current_user.id]
    else
      render json: @user.errors.full_messages
    end
  end

  # DELETE /resource/sign_out
  # def destroy
  #   super
  # end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_in_params
  #   devise_parameter_sanitizer.for(:sign_in) << :attribute
  # end
end
