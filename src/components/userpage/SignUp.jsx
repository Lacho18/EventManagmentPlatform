export default function SignUp() {
  return (
    <div className="w-screen h-screen bg-gray-200 flex justify-center items-center">
      <form className="form-container">
        <div className="form-group">
          <label htmlFor="email">Enter your email</label>
          <input type="email" name="email" placeholder="@email" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Enter your password</label>
          <input type="password" name="password" placeholder="password" />
        </div>
        <div className="form-group">
          <label htmlFor="firstName">Your first name</label>
          <input type="text" name="firstName" placeholder="First name" />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Your last name</label>
          <input type="text" name="lastName" placeholder="Last name" />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Enter your gender</label>
          <div className="flex">
            <p className="mr-4">Male</p>
            <input type="radio" name="gender" value="male" />
          </div>
          <div className="flex">
            <p className="mr-4">Female</p>
            <input type="radio" name="gender" value="female" />
          </div>
        </div>

        <button className="submit-btn">Log in</button>
      </form>
    </div>
  );
}
