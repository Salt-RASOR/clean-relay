import supabase from "./supabaseLocal";

const generateAuthData = async (
  userId: string,
  email: string,
  reAssignEmail = false
) => {
  const { data, error } = await supabase.auth.getSession();

  let jwtToken = "";
  if (data && !error) {
    jwtToken = `Bearer ${data.session?.access_token}`;

    if (reAssignEmail) {
      email = data.session?.user.email || "";
    }
  }

  return { userId, email, jwtToken };
};

export default generateAuthData;
