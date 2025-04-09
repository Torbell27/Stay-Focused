import { useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { getTokenFromSecureStore, getRoleFromSecureStore } from "@/scripts/jwt";
import api from "@/scripts/api";
import { useRouter } from "expo-router";

const useCheckInternetRole = () => {
  const router = useRouter();

  useEffect(() => {
    const checkNetworkStatus = async () => {
      try {
        const state = await NetInfo.fetch();
        const token = await getTokenFromSecureStore("accessToken");

        if (!token && state.isConnected && state.isInternetReachable) {
          const response = await api.getUserRole();
          if (response) {
            const targetRoute = response.role === 0 ? "/doctor/DoctorMain" : "/patient/TaskInfoScreen";
            router.push(targetRoute);
          }
        } else {
          const role = await getRoleFromSecureStore();
          if (role) {
            const targetRoute = role === '0' ? "/doctor/DoctorMain" : "/patient/TaskInfoScreen";
            router.push(targetRoute);
          } else {
            router.push("/authorize");
          }
        }
      } catch (error) {
        console.error("Error checking network or role:", error);
        router.push("/authorize");
      }
    };

    checkNetworkStatus();

  }, [router]);
};

export default useCheckInternetRole;
