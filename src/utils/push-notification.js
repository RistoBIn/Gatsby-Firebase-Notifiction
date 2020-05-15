import getFirebase from './Firebase';

export const askForPermissioToReceiveNotifications = async () => {
  try {
  	const messaging = getFirebase().messaging;
    await messaging.requestPermission();
    const token = await messaging.getToken();
    console.log('token do usuário:', token);
    
    return token;
  } catch (error) {
    console.error(error);
  }
  navigator.serviceWorker.addEventListener("message", (message) => console.log(message));
}