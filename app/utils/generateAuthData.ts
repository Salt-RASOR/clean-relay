import supabase from "./supabaseLocal";

const generateAuthData = async (userId: string, email: string) => {
  const { data, error } = await supabase.auth.getSession();

  let jwtToken = "";
  if (data && !error) {
    jwtToken = `Bearer ${data.session?.access_token}`;
  }

  return { userId, email, jwtToken };
};

export default generateAuthData;
