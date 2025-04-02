const LanguageSelector = () => {
  return (
    <div className="LanguageSelector">
      <div className="language-selector">
        <select
          aria-label="Default select example"
          className="w-[200] p-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option>Select Language</option>
          <option value="1">English</option>
          <option value="2">French</option>
          <option value="3">German</option>
        </select>
      </div>
    </div>
  );
};

export const Login = () => {
  return (
    <div className="Login">
      <div className="login">
        <select
          aria-label="Login Functionality"
          className="w-full p-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option>Login</option>
          <option>Register</option>
        </select>
      </div>
    </div>
  );
};

export default LanguageSelector;
