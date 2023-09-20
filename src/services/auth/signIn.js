import { useSigninMutation } from "../../data/auth";

const [signIn, error, isLoading] = useSigninMutation();

function signIn(e) {
  e.preventDefault();
  signin({
    email: e.target.email.value,
    password: e.target.password.value
  })
  .unwrap()
  .then(data => {
    return data;
  })
  .catch(error => {
    return error;
  }); 
}

export default signIn;
