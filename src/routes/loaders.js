import { getOfStorage, deleteOfStorage, saveInStorage } from "src/utils/localStorage";
import { APIHydro } from "src/api";

export async function autoLoginLoader() {
  const token = getOfStorage("accessToken");
  if (token) {
    try {
      const userInfo = await APIHydro.loginByJWT({ accessToken: token });
      saveInStorage("accessToken", userInfo.data.accessToken);
      return { userInfo: userInfo.data };
    } catch (e) {
      deleteOfStorage("accessToken");
      return { error: e, message: e.message };
    }
  }
  return "no token provide";
}
